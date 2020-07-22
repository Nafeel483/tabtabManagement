 
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

import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { CSVLink , CSVDownload} from "react-csv";
// Dialog
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core/';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog } from '@material-ui/core/';
import { Link, Redirect } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { withStyles } from '@material-ui/core/styles';
import { userContext } from '../utils/userContext';
import { getInterestData, filterInterestByDateInterval} from '../utils/restaurantContext';

const styles = theme => ({
  rootList: {
    width: 800,
    height: 520,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",

  },
  table: {
    width: 1100,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },

  TableRowDesign:{
    "&:hover": {
      backgroundColor: "#eee", cursor:"pointer"
    },
},
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  paperModal: {
    position: 'absolute',
    marginLeft:"20%",
    marginTop:"5%",
    width: '60%',
    height: 700,
    backgroundColor: "#fff",
    border: 'none',
    boxShadow:"#eee",
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
    elevation:6,
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

class Interest extends React.Component {  

  constructor(props) {
    let d  = new Date()
     super(props);
     this.state = {
       interests: [
        
       ],
       open: false,
       openDialog: false,
       currentUser: {},
       currentRestaurant: {},
       successOperation: null,
       snackbarOpen: false,
       selectedDate: '2014-08-18T21:11:54',
       start_date: d,
       end_date: d,
      }
   }
  
  getinterestsDetails = (user) => {
    this.setState({
      currentUser: user
    })
  }

  currentRestaurant =(restaurant) => {
    this.setState({
      currentRestaurant: restaurant
    })  
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen:!this.state.snackbarOpen
    })
  }
  setSelectedDate = (date) => {
    this.setState({ selectedDate: date })
  }

  handleDateChange = date => {
    this.setSelectedDate(date);
  };


  getInterest = async () => {
    let interests = await getInterestData();
    this.setState({
      interests: interests
    })   
  }

  setstart_date = (date) => {
    this.setState({ start_date: date })
  }

  setsend_date = (date) => {
    this.setState({ end_date: date })
  }

  handleDateChange = date => {
    this.setstart_date(date);
  }

  handleDateChangeEnd = date => {
    this.setsend_date(date);
  }
  

  onFilterByDateInterval = async () => {
  
    let date = {
      start_date: this.state.start_date,
      end_date: this.state.end_date
    }
    
    let interestRes = await filterInterestByDateInterval(date,this.state.user.token)
    if (interestRes.length > 0) {
      this.setState({
        interests: interestRes,
      })
    } else {
      this.setState({
        openDialog: true
      })
    }
  }

  handleClose = () => {
     this.setState({
       openDialog: false
     })
  };
  
  componentDidMount = async ()=> {
    this.getInterest()
    let user = await userContext();
    if (user !== null) {
      this.setState({
        user: JSON.parse(user),
        isLogin: true
      })
    } else {
      this.setState({
        isLogin: false
      })
    }
  }
  
  render() {
    if (this.state.isLogin == false ) {
      return <Redirect to='/' />
    }
    let {openDialog,start_date, end_date , customer, open, close, interests, AlertTitle, successOperation,snackbarOpen} = this.state
    const { classes, selectedDate } = this.props;
      
    return (
      <div>
      <TableContainer style={{
            marginTop: 80,
            paddingLeft: 20,
            paddingRight: 20,
            width: window.innerWidth - 300,
            height: window.innerHeight - 140,
        }}>
        <div style = {{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-between"
            }}>         
            <h2> List people interest</h2>
        </div>
    
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
                 
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              marginBottom: 20,
        
            }}>
            
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div style={{
                  display: 'flex',
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 560,
                }}
              >
                  <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start date"
                        format="MM/dd/yyyy"
                        value={start_date}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'Start date',
                        }}
                  />
                    
                  <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End date"
                        format="MM/dd/yyyy"
                        value={end_date}
                        onChange={this.handleDateChangeEnd}
                        KeyboardButtonProps={{
                          'aria-label': 'Start date',
                        }}
                  /> 
                  <div className="me">
                      <Button variant="contained"
                          style={{
                            marginTop: 25,
                          }}
                        color="secondary"
                          onClick={this.onFilterByDateInterval}>
                          Filter
                      </Button>
                    </div>
                </div>
            </MuiPickersUtilsProvider>


            <Button variant="contained" color="secondary"
             style={{
               marginTop: 25,
               height: 35,
               width: 220,
        
              }}
            >
              <CSVLink
                data={this.state.interests}
                filename={`interest_${start_date}_${end_date}.csv`}
                style={{
                  color: "#fff",
                  listStyleType:'#fff'
              }}
              > Download interest list
              </CSVLink>
            </Button>      
          </div>

        <Table  component={Paper}   aria-label="customized table">
          <TableRow style={{
            backgroundColor:"#fff"
          }}> 
            <TableCell> <b>Interest list</b> </TableCell>
            <TableCell>  </TableCell>
            <TableCell>  </TableCell>
            <TableCell>  </TableCell>
          </TableRow>
            
          <TableRow style={{
              backgroundColor:"#eeefff"
            }}> 
            <TableCell>  Name </TableCell>
            <TableCell align="left">Restaurant name</TableCell>
            <TableCell align="left">Adress</TableCell>
            <TableCell align="left">Phone number</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
          <TableBody>
            {interests.map(interest => (
              
              <TableRow className={classes.TableRowDesign}
                onClick={this.getinterestsDetails.bind(this, interest)}
              key={interest.id_interest}>
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
                      {interest.name_owner} <br/>
                      {interest.email_owner}
                    </div>
                  </div>
            </TableCell>
            <TableCell align="left">{interest.name_restaurant}</TableCell>
            <TableCell align="left">{interest.adress_restaurant} </TableCell>
            <TableCell align="left">{interest.telephone}</TableCell>
                <TableCell align="left">
                    <Link
                        style={{
                            textDecoration:"none"
                        }}
                    >
                    <Button variant="outlined" color="primary">
                        Options 
                    </Button>
                </Link>
            </TableCell>    
          </TableRow>
          ))}
        </TableBody>
        </Table>
    
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{`Informations`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Can't find any interest by this date interval 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }

}
export default withStyles(styles)(Interest);