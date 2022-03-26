import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';


const drawerWidth = 240;

const Sidebar = (props) => {
  const [Currentaccount, setCurrentAccount] = useState("");
  const [isCreator,setCreator] = useState(false);

  const AuthenticateOwner = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      console.log("check")
      console.log()
      if( account ===  localStorage.getItem("CurrentCreator").toLowerCase() ){
        setCreator(true);
        console.log(setCreator)
      }
 
    } else {
      console.log("No authorized account found");
    }
  };
 
  useEffect(() => {
    AuthenticateOwner();
  }, []);
  



  return (
    <div >
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Inbox', 'Starred',  'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
      {isCreator?

      <Container>
        <ListContainer>
          <nav role="navigation">
            <ul>
              <li>
                    <Link to="/creator/team">Team</Link>
                  </li>
                  <li>
                    <Link to="/live">Go live</Link>
                  </li>
                  <li>
                    <Link to="/upload">Upload Video</Link>
                  </li>
              
             
            </ul>
          </nav>
        </ListContainer>
      </Container> 

      
:""}

      </div>



  )

}
export default Sidebar;

const Container = styled.div`
  background-color: rgb(3,9,40);
  height: 100vh;
  width:150px;
  color: white;
  display: inline-block;
  font-size: 1.2rem;
`;

const ListContainer = styled.div`
  a {
    text-decoration: none;
  }

  nav {
    font-family: monospace;
  }

  ul {
    background: rgb(3,9,40);
    width:100%
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    color: #fff;
    background-color: rgb(3,9,40);
    display: flex;
    float: left;
    padding: 1rem;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;
  }

  li a {
    color: #fff;
  }

  li:hover {
    background: red;
    cursor: pointer;
  }

  ul li ul {
    background-color: ;
    visibility: hidden;
    opacity: 0;
    min-width: 5rem;
    position: center;
    transition: all 0.5s ease;
    margin-top: 1rem;
    left: 0;
    display: flex;
  }

  ul li:hover > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: flex;
  }

  ul li ul li {
    clear: both;
    width: 100%;
  }
`;

const Button = styled.button`
  background: #ff4500;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 30px;
  text-transform: capitalize;
  color: whitesmoke;
  border-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 10px;
  margin: 2rem auto;
  text-align: center;
  display: grid;
  place-items: center;
`;
