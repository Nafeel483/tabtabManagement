
import React, { Component } from 'react';
import axios from "axios"
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
  getUserCount, getUserAll
} from '../utils/userContext';
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
class Suspend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      food: '',
      experience: '',
      user: '',
      experience1: "",
      resturantList: [],
      id_restaurant_fk: '',
      fee: '',
      showProgress: false,
      updateValue: false
    }
  }
  componentDidMount = async () => {
    let user = await userContext();
    if (user != null) {
      this.setState({
        user: JSON.parse(user),
        isLogin: true,
      })
    } else {
      // back him login
      this.setState({
        isLogin: false
      })
    }
    axios.get(`${urlFunction()}/user/getsuspendeduser`, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res.data)
      this.setState({
        resturantList: res.data,
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
  }
  handleInputChange = (event) => {
    this.setState({ id_restaurant_fk: event.target.value })
  }
  handleInputChangefee = (event) => {
    this.setState({ fee: event.target.value })
  }

  updateResturant = (value) => {
    let data = {
      email: value.email_user
    }
    axios.post(`${urlFunction()}/user/release`, data, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res)
      alert("Customer Release Successfully")
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
          <h1>Release User</h1>

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
                <TableCell>  Customer Name </TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>

                <TableCell align="left">Actions</TableCell>


              </TableRow>
              <TableBody>
                {this.state.resturantList.map(resto => (
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
                          {resto.name_user}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">{resto.email_user} </TableCell>
                    <TableCell align="left">{resto.tel_user} </TableCell>
                    <TableCell align="left">
                      <Button variant="contained" color="primary"
                        onClick={() => this.updateResturant(resto)}
                      >
                        Release
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>


            </Table>

          </div>
        </TableContainer>
      </>
    )
  }
};

export default withStyles(styles)(Suspend)    