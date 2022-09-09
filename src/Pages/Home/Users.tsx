import * as React from 'react';
import * as MUI from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Nav } from '../../Layouts/Nav';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Orders from './UsersList';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <MUI.Box sx={{ display: 'flex' }}>
        <MUI.CssBaseline />
        <AppBar position="absolute" open={open}>
          <MUI.Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <MUI.IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </MUI.IconButton>
            <MUI.Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            </MUI.Typography>
            <MUI.Button variant='outlined' sx={{ color: '#ffffff'}}>
              Logout
            </MUI.Button>
          </MUI.Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <MUI.Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <MUI.IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </MUI.IconButton>
          </MUI.Toolbar>
          <MUI.Divider />
          <MUI.List component="nav">
            {Nav}
            <MUI.Divider sx={{ my: 1 }} />
          </MUI.List>
        </Drawer>
        <MUI.Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <MUI.Toolbar />
          <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <MUI.Grid container spacing={3}>
              {/* Recent Orders */}
              <MUI.Grid item xs={12}>
                <MUI.Button sx={{mb:2}} variant="contained">
                  <AddIcon/>
                  &ensp;
                  New User
                </MUI.Button>
                <MUI.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </MUI.Paper>
              </MUI.Grid>
            </MUI.Grid>
          </MUI.Container>
        </MUI.Box>
      </MUI.Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
