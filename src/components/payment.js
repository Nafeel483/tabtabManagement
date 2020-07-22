import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CardContent,Divider,Card,CardHeader,ListItemText, Avatar, ListItemAvatar,ListItem, List , Typography, Box,Table,TableBody,TableCell,TableContainer,TableRow,Paper,Tabs,Tab,Grid, Button}from '@material-ui/core/';
import { getAdminPayment,searchPaymentId, filterPayementByDateInterval} from '../utils/restaurantContext';
import { userContext } from '../utils/userContext';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { CSVLink } from "react-csv";
import Modal from '@material-ui/core/Modal';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog } from '@material-ui/core/';

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

class Payment extends React.Component {  
  constructor(props) {
     let d  = new Date()
    super(props);
     this.state = {  
       open: false,
       openDialog: false,
       successOperation: null,
       snackbarOpen: false,
       restaurant: {},
       currentPayment: {},
       successOperation: null,
       snackbarOpen: false,
       valueTabs: 0,
       payments: [],
       start_date: d,
       end_date: d,
       user: {},
       paymentsCsv: []
    }      
  }
  
  setstart_date = (date) => {
    this.setState({ start_date: date })
  }

  setsend_date = (date) => {
    this.setState({ end_date: date })
  }
  	 
	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });	
	};

  handleDateChange = date => {
    this.setstart_date(date);
  }

  handleDateChangeEnd = date => {
    this.setsend_date(date);
  }
  
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount = async () => {
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

    let payments = await getAdminPayment(this.state.user.token);
      
    if (payments.length > 0) {  

      let paymentsCsvArray =[];
      for(let pay in payments) {
        delete payments[pay].password_user;
        paymentsCsvArray.push(payments[pay])
      }
      
      this.setState({
        payments: payments || [],
        paymentsCsv: paymentsCsvArray,
        amountAlreadyPay: payments.map(el => el.amount).reduce((a, b) => a + b),
      })
      
    } else {
      this.setState({
          payments: payments || [],
          amountAlreadyPay: 0,    
      })
    }   
  }
  
  handleValueTabs = (event, valueTabs) => {
    this.setState({ valueTabs: valueTabs });
  }
  
  getPyamentDetails = (payment) => {
    this.setState({
      currentPayment: payment
    })
    this.handleOpen()
  }

  currentPayment =(restaurant) => {
    this.setState({
      currentPayment: restaurant
    })  
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen:!this.state.snackbarOpen
    })
  }

  handleOpen = () => {
    this.setState({
       open:!this.state.open
    })
  };

  onSearch = async () => {
    let paymentRes = await searchPaymentId(this.state.search)
    if (paymentRes.length > 0) {
      this.setState({
        payments: paymentRes,

      })
    } else {
      alert("Can't find any payment for this id")
    }
  }

  handleClose = () => {
    this.setState({
      openDialog: false
    })
  };

  onFilterByDateInterval = async () => {
    let date = {
      start_date: this.state.start_date,
      end_date: this.state.end_date
    }
    
    let paymentRes = await filterPayementByDateInterval(date, this.state.user.token)    
    
    if (paymentRes.length > 0) {
      this.setState({
        payments: paymentRes,
        paymentsCsv: paymentRes
      })
    } else {
      this.setState({
        openDialog: true
      })
    }

  }

  render() {
    let { openDialog, paymentsCsv,start_date, end_date ,open , close,menus,payments ,AlertTitle,successOperation,snackbarOpen, currentPayment} = this.state
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between"
            }}
          >
        
          <h2> Payments</h2>     

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
              name="search"
              placeholder="Search payment by id"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput1,
              }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.handleInputChange}
            />
          
            </div>
            <Button variant="contained" color="primary"
             onClick={this.onSearch}>
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
                data={paymentsCsv}
                filename={`payemmt_${start_date}_${end_date}.csv`}
                style={{
                  color: "#fff",
                  listStyleType:'#fff'
              }}
              > Download payment list
              </CSVLink>
            </Button>      
          </div>

          <Tabs
            value={this.state.valueTabs}
            onChange={this.handleValueTabs}
            indicatorColor="primary"
            textColor="primary" 
          >

          <Tab label="payments" />
          {/* <Tab label="payments report" /> */}
          
          </Tabs>

          {this.state.valueTabs == 0 ?
           <div value={this.state.valueTabs} index={0}>
            <Table component={Paper} aria-label="customized table">
              <TableRow style={{
                backgroundColor: "#fff"
              }}>
                <TableCell> <b> Payment </b> </TableCell>
              </TableRow>
                
              <TableRow style={{
                  backgroundColor: "#eeefff"
                }}>
                <TableCell>  ID </TableCell>
                <TableCell align="left"> Date</TableCell>
                <TableCell align="left"> Notes</TableCell>
                <TableCell align="left"> <b>Amount</b></TableCell>
                <TableCell align="left"> Status</TableCell>
                <TableCell align="left"> </TableCell>
              </TableRow>
              <TableBody>
                {payments.map(payment => (
                  <TableRow className={classes.TableRowDesign}
                    onClick={this.getPyamentDetails.bind(this, payment)} >
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
                          #{payment.id_admin_payment} <br />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="left">

                      {moment(payment.date_admin_payment).format('DD/MM/YYYY HH:MM')}
                    </TableCell>
                    <TableCell align="left">{payment.notes} </TableCell>
                    <TableCell align="left"> <b>$ {payment.amount} </b> </TableCell>
                    <TableCell align="left"> 
                      
                      {payment.status_admin_payment== 1 ? 'Completed': 'Report'}

                    </TableCell>
                
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </div>               
            : null       
          }
        </TableContainer>
        {/* modal */}
        <Modal
          open={open}
          onClose={this.handleOpen}
          style={{
            // boxShadow: '0px 2px 0px 3px #ccc',
          }}
        >
       
        <div className={classes.paperModal}
            style={{
              // boxShadow: '0px 0px 2px #eee',
            }}>
            <div style={{
              backgroundColor: '#0f4c9b',
              padding: 12,
            }}>
          
          <Card className={classes.cardWidth}>
              <CardHeader title={'Payment infomations'} />
                
                  <Divider />
                    <CardContent className={classes.content}>
                        <Table>
                        <TableBody>
                            <TableRow>
                            <TableCell> Administrator </TableCell>
                            <TableCell>
                                <Link
                                component={RouterLink}
                                to="/management/customers/1"
                                >
                                {currentPayment.name_user}
                                </Link>
                                <div> {currentPayment.email_user} </div>
                                <div> {currentPayment.tel_user} </div>

                            </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell> {currentPayment.name_restaurant}  </TableCell>
                                <TableCell>
                                    <Link
                                    component={RouterLink}
                                    to="/management/customers/1"
                                    >
                                    {currentPayment.name_restaurant} 
                                    </Link>
                                    <div> {currentPayment.tel_restaurant} </div>
                                    <div> {currentPayment.adresse_restaurant} </div>

                                </TableCell>
                            </TableRow>
                                  
                            <TableRow>
                                <TableCell>ID   </TableCell>
                                <TableCell># {currentPayment.id_admin_payment}</TableCell>
                            </TableRow>
                         
                            <TableRow >
                                <TableCell>Date</TableCell>
                                <TableCell>
                                    {moment(currentPayment.date_admin_payment).format('DD/MM/YYYY')}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell> <b>Total </b></TableCell>
                            <TableCell>
                            <b>
                              $ {currentPayment.amount} USD 
                            </b>            
                            </TableCell>
                            </TableRow>       
                                <TableRow>
                                    <TableCell> Tap Tap Now fees </TableCell>
                                    <TableCell>
                                        15 %
                                    </TableCell>
                                </TableRow>
      
                                <TableRow selected>
                                    <TableCell>Final total pay was  </TableCell>
                                    <TableCell>
                                      <b>
                                       ${
                                          ((currentPayment.amount) - (currentPayment.amount * (15) / 100)).toFixed(2)
                                        } USD
                                      </b>
                                    </TableCell>
                                </TableRow>      
                            </TableBody>
                        </Table>
                      </CardContent>
                </Card>
            </div>
            <div>
              <Typography variant="h5" component="h2"
                style = {{
                  marginLeft: 32,
                  marginTop: 8,
                  color:'#333'
                }}> 
              </Typography>
            </div>
          </div>
        </Modal>


        <Dialog
          open={openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{`Informations`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Can't find any payment by this date interval 
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

export default withStyles(styles)(Payment);
