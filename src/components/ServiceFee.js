
import React, { Component } from 'react';
import axios from "axios"
import SearchIcon from '@material-ui/icons/Search';

import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import { urlFunction } from '../utils/urls';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  userContext, getUserOwnerRestaurant,
  getUserCount, getUserAll,

} from '../utils/userContext';
import {
  listRestaurantContext,
  getRestaurantByIdUsers,
  listRestaurantCount
} from '../utils/restaurantContext';
const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  },
  paperModal: {
    position: 'absolute',
    marginLeft: "33%",
    marginTop: "5%",
    width: '33%',
    height: 540,
    backgroundColor: "#fff",
    border: 'none',
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
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 16,
    [theme.breakpoints.up('sm')]: {
    },
  },
  TableRowDesign: {
    "&:hover": {
      backgroundColor: "#eee", cursor: "pointer"
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '75ch',
    },
  },
}));
class ServiceFee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      food: '',
      experience: '',
      user: '',
      experience1: "",
      resturantList: [],
      resturantList1: [],
      resturantlist2: [],
      id_restaurant_fk: '',
      fee: '',
      showProgress: false,
      updateValue: false,
      resturantvalue: '',
      userTypeID: 0,
      setPage: 1,
      setRowsPerPage: 1,
      countRestaurant: 0,

    }
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
    axios.get(`${urlFunction()}/restaurant/payment/admin/getfee`, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res.data)
      this.setState({
        resturantList: res.data,
      })
      this.setState({
        resturantlist2: res.data.slice(0, 20)
      })
    
      this.setState({
        showProgress: false,
      })

    }).catch(err => {
      console.log("error", err)
      this.setState({
        showProgress: false,
      })
    })
    let countRestaurant = await listRestaurantCount();
    if (countRestaurant.length > 0) {
      this.setState({
        countRestaurant: countRestaurant[0].restaurantLength
      }, () => {
        // console.log(" Count restaurant", countRestaurant[0].restaurantLength )
      })
    }
  }
  onSearch = () => {
    let data = this.state.resturantList.filter((value) => {
      return (
        value.name_restaurant == this.state.resturantvalue
      )
    })
    console.log("The Search Value is:", data)
    this.setState({ resturantList1: data })
  }
  handleInputChange = (event) => {
    this.setState({ resturantvalue: event.target.value })
  }
  handleInputChangefee = (event) => {
    this.setState({ fee: event.target.value })
  }
  submit = () => {
    let data = {
      id_restaurant_fk: this.state.id_restaurant_fk,
      fee: this.state.fee,
    }
    this.setState({ showProgress: true })
    axios
      .post(`${urlFunction()}/restaurant/payment/admin/addfee`, data, {
        headers: {
          Authorization: 'bearer ' + this.state.user.token,
        },
      })
      .then((res) => {
        console.log("DOne", res)
        // window.location.reload(true);
        alert("Succesfully Added")
        this.setState({ showProgress: false })
        window.location.reload(true);
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  updateResturant = () => {
    let data = {
      id_restaurant: this.state.id_restaurant_fk,
      service_fee: this.state.fee,
    }
    this.setState({ showProgress: true })
    axios
      .post(`${urlFunction()}/restaurant/payment/admin/updatefee`, data, {
        headers: {
          Authorization: 'bearer ' + this.state.user.token,
        },
      })
      .then((res) => {
        console.log("DOne", res)
        // window.location.reload(true);
        alert("Succesfully Updated")
        this.setState({ showProgress: false })
        window.location.reload(true);
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  updateFee = (value) => {
    console.log("The Value: ", value)
    this.setState({ updateValue: true })
    this.setState({ id_restaurant_fk: value.id_restaurant })
    this.setState({ fee: value.service_fee })

  }
  getPaginationRestaurant = async (amount, newPage) => {
    let restaurants = this.state.resturantList.slice(amount, 19 * newPage);
    if (restaurants.length > 0) {
      this.setState({
        resturantlist2: restaurants,
        showProgress: false
      })
    }
  }
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
  render() {
    const { classes } = this.props;
    console.log('my user is', this.state.user)
    return (
      <>
        <TableContainer style={{
          marginTop: 80,
          paddingLeft: 20,
          paddingRight: 20,
          width: window.innerWidth - 300,
        }}>
          {this.state.showProgress == true ?
            <LinearProgress />
            : null
          }
          <h1>Resturant Fee</h1>
          {
            this.state.updateValue ?
              <>
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
                      justifyContent: "space-between"
                    }}
                  >

                    <div>
                      <h4>Service Fee</h4>
                      <div className={classes.search1}>

                        <InputBase
                          type="text"
                          name="search"
                          value={this.state.fee}
                          placeholder="Service Fee"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput1,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                          onChange={this.handleInputChangefee}

                        />
                      </div>
                    </div>

                    <Button variant="contained" color="primary" style={{ marginTop: '30px' }}
                      onClick={this.updateResturant}
                    >
                      Update
                  </Button>

                  </div>

                </div>
              </>
              :
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
                      {/* <SearchIcon /> */}
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
              </div>
          }
          <div>
            <Table
              component={Paper} aria-label="customized table">

              <TableRow style={{
                backgroundColor: "#fff"
              }}>
                <TableCell> <b>Restaurants Service list</b> </TableCell>
                <TableCell>  </TableCell>
                <TableCell>  </TableCell>
              </TableRow>

              <TableRow style={{
                backgroundColor: "#eeefff"
              }}>
                <TableCell>  Resturant Name </TableCell>
                <TableCell align="left">Service Fee</TableCell>

                <TableCell align="left">Actions</TableCell>


              </TableRow>
              {
                this.state.resturantList1.length == 0 ?
                  <TableBody>
                    {this.state.resturantlist2.map(resto => (
                      <TableRow className={classes.TableRowDesign}
                      // onClick={this.getRestaurantsDetails.bind(this, resto)}
                      // key={resto.id_restaurant}
                      >
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
                              {resto.name_restaurant}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">{`${resto.service_fee}$`} </TableCell>
                        <TableCell align="left">
                          <Button variant="contained" color="primary"
                            onClick={() => this.updateFee(resto)}
                          >
                            Update
            </Button>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                  :
                  <TableBody>
                    {this.state.resturantList1.map(resto => (
                      <TableRow className={classes.TableRowDesign}
                      // onClick={this.getRestaurantsDetails.bind(this, resto)}
                      // key={resto.id_restaurant}
                      >
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
                              {resto.name_restaurant}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">{`${resto.service_fee}$`} </TableCell>
                        <TableCell align="left">
                          <Button variant="contained" color="primary"
                            onClick={() => this.updateFee(resto)}
                          >
                            Update
          </Button>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
              }

            </Table>

          </div>
        </TableContainer>
        {this.state.userTypeID == 1 ?
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={Math.ceil(this.state.countRestaurant / 20)}
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
      </>
    )
  }
};

export default withStyles(styles)(ServiceFee)    