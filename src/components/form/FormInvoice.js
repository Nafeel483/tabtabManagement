import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { urlFunction } from '../../utils/urls';
import axios from "axios"
import { getOrdersByRestaurantId, getPaymentByRestaurantId, getRestaurantById ,getCompletedOrdersByRestaurantId} from '../../utils/restaurantContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { userContext, getBankInfoByUserId } from '../../utils/userContext'; 

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField, TableContainer,
  Paper,
  
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Payment from '@material-ui/icons/Payment';
import Backdrop from '@material-ui/core/Backdrop';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Empty from '../../utils/Empty';


const styles = theme => ({
  root: {},
  backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
    },
   
    cardWidth: {
        width: window.innerWidth /2 -50,
        marginRight: 20,
  },
  table: {
    width: window.innerWidth / 2 ,
  }
})

class FormCreateInvoice extends Component {
    constructor(props) {
        super(props)
          this.state = {  
            customer: {},
            restaurant:{},
            order: {},
            menus: [],
            comment: '',
            openBackdrop: false,
            showSucess: false,      
            amountAlreadyPay: 0,
            amountTransaction:0,
            sendToRestaurantBack: false,
            openDialog: false,
            date_of_last_order_restaurant: '',
            bank_info: [],
            bankInfoEmpty: false
        }
    }
  
    handleOpenDialog = () => {
      this.setState({
        openDialog:!this.state.openDialog
      })
    }
  
    handleChange = (event)=> {
      this.setState({
        status_fiche: event.target.value
      })
    }
  
    handleChangeNotes = (event) => {
      this.setState({
        notes: event.target.value
      })
    }

    makePaymentToRestaurant = async () => {
      this.setState({
        openBackdrop: !this.state.openBackdrop
      })       
      let data = {
        "restaurant_fk": this.props.idRestaurant,
        "user_fk": this.state.restaurant.adminRestID,
        "amount": parseFloat(this.state.amountTransaction - this.state.amountAlreadyPay) ,
        "create_by_admin_fk":this.state.user.data.id_user,
        "status_admin_payment": 1,
        'notes': this.state.notes,
        "email_user": this.state.user.data.email_user,
        "name_user": this.state.user.data.name_user,
        "date_of_last_order_restaurant": this.state.date_of_last_order_restaurant
      }
        
      let res = await axios.post(`${urlFunction()}/restaurant/payment/admin/`, data,{
          headers : {
              Authorization  : 'bearer ' + this.state.user.token,
          },
      })
      if (res.data != null) {
          this.setState({
              // openBackdrop: !this.state.openBackdrop,
              showSucess: true
          })
        this.handleOpenDialog()
        this.loadData()
      }
	}
    
  handleCloseSnackbar = () => {
      this.setState({
        showSucess: !this.state.showSucess,
        sendToRestaurantBack : true
      })
      
  }

  loadData = async () => {
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
 
    let invoices = await getPaymentByRestaurantId(this.props.idRestaurant, this.state.user.token);
    if (invoices.length > 0) {  
        this.setState({
            invoices: invoices || [],
            amountAlreadyPay: invoices.map(el => el.amount).reduce((a, b) => a + b),
            order: invoices[0],
            customer: invoices[0],
        })
    } else {
      this.setState({
          invoices: invoices || [],
          amountAlreadyPay: 0,
          order: invoices[0],
          customer: invoices[0],
      })
    }
  
    let transactions = await getCompletedOrdersByRestaurantId(this.props.idRestaurant, this.state.user.token);
    if (transactions.length > 0) {  
      this.setState({
          transactions: transactions || [],
          amountTransaction: transactions.map(el => el.montant_transaction).reduce((a, b) => a + b),
      })
    } else {
      this.setState({
        amountTransaction: 0,
      })
    }
  
    let restaurant = await getRestaurantById(this.props.idRestaurant);
    this.setState({
      restaurant: restaurant[0] || [],
      order: restaurant[0],
      customer: restaurant[0],
    })


    // get date of the last order for the current restaurant 
    let fiche_order = await getOrdersByRestaurantId(this.props.idRestaurant, this.state.user.token);
    let dateOfLastPayment = new Date(fiche_order[fiche_order.length - 1].created_fiche);
    let df = {
      year: dateOfLastPayment.getFullYear(),
      month: dateOfLastPayment.getMonth() + 1,
      day: dateOfLastPayment.getUTCDay() + 1,
      hour: dateOfLastPayment.getHours(),
      minutes: dateOfLastPayment.getMinutes(),
      sec: dateOfLastPayment.getSeconds()
    }

    
    this.setState({
      fiche_order: fiche_order,
      date_of_last_order_restaurant:
        df.year +"-"+ df.month +"-"+df.day +" "+  df.hour +":"+ df.minutes +":"+ df.sec
    })     
    

    let bank_info_data = await getBankInfoByUserId( restaurant[0].id_user, JSON.parse(user).token);
    if (bank_info_data.length > 0) { 
      this.setState({
        bank_info: bank_info_data[0]
      })
    } else {
      this.setState({
        bankInfoEmpty: true
      })
    }
  }

  componentDidMount = async () => {
    this.loadData()
  }
  
  render() {   
    const { classes } = this.props;
    let { bank_info,invoices, order, option, menus, customer, restaurant, openBackdrop, sendToRestaurantBack} = this.state;
    return (
        <TableContainer style={{
                marginTop: 80,
                paddingLeft: 20,
                paddingRight: 20,
                width: window.innerWidth - 300,
                height: window.innerHeight - 140,
          }}>
            
            <Backdrop className={classes.backdrop} open={openBackdrop} >
              <CircularProgress color="inherit" />
          </Backdrop>
          
          <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-between"
            }}>
           <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-between"
            }}>

            <Link to={
              `/restaurant_details/${this.props.idRestaurant}`
            }>
                       
            <ArrowBackIcon className={classes.buttonIcon}/>
                        
                       
            </Link>
            <h2>  Process payment for {restaurant.name_restaurant}  </h2>      
           </div> 
          </div>
            
          <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems:'flex-start'
            }}>
            <Card className={classes.cardWidth}>
              <CardHeader title={'Restaurant info '} />
                
                  <Divider />
                    <CardContent className={classes.content}>
                        <Table>
                        <TableBody>
                            <TableRow>
                            <TableCell> Administrator </TableCell>
                            <TableCell>
                              
                                {restaurant.name_user }

                                <div> {restaurant.email_user } </div>
                                <div> {restaurant.tel_user } </div>

                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell> Restaurant details </TableCell>
                                <TableCell>
                                    <Link
                                    component={RouterLink}
                                    to="/management/customers/1"
                                    >
                                    {restaurant.name_restaurant} 
                                    </Link>
                                    <div> {restaurant.tel_restaurant} </div>
                                    <div> {restaurant.adresse_restaurant} </div>

                                </TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell>ID</TableCell>
                                <TableCell>#{this.props.idRestaurant}</TableCell>
                            </TableRow>
                         
                            <TableRow >
                                <TableCell>Date</TableCell>
                                <TableCell>
                                    {moment(new Date().now).format('DD/MM/YYYY')}
                                </TableCell>
                            </TableRow>
                         
                            <TableRow >
                                <TableCell>Amount Already Pay</TableCell>
                                <TableCell>
                                $ {this.state.amountAlreadyPay.toFixed(2) }
                                </TableCell>
                            </TableRow>
                                  
                            <TableRow >
                                <TableCell>Current Amount</TableCell>
                                <TableCell>
                                $ {this.state.amountTransaction.toFixed(2)}
                            </TableCell>
                        </TableRow>
                      
                                  
                        <TableRow>
                        <TableCell> <b>Total to pay </b></TableCell>
                        <TableCell>
                        {/* {this.state.amountTransaction.toFixed(2)} -
                        {this.state.amountAlreadyPay.toFixed(2)} = */}
                        <b>
                        $ {
                          (this.state.amountTransaction - this.state.amountAlreadyPay).toFixed(2) > 0 ?
                          (this.state.amountTransaction - this.state.amountAlreadyPay).toFixed(2): "0.00" 
                        } USD
                        
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
                                    <TableCell>Final total to pay  </TableCell>
                                    <TableCell>
                                      <b>
                                        {
                                          ((this.state.amountTransaction - this.state.amountAlreadyPay) - (this.state.amountTransaction - this.state.amountAlreadyPay) * (15) / 100).toFixed(2) > 0 ?
                                          ((this.state.amountTransaction - this.state.amountAlreadyPay) - (this.state.amountTransaction - this.state.amountAlreadyPay) * (15) / 100).toFixed(2)  :
                                          0.00
                                        } $
                                      </b>
                                    </TableCell>
                                </TableRow>      
                            </TableBody>
                        </Table>
                      </CardContent>
                  </Card>

                  <Table className={classes.table} component={Paper} aria-label="customized table">

            
                  <ExpansionPanel
                      style={{
                        marginBottom: 20,
                      }}
                      defaultExpanded={true}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                      <Typography className={classes.heading}>
                        <b> Bank infomations </b>
                      </Typography>
                
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>                    
                      <Table>
                        <TableRow selected>
                        <TableCell> Legal name </TableCell>
                        <TableCell> Tax number</TableCell>
                        <TableCell> Bank routing</TableCell>
                        <TableCell> Account number</TableCell>
                        <TableCell> Mailing address</TableCell>
                        <TableCell> Phone line</TableCell>
                        <TableCell> County tax rate </TableCell>
                        </TableRow>
                
                    <TableRow>
                      <TableCell> {bank_info.restaurant_legal_name} </TableCell>
                      <TableCell> {bank_info.tax_number} </TableCell>
                      <TableCell> {bank_info.bank_routing} </TableCell>
                      <TableCell> {bank_info.account_number} </TableCell>
                      <TableCell> {bank_info.mailing_address} </TableCell>
                      <TableCell> {bank_info.phone_line} </TableCell>
                      <TableCell> {bank_info.county_tax_rate} </TableCell>
                  </TableRow>

                  <div>
                    {this.state.bankInfoEmpty == true ?
                    <Empty width={100} height={100} showText={true} text={'Please ask to the user to add his bank information'}/>
                        : null
                    }
                  </div>

                  
                  </Table>
        
                    </ExpansionPanelDetails>     
                   </ExpansionPanel> 
            
            
                    <TableRow style={{
                        backgroundColor: "#fff"
                      }}>
                
                      <TableCell> <b> Notes </b> </TableCell>                        
                      </TableRow>
                      
                      <TableRow style={{
                          backgroundColor: "#fff"
                        }}>
                        <TableCell>    
                            <TextField
                                fullWidth
                                name="notes"
                                value={this.state.notes }
                                onChange={this.handleChangeNotes}

                                id="outlined-multiline-static"
                                label="Notes"
                                multiline
                                rows="4"
                                variant="outlined"
                            />
                        </TableCell>                      
                  </TableRow>
                  <TableRow>
                    
                      
                    { this.state.amountTransaction.toFixed(2) -
                      this.state.amountAlreadyPay.toFixed(2) > 10 ?
                          
                        <CardActions className={classes.actions}>
                          <Button
                            variant="contained"
                            onClick={this.makePaymentToRestaurant} color='primary' >
                              <Payment className={classes.buttonIcon}/>
                                Create payment
                            </Button>
                            
                          </CardActions>
                  : <>
                    <h4 style={{ margin: 10, color: 'red' }}>
                        Can't process payment for  {this.state.restaurant.name_restaurant} <br/>FYI : Account's must be grader than 20 US $  to process payment for 
                      </h4>
                    <CardActions className={classes.actions}>
                      
                      <Link to={
                        `/restaurant_details/${this.props.idRestaurant}`
                      }>
                        <Button
                        variant="contained"
                        color='primary' >
                          <ArrowBackIcon className={classes.buttonIcon}/>
                            Back 
                        </Button>
                      </Link>

                      </CardActions>
                      </>
                    }
                  </TableRow>

             
          </Table>
     
         
                    
        </div>
        
        <Dialog
          disableBackdropClick={true}
          open={this.state.openDialog}
          onClose={this.handleOpenDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          
            <DialogTitle id="alert-dialog-title">
                Informations
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Payment have been successfully made for {restaurant.name_restaurant} 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                
                <Link to={`/restaurant_details/${this.props.idRestaurant}`}>
                  <Button onClick={this.agreeToSetRestaurant} color="primary" autoFocus>
                    Thank you
                  </Button>
                </Link>
                  
            </DialogActions>
          </Dialog>
        </TableContainer>
        );
    }
};
export default withStyles(styles)(FormCreateInvoice)
