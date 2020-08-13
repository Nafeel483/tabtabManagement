import React from 'react';
import { fade, makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import RateReview from '@material-ui/icons/RateReview';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AppsIcon from '@material-ui/icons/Apps';
import { withRouter } from 'react-router-dom';
import ClassIcon from '@material-ui/icons/Class';
import { userContext } from '../utils/userContext';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
//Ressource
import logo from "../assets/images/logo.png";
import { NavLink } from 'react-router-dom';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  isActive: {
    backgroundColor: 'red',
    display:"none"
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    marginLeft: '10%',
    marginTop:20,
    textAlign:"center"
  },
  active: {
    background: "blue",
  }
}));

const StyledListItem = withStyles({
	root: {
	  "&$selected": {
		  borderRight: '8px solid #ccc',
	  }
	},
	selected: {}
})(ListItem);
  

 const DrawerSide = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState({});
  const [userTypeID, setUserTypeID] = React.useState(2);
   
  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   React.useEffect(() => {
    async function getUserInfo() {         
      let user = await userContext();
      if (user !== null) {
        setUser(JSON.parse(user))
        setUserTypeID(JSON.parse(user).data.userTypeID)
      } else {
        setUser({})
      }
    }
    getUserInfo();
   },[])
  
  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

   function handleDrawerOpen() {
  
    setOpen(true);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const itemClick = (item) => {
    props.history.push(item.el.link);
  }
 
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

   let adminType = user.data ? user.data.userTypeID : null;
   let id_user = user.data ? user.data.id_user : null;
  let pathname = window.location.pathname;
   

   const menuSuperAdmin = [
    {
      name: `Overview`, id: 1, icon: <AppsIcon />,
      link :"home"
    },
    {
      name: "Restaurants", id: 2, icon: < RestaurantMenuIcon/>,
      link :"restaurant"
    },
    {
      name: "Manage customer", id: 3, icon: <PersonAddIcon />,
      link :"customer"
    },
    {
      name: " Payment", id: 4, icon: <CreditCardIcon />,
      link :"payment"
    },
    // {
    //   name: "Report", id: 5, icon: <TimelineIcon />,
    //   link :"report  v2"
    // },   
    {
      name: "Interest", id: 5, icon: <ClassIcon />,
      link :"interest"
    },
    {
      name: " Photos", id: 4, icon: <AddAPhoto />,
      link :"photos"
    },  
    {
      name: " Review", id: 4, icon: <RateReview />,
      link :"review"
    },  
  ]

  const menuAdmin = [
    {
      name: `Overview`, id: 1, icon: <AppsIcon />,
      link :"home"
    },
    {
      name: "Restaurants", id: 2, icon: < RestaurantMenuIcon/>,
      link :"restaurant"
    },
    {
      name: `Bank info`, id: 3, icon: <AccountBalanceIcon />,
      link :`bank_info/${id_user}`
    },  
    {
      name: `Profile`, id: 4, icon: <InboxIcon />,
      link :`customer_details/${id_user}`
    },  
    {
      name: " Photos", id: 4, icon: <AddAPhoto />,
      link :"photos"
    },  
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            TapTap Now 
          </Typography>
          <div className={classes.search}>
            {/* 
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              /> 
            */}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
            {/* <AccountCircle /> */}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
       
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>

          <img src={logo} alt="Logo"
            style={{ height: 40, marginLeft: -60, marginRight: 20}}
          />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        <div className={classes.details}>

          <Avatar
            alt="Person"
            className={classes.avatar}
            src={logo}
          />
          
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            {user.data ? user.data.email_user : null}
          </Typography>
      
        </div>      
        {  adminType == 1 ? (
            <List style={{ marginLeft: 5 }} >
              {menuSuperAdmin.map((el) => (
                <StyledListItem button key={el.id}
                    selected={pathname.includes(el.link)}
                    classes={{ selected: classes.active }}>
                    <NavLink to={`/${el.link}`}
                      style={{
                        textDecoration: 'none',
                        color:'#333'
                      }}>
                    <ListItemIcon> {el.icon}</ListItemIcon>
                   </NavLink>
                    <NavLink to={`/${el.link}`}
                      style={{
                        textDecoration: 'none',
                        color:'#333'
                      }}
                    >
                    <ListItemText primary={el.name} />
                  </NavLink>
                </StyledListItem>
              ))
              }
            </List>
        ) : 
          <List style={{ marginLeft: 5 }}>
          {menuAdmin.map((el) => (
            <StyledListItem button key={el.id}
                selected={pathname.includes(el.link)}
                classes={{ selected: classes.active }}>
                <NavLink to={`/${el.link}`}
                  style={{
                    textDecoration: 'none',
                    color:'#333'
                  }}>
                <ListItemIcon> {el.icon}</ListItemIcon>
              </NavLink>
              <NavLink to={`/${el.link}`}
                  style={{
                    textDecoration: 'none',
                    color:'#333'
                  }}
                >
                <ListItemText primary={el.name} />
              </NavLink>
            </StyledListItem>
            ))
            }
          </List>
        }
      
        <ListItem button key="Logout" >
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <NavLink to={`/logout`}
                style={{
                  textDecoration: 'none',
                  color:'#333'
                }}
              >
            <ListItemText primary="Logout" />
            </NavLink>
        </ListItem>
      </Drawer>

      <div className="children">
          {props.children}
      </div>
    </div>
  );
 }

 export default withRouter(DrawerSide)