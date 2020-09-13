
import React from 'react';
import CustomerCard from './Cards/customersCard.js';
import Card from '@material-ui/core/Card';
import main from "../assets/images/profilMain.png";
import julio from "../assets/images/julio.jpg";
import sandyna from "../assets/images/sandyna.jpg";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Modal from '@material-ui/core/Modal';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { userContext } from '../utils/userContext';

const styles = theme => ({
  rootTabs: {
    flexGrow: 1,
  },
  rootList: {
    width: 800,
    height: 520,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",

  },
  table: {
    width: 1180,
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
    boxShadow: "#eee",
    padding: theme.spacing(2, 4, 3),
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
  search1: {
    width: 300,
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

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [
        {
          lastname: 'Joseph', firstname: 'Seth-Jetro', image: main, totalAchat: 3018, totalOrders: 50,
          email: "julio.fils1@gmail.com", phoneNumber: "48188107"
        },
        {
          lastname: 'Jean', firstname: 'Julio Fils', image: julio, totalAchat: 2500, totalOrders: 32,
          email: "julio.fils1@gmail.com", phoneNumber: "48188107",
        }
      ],
      menus: [
        {
          menu_name: ' Duri a lalo',
          menu_desc: "Duri a lalo details ",
          price: '13',
          logo: "url",
        },

        {
          menu_name: 'Ragou a kochon ',
          menu_desc: "Ragou  kochon accompagner a ",
          price: '13',
          logo: "url",
        },
      ],
      invoices: [
        {
          id: '1232',
          date: "12/01/2019 ",
          description: 'invoices desc',
          total: 1203,
          status: "PAID"
        },
        {
          id: '2434',
          date: "12/01/2019 ",
          description: 'invoices desc',
          total: 1900,
          status: "PAID"
        },
      ],
      open: false,
      openDialog: false,
      currentUser: {},
      currentRestaurant: {},
      successOperation: null,
      snackbarOpen: false,
      valueTabs: 0,
      userTypeID: 0,
      restaurants: [
        {
          restaurant_name: 'Coin 95',
          adress: "Delmas 66, No 10",
          phoneNumber: '+50948188107',
          logo: "url",
        },

        {
          restaurant_name: 'Belle Mart food',
          adress: "Tabarre 48, No 10",
          phoneNumber: '+50948188122',
          logo: "url",
        },
      ],

    }
  }
  // componentDidMount = async () => {
  //   let user = await userContext();
  //   if (user !== null) {
  //     this.setState({
  //       // user: JSON.parse(user),
  //       // isLogin: true,
  //       userTypeID: JSON.parse(user).data.userTypeID
  //     })
  //   }
  // }
  handleValueTabs = (event, valueTabs) => {
    this.setState({ valueTabs: valueTabs });
  };
  getmenusDetails = (user) => {
    this.setState({
      currentUser: user
    })
  }

  currentRestaurant = (restaurant) => {
    this.setState({
      currentRestaurant: restaurant
    })
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: !this.state.snackbarOpen
    })
  }

  render() {
    let { customer, open, close, menus, invoices, restaurants, AlertTitle, successOperation, snackbarOpen } = this.state
    const { classes } = this.props;
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

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <h2> Reports</h2>

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
                <div className={classes.search1}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput1,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />

                </div>

                <Button variant="contained" color="primary">
                  SEARCH
                    </Button>
              </div>
              <Button variant="outlined" color="primary"
                startIcon={<FilterListIcon />}>
                FILTER
                </Button>
            </div>
          </div>

          <Tabs
            value={this.state.valueTabs}
            onChange={this.handleValueTabs}
            indicatorColor="primary"
            textColor="primary">

            <Tab label="Restaurants" />
            <Tab label="Clients" />
            <Tab label="Menus" />
            <Tab label="Orders" />
            <Tab label="Payment" />

          </Tabs>



          {this.state.valueTabs == 0 ?
            <div value={this.state.valueTabs} index={0}>

              <Table component={Paper} aria-label="customized table">
                <TableRow style={{
                  backgroundColor: "#fff"
                }}>
                  <TableCell> <b>Restaurants list</b> </TableCell>
                  <TableCell>  </TableCell>
                  <TableCell>  </TableCell>
                  <TableCell>  </TableCell>
                </TableRow>

                <TableRow style={{
                  backgroundColor: "#eeefff"
                }}>
                  <TableCell>  Name </TableCell>
                  <TableCell align="left">Adress</TableCell>
                  <TableCell align="left">Phone number</TableCell>

                  <TableCell align="left">Actions</TableCell>
                </TableRow>
                <TableBody>
                  {restaurants.map(resto => (

                    <TableRow className={classes.TableRowDesign}
                      onClick={null} >
                      <TableCell>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: 8,
                            }}>
                            {resto.restaurant_name} <br />
                            {resto.email}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="left">{resto.adress} </TableCell>
                      <TableCell align="left">{resto.phoneNumber}</TableCell>
                      <TableCell align="left">
                        <Link to={`/restaurant_details/${resto.phoneNumber}`}>
                          <Button variant="outlined" color="primary">
                            View
                  </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>


            </div>
            : this.state.valueTabs == 1 ?
              <div value={this.state.valueTabs} index={1}>

                <Table component={Paper} aria-label="customized table">
                  <TableRow style={{
                    backgroundColor: "#fff"
                  }}>
                    <TableCell> <b>Customers list</b> </TableCell>
                    <TableCell>  </TableCell>
                    <TableCell>  </TableCell>
                    <TableCell>  </TableCell>
                    <TableCell>  </TableCell>
                  </TableRow>

                  <TableRow style={{
                    backgroundColor: "#eeefff"
                  }}>
                    <TableCell>  Name </TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone number</TableCell>

                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                  <TableBody>
                    {customer.map(user => (
                      <TableRow className={classes.TableRowDesign}
                      >
                        <TableCell>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                          }}>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 8,
                              }}>
                              {user.firstname}
                              {user.lastname}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell align="left">{user.email} </TableCell>
                        <TableCell align="left">{user.phoneNumber}</TableCell>
                        <TableCell align="left">
                          <Button variant="outlined" color="primary">
                            View
                    </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </div>
              : this.state.valueTabs == 2 ?
                <div value={this.state.valueTabs} index={2}>
                  <Table component={Paper} aria-label="customized table">
                    <TableRow style={{
                      backgroundColor: "#fff"
                    }}>
                      <TableCell> <b> Menu  </b> </TableCell>
                      <TableCell>  </TableCell>
                      <TableCell>  </TableCell>
                    </TableRow>

                    <TableRow style={{
                      backgroundColor: "#eeefff"
                    }}>

                      <TableCell> Menu ID </TableCell>
                      <TableCell align="left"> Client </TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                    <TableBody>
                      {menus.map(user => (
                        <TableRow className={classes.TableRowDesign}
                          onClick={this.getmenusDetails.bind(this, user)} >
                          <TableCell>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                            }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: 8,
                                }}>
                                11<br />
                              </div>
                            </div>
                          </TableCell>

                          <TableCell align="left">{user.menu_desc} </TableCell>
                          <TableCell align="left">{user.price} $</TableCell>
                          <TableCell align="left">
                            <Link to={`/order_details/${1}`}>
                              <Button variant="outlined" color="primary">
                                View
                        </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                : this.state.valueTabs == 3 ?
                  <div value={this.state.valueTabs} index={3}>
                    <Table component={Paper} aria-label="customized table">
                      <TableRow style={{
                        backgroundColor: "#fff"
                      }}>
                        <TableCell> <b> ODERS </b> </TableCell>
                        <TableCell>  </TableCell>
                        <TableCell>  </TableCell>
                        <TableCell>  </TableCell>
                        <TableCell>  </TableCell>
                      </TableRow>

                      <TableRow style={{
                        backgroundColor: "#eeefff"
                      }}>

                        <TableCell> Order ID </TableCell>
                        <TableCell align="left"> Client </TableCell>
                        <TableCell align="left">Total</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Actions</TableCell>
                      </TableRow>
                      <TableBody>
                        {menus.map(user => (
                          <TableRow className={classes.TableRowDesign}
                            onClick={this.getmenusDetails.bind(this, user)} >
                            <TableCell>
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                              }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginLeft: 8,
                                  }}>
                                  11<br />
                                </div>
                              </div>
                            </TableCell>

                            <TableCell align="left">{user.menu_desc} </TableCell>
                            <TableCell align="left">{user.price} $</TableCell>
                            <TableCell align="left"> Deliver</TableCell>
                            <TableCell align="left">
                              <Link to={`/order_details/${1}`}>
                                <Button variant="outlined" color="primary">
                                  View
                        </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  : this.state.valueTabs == 4 ?
                    <div value={this.state.valueTabs} index={4}>
                      <Table component={Paper} aria-label="customized table">
                        <TableRow style={{
                          backgroundColor: "#fff"
                        }}>
                          <TableCell> <b> Invoices </b> </TableCell>
                          <TableCell>  </TableCell>
                          <TableCell>  </TableCell>
                          <TableCell>  </TableCell>
                          <TableCell>  </TableCell>
                        </TableRow>

                        <TableRow style={{
                          backgroundColor: "#eeefff"
                        }}>

                          <TableCell>  ID </TableCell>
                          <TableCell align="left"> Date</TableCell>
                          <TableCell align="left"> Description</TableCell>
                          <TableCell align="left">Total</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                        <TableBody>
                          {invoices.map(invoice => (
                            <TableRow className={classes.TableRowDesign}
                              onClick={this.getmenusDetails.bind(this, invoice)} >
                              <TableCell>
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginLeft: 8,
                                    }}>
                                    {invoice.id} <br />
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell align="left">{invoice.date} </TableCell>
                              <TableCell align="left">{invoice.description} </TableCell>
                              <TableCell align="left"> $ {invoice.total} </TableCell>
                              <TableCell align="left">{invoice.status} </TableCell>
                              <TableCell align="left">
                                <Link to={`/invoices_details/${1}`}>
                                  <Button variant="outlined" color="primary">
                                    View
                        </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div> : null
          }

        </TableContainer>
      </div>
    )
  }

}
export default withStyles(styles)(Report);