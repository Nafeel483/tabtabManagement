import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { CSVLink } from "react-csv";
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
// Dialog
import { Button, Tabs, Tab } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  userContext, getUserOwnerRestaurant,
  getUserCount, getUserAll
} from '../utils/userContext';
import { withStyles } from '@material-ui/core/styles';
import { urlFunction } from '../utils/urls';
import { profilePath } from '../utils/img_link';

import axios from "axios"
import { Redirect } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import UserList from './Cards/UserList';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
  rootList: {
    width: '100%',
    height: 520,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",

  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },

  TableRowDesign: {
    "&:hover": {
      backgroundColor: "#eee", cursor: "pointer"
    },
  },
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  paperModal: {
    position: 'absolute',
    marginLeft: "20%",
    marginTop: "5%",
    width: '60%',
    height: 700,
    backgroundColor: "#fff",
    border: 'none',
  },
  search: {
    width: 400,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#336699', 0.15),
    '&:hover': {
      backgroundColor: fade('#336699', 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  search2: {
    width: '80%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
    elevation: 6,
    '&:hover': {
      backgroundColor: fade('#FFF', 0.8),
    },
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 16,
    [theme.breakpoints.up('sm')]: {
    },
  },
  search1: {
    width: '100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
    elevation: 6,
    '&:hover': {
      backgroundColor: fade('#FFF', 0.8),
    },
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 16,
    [theme.breakpoints.up('sm')]: {
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    marginLeft: 0,
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

  ListItemStyle: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: fade('#eee', 0.20),
      cursor: "pointer",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  inputInput1: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: 200,
    }
  }
});

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.common.blue,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      filterResultCustomers: [],
      restaurants: [],
      customerOwner: [],
      open: false,
      openDialog: false,
      successOperation: null,
      snackbarOpen: false,
      currentUser: {},
      currentRestaurant: {},
      setPage: 1,
      setRowsPerPage: 1,
      countUser: 0,
      valueTabs: 0,
      restaurant_search_value: '',
      customerToCsv: [],
      userTypeID: 0,

    }
  }

  handleValueTabs = (event, valueTabs) => {
    this.setState({ valueTabs: valueTabs });
  }

  componentDidMount = async () => {
    let user = await userContext();
    if (user != null) {
      this.setState({
        user: JSON.parse(user),
        isLogin: true,
        userTypeID: JSON.parse(user).data.userTypeID
      })
    } else {
      // back him login
      this.setState({
        isLogin: false
      })
    }
    let countUser = await getUserCount();
    this.setState({
      countUser: countUser[0].userDataLength
    }, () => {
      // console.log("CountUser", countUser[0].userDataLength )
    })

    // Call user
    let customer = await getUserAll(20, 19);

    let customerToCsv = [];
    for (let cus in customer) {
      delete customer[cus].password_user;
      customerToCsv.push(customer[cus])
    }

    if (customer.length > 0) {
      this.setState({
        customer: customer,
        filterResultCustomers: customer,
        showProgress: false,
        customerToCsv: customerToCsv
      })
    }


    // Call customer owner  
    let customerOwner = await getUserOwnerRestaurant(this.state.user.token);
    if (customerOwner.length > 0) {
      this.setState({
        customerOwner: customerOwner,
        showProgress: false
      })
    }
    // console.log("Customer owner ", customerOwner)
  }

  getPaginationUser = async (amount, newPage) => {
    let customer = await getUserAll(amount, 19 * newPage);
    if (customer.length > 0) {
      this.setState({
        customer: customer,
        filterResultCustomers: customer,
        showProgress: false
      })
    }
  }

  // library code 
  handleChangePage = (event, newPage) => {
    this.setState({
      setPage: newPage
    });
    this.getPaginationUser(20, parseInt(newPage))
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      setRowsPerPage: event.target.value
    });
  };

  getUser = (user) => {
    // console.log("Get user", user)
    this.setState({
      currentUser: user
    })

    this.handleOpen()
  }

  currentRestaurant = (restaurant) => {
    this.setState({
      currentRestaurant: restaurant
    })

    this.handleOpenDialog();
  }

  handleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  };

  handleOpenDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  agreeToSetRestaurant = () => {
    let data = {
      id_restaurant: this.state.currentRestaurant.id_restaurant,
      user_id: this.state.currentUser.id_user,
      currentUser: this.state.currentUser,
      currentRestaurant: this.state.currentRestaurant,
    }
    axios.post(`${urlFunction()}/restaurant/setAdmin`, data, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      this.handleOpenDialog()
      this.getPaginationUser(19, 20)
      this.setState({
        successOperation: true,
        snackbarOpen: true
      })

    }).catch(err => {
      console.log("error", err)
      this.setState({})
    })
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: !this.state.snackbarOpen
    })
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSearch = async () => {
    let data = { 'user_name': this.state.search }
    axios
      .post(`${urlFunction()}/users/search`, data)
      .then((res) => {
        console.log("ress")
        if (res.data.length > 0) {
          this.setState({
            showProgress: false,
            customer: res.data,
            filterResultCustomers: res.data,
          })
        }
        this.setState({
          showProgress: false,
        })
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }

  onSearchRestaurant = async () => {
    let data = { 'restaurant': this.state.restaurant_search_value }

    axios
      .post(`${urlFunction()}/restaurant/search`, data)
      .then((res) => {
        console.log("Res of search", { "v": this.state.restaurant_search_value, 'result': res })

        if (res.data.length > 0) {
          this.setState({
            showProgress: false,
            restaurants: res.data || []
          })
        }
        this.setState({
          showProgress: false,
        })
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  deleteCustomer = (user) => {

    let data = {
      email: user.email_user
    }
    axios.post(`http://52.15.48.176:3001/api/v2/admin/user/delete`, data, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res)
      alert("Customer Delete Successfully")
      window.location.reload(true);

      this.setState({
        showProgress: false,
      })

    }).catch(err => {
      console.log("error", err)
      this.setState({
        showProgress: false,
      })
    })
  }
  Suspend = (user) => {

    let data = {
      email: user.email_user
    }
    axios.post(`http://52.15.48.176:3001/api/v2/admin/user/suspend`, data, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res)
      alert("Customer Suspend Successfully")
      window.location.reload(true);

      this.setState({
        showProgress: false,
      })

    }).catch(err => {
      console.log("error", err)
      this.setState({
        showProgress: false,
      })
    })
  }
  CancelUser = (user) => {

    let data = {
      email: user.email_user
    }
    axios.post(`http://52.15.48.176:3001/api/v2/admin/user/delete`, data, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res)
      alert("Customer Cancel Successfully")
      window.location.reload(true);

      this.setState({
        showProgress: false,
      })

    }).catch(err => {
      console.log("error", err)
      this.setState({
        showProgress: false,
      })
    })
  }
  render() {
    let { countUser, customer, open, close, restaurants, AlertTitle, successOperation, snackbarOpen, filterResultCustomers } = this.state
    const { classes } = this.props;
    if (this.state.isLogin == false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <TableContainer style={{
          marginTop: 80,
          paddingLeft: 20,
          paddingRight: 20,
          width: window.innerWidth - 300,
          height: window.innerHeight - 140,
        }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <h2> Customers</h2>
            <Link to={'/add_customer'}
              style={{
                textDecoration: "none"
              }}
            >
              <Button variant="contained" color="primary">
                Add Customer
                </Button>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div className={classes.search2}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  name="search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput1,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.handleInputChange}
                />

              </div>

              <Button variant="contained" color="primary"
                onClick={this.onSearch}
              >
                SEARCH
            </Button>

            </div>


          </div>


          <Tabs
            value={this.state.valueTabs}
            onChange={this.handleValueTabs}
            indicatorColor="primary"
            textColor="primary"
          >

            <Tab label="Customers" />
            <Tab label="Owner restaurant" />

          </Tabs>
          {this.state.valueTabs == 0 ? (
            <>
              <Table component={Paper} aria-label="customized table">
                <TableRow style={{
                  backgroundColor: "#fff"
                }}>
                  <TableCell> <b>Customers list</b> </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>

                  <TableCell>
                    <Button variant="contained" color="secondary">
                      <CSVLink
                        data={filterResultCustomers}
                        style={{
                          color: "#fff",
                          listStyleType: '#fff'
                        }}
                      > Download CSV </CSVLink>
                    </Button>

                  </TableCell>


                </TableRow>

                <TableRow style={{
                  backgroundColor: "#eeefff"
                }}>
                  <TableCell>  Name </TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone number</TableCell>

                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>

                </TableRow>
                <TableBody>
                  {filterResultCustomers.map(user => (
                    <TableRow
                      className={classes.TableRowDesign}

                      style={{
                        backgroundColor: user.restaurant_owner == 1 ? '#eee' : null,
                      }}>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}>

                          {user.photo_user != 'default_profil.png' ?

                            <Avatar style={{ width: 60, height: 60 }}>
                              <img src={`${profilePath}${user.photo_user}`}
                                style={{ width: 60, height: 60 }} />
                            </Avatar>
                            :
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                          }
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: 8,
                            }}>
                            {user.name_user}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="left"> {user.email_user} </TableCell>
                      <TableCell align="left"> {user.tel_user} </TableCell>
                      <TableCell align="left">

                        <Button variant="outlined" color="primary"
                          onClick={() =>
                            this.getUser(user)
                            // user.restaurant_owner == 0 ? this.getUser(user) : 
                            // alert("Already manage a restaurant")
                          }>
                          Give admin access
                       </Button>

                      </TableCell>
                      <TableCell align="left">
                        <Link to={`customer_details/${user.id_user}`}>
                          <Button variant="outlined" color="primary">
                            View
                       </Button>
                        </Link>
                      </TableCell>
                      {this.state.userTypeID == 1&&
                        <>
                        <TableCell align="left">
                          <Button variant="contained" color="secondary" onClick={() => { this.deleteCustomer(user) }}>
                            Delete
                       </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button variant="contained" color="primary" onClick={() => { this.Suspend(user) }}>
                            Suspend
                       </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button variant="contained" color="primary" onClick={() => { this.CancelUser(user) }}>
                            Cancel
                       </Button>
                        </TableCell>
                      </>
                      }
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[20]}
              component="div"
              count={Math.ceil(countUser / 20)}
              rowsPerPage={1}
              page={this.state.setPage}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            </>
          ) :

            <UserList customerOwner={this.state.customerOwner} />

          }
        </TableContainer>
      <Modal
        open={open}
        onClose={this.handleOpen}
        style={{
          boxShadow: '0px 2px 0px 3px #ccc',
        }}
      >

        <div className={classes.paperModal}
          style={{
            boxShadow: '0px 0px 2px #eee',
          }}>
          <div style={{
            backgroundColor: '#0f4c9b',
            padding: 12,
          }}>


            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >

              <div className={classes.search1}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search restaurant by name"
                  name='restaurant_search_value'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput1,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.handleInputChange}
                />
              </div>

              <Button variant="contained" color="primary"
                onClick={this.onSearchRestaurant}>
                SEARCH
              </Button>

            </div>
          </div>
          <div>
            <Typography variant="h5" component="h2"
              style={{
                marginLeft: 32,
                marginTop: 8,
                color: '#333'
              }}>
              You're on the way to set a restaurant to {this.state.currentUser.name_user}
            </Typography>
            <List className={classes.rootList}>
              {
                restaurants.map(resto => (
                  <ListItem key={resto.restaurant_name}
                    className={classes.ListItemStyle}
                    onClick={this.currentRestaurant.bind(this, resto)}

                  >
                    <ListItemAvatar>
                      <Avatar style={{ width: 60, height: 60 }}>
                        <img src={`http://localhost:3001/api/v2/api/path?img_restaurant=${resto.logo_restaurant}`
                        }
                          style={{ width: 60, height: 60 }} />
                      </Avatar>

                    </ListItemAvatar>
                    <ListItemText primary={resto.name_restaurant} secondary={resto.adresse_restaurant} />

                  </ListItem>
                ))
              }
            </List>
          </div>
        </div>
      </Modal>


      <Dialog
        disableBackdropClick={true}
        open={this.state.openDialog}
        onClose={this.handleOpenDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Give  {this.state.currentUser.name_user} full access  to {this.state.currentRestaurant.name_restaurant}  </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you really want to set {this.state.currentUser.name_user} as admin of {this.state.currentRestaurant.name_restaurant} restaurant
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOpenDialog} color="primary">
            Disagree
          </Button>
          <Button onClick={this.agreeToSetRestaurant} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

        {
      successOperation == true ?

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={this.handleCloseSnackbar}>
        <Alert onClose={this.handleCloseSnackbar} severity="success">
          Congrats {this.state.currentRestaurant.name_restaurant} have been set to  {this.state.currentUser.name_user}  {this.state.currentUser.lastname}
        </Alert>
      </Snackbar>
      :
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={this.handleCloseSnackbar}>
        <Alert onClose={this.handleCloseSnackbar} severity="error">
          This is a error message!
            </Alert>
      </Snackbar>
    }

      </div >
    )
  }

}

export default withStyles(styles)(Customer);