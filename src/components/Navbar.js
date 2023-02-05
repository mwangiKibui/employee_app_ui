import {AppBar,Box,Toolbar,Typography,IconButton,Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [{
    title:"Home",
    url:"/"
},{
    title:"Add Employee",
    url:"/add_employee"
}]

export default function NavBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Employee App
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                <Button onClick={ () => window.location = item.url} key={item} sx={{ color: '#fff' }}>
                    {item.title}
                </Button>
                ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }