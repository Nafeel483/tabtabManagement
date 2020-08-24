
import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
// Dialog
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { urlFunction } from '../utils/urls';
import { restaurantPath } from '../utils/img_link';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios"
import Switch from '@material-ui/core/Switch';
import { userContext } from '../utils/userContext';
import moment from 'moment';


import {
  listRestaurantContext,
  getRestaurantByIdUsers,
  listRestaurantCount
} from '../utils/restaurantContext';

import { getRestaurantReadyToGetPaid } from '../utils/StatContext';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  rootList: {
    width: window.innerWidth,
    height: 520,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

  table: {
    width: 1100
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


class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      restaurants: [],
      open: false,
      openDialog: false,
      currentUser: {},
      currentRestaurant: {},
      successOperation: null,
      snackbarOpen: false,
      showProgress: true,
      setPage: 1,
      setRowsPerPage: 1,
      search: '',
      checkedB: true,
      countRestaurant: 0,
      user: {},
      userTypeID: 0,
      dataPaymentToPaid: []
    }
  }


  getRestaurantsDetails = (user) => {
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

  componentDidMount = async () => {
    let user = await userContext();
    if (user !== null) {
      this.setState({
        user: JSON.parse(user),
        isLogin: true,
        userTypeID: JSON.parse(user).data.userTypeID
      })
    } else {
      this.setState({
        isLogin: false
      })
    }

    if (JSON.parse(user).data.userTypeID == 1) {
      let restaurants = await listRestaurantContext(20, 19);
      if (restaurants.length > 0) {
        this.setState({
          restaurants: restaurants,
          showProgress: false
        })
      }

      let countRestaurant = await listRestaurantCount();
      if (countRestaurant.length > 0) {
        this.setState({
          countRestaurant: countRestaurant[0].restaurantLength
        }, () => {
          // console.log(" Count restaurant", countRestaurant[0].restaurantLength )
        })
      }

      let dataPaymentToPaid = await getRestaurantReadyToGetPaid(JSON.parse(user).token)
      // Sort payment who's grander than 0 $ 
      let sortPayement = dataPaymentToPaid.sort((a, b) => b.diference - a.diference)
      this.setState({
        dataPaymentToPaid: sortPayement
      })

    } else {

      let dataPaymentToPaid = await getRestaurantReadyToGetPaid(JSON.parse(user).token)
      let restaurants = await getRestaurantByIdUsers(JSON.parse(user).data.id_user, JSON.parse(user).token);
      let filterPayment = dataPaymentToPaid.filter(el => el.adminRestID == JSON.parse(user).data.id_user);

      if (restaurants.length > 0) {
        this.setState({
          restaurants: restaurants,
          showProgress: false,
          dataPaymentToPaid: filterPayment
        })
      }
    }
  }

  getPaginationRestaurant = async (amount, newPage) => {
    let restaurants = await listRestaurantContext(amount, 19 * newPage);
    if (restaurants.length > 0) {
      this.setState({
        restaurants: restaurants,
        showProgress: false
      })
    }
  }

  // Library code 
  handleChangePage = (event, newPage) => {
    this.setState({
      setPage: newPage
    });
    this.getPaginationRestaurant(20, parseInt(newPage))
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      setRowsPerPage: event.target.value
    });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSearch = async () => {

    let data = {
      'restaurant': this.state.search,
      'adminRestID': this.state.user.data.id_user,
      'userTypeID': this.state.user.data.userTypeID
    }
    axios
      .post(`${urlFunction()}/restaurant/search`, data)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            showProgress: false,
            restaurants: res.data
          })
        } else {
          alert("Can't find any restaurant at this name")
          this.setState({
            showProgress: false,
            findData: false
          })
        }

      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })

  }

  handleChangeIOS = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  groupByrestaurant = (arry) => {
    let group = [];
    arry.forEach((restaurant, ind) => {
      if (!group[restaurant.name_restaurant]) {
        group[restaurant.name_restaurant] = {
          data: []
        }
        group[restaurant.name_restaurant].data.push(restaurant);
      }
    });
    return Object.values(group);
  }

  dateDiff(date1, date2) {
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
    diff.day = tmp;

    return diff;
  }

  dataDifferenceForPayment = (pData) => {
    // should take the date of last payment
    if (pData != null) {
      let last_date = new Date(pData);
      let currentDate = new Date();
      let diffObject = this.dateDiff(last_date, currentDate);

      if (diffObject.day > 15) {
        return 'Pay urgently'
      } else if (diffObject.day <= 1) {
        return `First time paid need date of last orders ..!`
      } else {
        return `${Math.abs(diffObject.day - 15)} Day(s)`
      }
    } else {
      return 'Not pay yet'
    }
  }

  render() {
    if (this.state.isLogin == false) {
      return <Redirect to='/' />
    }

    let { userTypeID, countRestaurant, search, open, close, restaurants, AlertTitle, successOperation, snackbarOpen } = this.state
    const { classes } = this.props;
    console.log(restaurants)
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
            <h2> Restaurants</h2>
            <Link to={'/form_restaurant'}
              style={{
                textDecoration: "none"
              }}>
              <Button variant="contained" color="primary">
                Add Restaurant
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
              <div className={classes.search1}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  type="text"
                  name="search"

                  placeholder="Search…"
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
            {/* 
            <FormControlLabel
              label ="FILTER"
                control={
                  <IOSSwitch
                    checked={this.state.checkedB}
                    onChange={this.handleChangeIOS('checkedB')}
                    value="checkedB"
                  />
                }
            /> */}
          </div>

          {this.state.showProgress == true ?
            <LinearProgress />
            : null
          }

          {/* Restaurant need attention to send payment */}
          <ExpansionPanel
            style={{
              marginBottom: 20,
            }}
            defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography className={classes.heading}> <h3> Restaurant need to process payment  </h3> </Typography>

            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              <Table
                component={Paper} aria-label="customized table">
                <TableRow style={{
                  backgroundColor: "#fff"
                }}>
                  <TableCell> <b> Process payment for </b> </TableCell>
                  <TableCell>  </TableCell>
                  <TableCell>  </TableCell>
                  <TableCell>  </TableCell>
                </TableRow>

                <TableRow style={{
                  backgroundColor: "#eeefff"
                }}>
                  <TableCell>  Name </TableCell>
                  <TableCell align="left">Adress</TableCell>
                  <TableCell align="left">Amount </TableCell>
                  <TableCell align="left">Last payment due </TableCell>
                  <TableCell align="left">Day left to pay</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
                <TableBody>
                  {this.state.dataPaymentToPaid.map(resto => (
                    <TableRow className={classes.TableRowDesign}
                      onClick={this.getRestaurantsDetails.bind(this, resto)}
                      key={resto.id_restaurant}
                      style={{
                        backgroundColor: '#fff'
                      }}>
                      <TableCell>
                        <div style={{
                          display: "flex",
                          alignItems: "center"
                        }}>
                          <Avatar style={{ width: 60, height: 60 }}>
                            <img src={`${restaurantPath}${resto.logo_restaurant}`
                            }
                              style={{ width: 60, height: 60 }} />
                          </Avatar>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: 8,
                            }}>
                            {resto.name_restaurant} <br />
                            {resto.email_restaurant}
                            {resto.tel_restaurant}
                          </div>

                        </div>
                      </TableCell>


                      <TableCell align="left">{resto.adresse_restaurant} </TableCell>
                      <TableCell align="left"> ${resto.diference} USD </TableCell>
                      <TableCell align="left">
                        {
                          moment(resto.last_date_payment).format('DD/MM/YYYY') == "Invalid date" ?
                            "Not pay yet " :
                            moment(resto.last_date_payment).format('DD/MM/YYYY')
                        }
                      </TableCell>
                      <TableCell align="left"> {
                        this.dataDifferenceForPayment(resto.last_date_payment)
                      }
                      </TableCell>
                      <TableCell align="left">
                        {this.state.userTypeID == 1 ?
                          <Link to={
                            `/create_invoice/${resto.id_restaurant}`
                          }>
                            <Button variant="outlined" color="primary">
                              View
                                  </Button>
                          </Link> :
                          <Link to={
                            `/restaurant_details/${resto.id_restaurant}`
                          }>
                            <Button variant="outlined" color="primary">
                              View
                                  </Button>

                          </Link>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div>
            <Table
              component={Paper} aria-label="customized table">

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
                {userTypeID != 1 &&
                  <>
                    <TableCell align="left">Closing Time</TableCell>
                    <TableCell align="left">Opening Time</TableCell>
                  </>
                }

              </TableRow>
              <TableBody>
                {restaurants.map(resto => (

                  <TableRow className={classes.TableRowDesign}
                    onClick={this.getRestaurantsDetails.bind(this, resto)}
                    key={resto.id_restaurant}>
                    <TableCell>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                        <Avatar style={{ width: 60, height: 60 }}>
                          <img src={`${restaurantPath}${resto.logo_restaurant}`
                          }
                            style={{ width: 60, height: 60 }} />
                        </Avatar>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: 8,
                          }}>
                          {resto.name_restaurant} <br />
                          {resto.email_restaurant}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="left">{resto.adresse_restaurant} </TableCell>
                    <TableCell align="left">{resto.tel_restaurant}</TableCell>
                    <TableCell align="left">
                      <Link to={
                        `/restaurant_details/${resto.id_restaurant}`
                      }>
                        <Button variant="outlined" color="primary">
                          View
                </Button>
                      </Link>
                    </TableCell>
                    {userTypeID != 1 &&
                      <>
                        <TableCell align="left">
                          11:49PM
                        </TableCell>
                        <TableCell align="left">
                          10:49AM
                        </TableCell>
                      </>
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>

        </TableContainer>
        {userTypeID == 1 ?
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={Math.ceil(countRestaurant / 20)}
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
          : null}

      </div>
    )
  }

}

export default withStyles(styles)(Restaurant);