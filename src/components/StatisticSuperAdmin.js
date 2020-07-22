
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography, Grid, colors,InputBase ,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { userContext , getUserById} from '../utils/userContext';
import { getMenuStat, getOrdersStat, getPaymentStat} from '../utils/StatContext';
import { Redirect, NavLink } from 'react-router-dom';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TableContainer from '@material-ui/core/TableContainer';

const styles = theme => ({
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
  }
});

class StatisticSuperAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
          statistics: {
            payout: 10,
            projects: 123,
            visitors: 120,
            watching: 12,
          },
        selectedDate: '2014-08-18T21:11:54',
        user: {},
        userResult: {},
        menuStat: {},
        orderStatReview: [],
        orderStatReady: [],
        orderStatCompleted: [],
        orderStatCancel: [],
        paymentStat: [],
        paymentStatAmount: 0,
        OrderCompletedStatAmount: 0,
          
      }
  }
  
  setSelectedDate = (date) => {
    this.setState({ selectedDate: date })
  }

  handleDateChange = date => {
    this.setSelectedDate(date);
  };

  componentDidMount = async () => {
    let user = await userContext();
    if (user !== null) {
      this.setState({
        user: JSON.parse(user),
        isLogin: true, 
      })
    } else {
      this.setState({
        isLogin: false
      })
    }
  
    let userResult = await getUserById(JSON.parse(user).data.id_user, JSON.parse(user).token);
    if(userResult.is_first_time_login == 0){
        this.setState({
        isFirstTime: true
        })
    }

    let objUser = {
      id_user: userResult.id_user || 0, 
      userType:userResult.userTypeID || 0
    }

    let menuStat = await getMenuStat(objUser, this.state.user.token);
    this.setState({
      menuStat: menuStat
    })

    // -- Orders stat   
    let orderStat = await getOrdersStat(objUser, this.state.user.token);

    // console.log(" Data Order Stat ", orderStat)
    let orderStatReview = orderStat.filter(el => el.status_fiche == 2);
    let orderStatReady = orderStat.filter(el => el.status_fiche == 3);
    let orderStatCompleted = orderStat.filter(el => el.status_fiche == 4);
    let orderStatCancel = orderStat.filter(el => el.status_fiche == 5); 
    
    this.setState({
      orderStatReview:orderStatReview, 
      orderStatReady:orderStatReady, 
      orderStatCompleted:orderStatCompleted, 
      orderStatCancel: orderStatCancel, 
      
    })

    if (orderStatCompleted.length > 0) {
      this.setState({
        OrderCompletedStatAmount: orderStatCompleted.map(row => row.montant_transaction).reduce((el, acc) => el + acc)
      })
    }
      

    // ==> getPaymentStat
    let paymentStat = await getPaymentStat(objUser, this.state.user.token);
    if (paymentStat.length > 0) {
      this.setState({
        paymentStat: paymentStat,
        paymentStatAmount:paymentStat.map(row => row.amount).reduce((el,acc) => el + acc)
      })
    }

  }

  render() {
    if (this.state.isLogin == false) {
      return <Redirect to='/' />
    }

    if (this.state.isFirstTime == true) {
      return <Redirect to={`/customer_details/${this.state.user.data.id_user}`} />
    }
    
    let { classes } = this.props
    let { statistics, selectedDate } = this.state
   
    return (
        <TableContainer style={{
              marginTop: 80,
              paddingLeft: 20,
              paddingRight: 20,
              width:  window.innerWidth  -  ( window.innerWidth / 5),
            }}>
          
            <div
                style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-between"
            }}>          
            <h4> Overview for {this.state.user.data?this.state.user.data.email_user: null} </h4>                  
            </div>
            <Card>
              <Grid
                  alignItems="center"
                  container
                  justify="space-between">
                  <Grid
                    className={classes.item}
                    item
                    md={3}
                    sm={6}
                    xs={12}>
                    <Typography variant="h4">{this.state.menuStat.length}</Typography>
                    <Typography
                      className={classes.overline}
                      variant="overline">
                      Total dish
                    </Typography>
                </Grid>
            
                <Grid
                    className={classes.item}
                    item
                    md={3}  
                    sm={6}
                    xs={12}>
                    <Typography variant="h4">{this.state.orderStatReview.length}</Typography>
                        <Typography
                        className={classes.overline}
                        variant="overline">
                      Order need attention
                    </Typography>
                  </Grid>
  
                  <Grid
                      className={classes.item}
                      item
                      md={3}  
                      sm={6}
                      xs={12}
                        >
                        <Typography variant="h4">{this.state.orderStatCancel.length}</Typography>
                          <Typography
                          className={classes.overline}
                          variant="overline"
                          >
                            Order Cancellation 
                        </Typography>
                    </Grid>
                    
                    <Grid
                      className={classes.item}
                      item
                      md={3}  
                      sm={6}
                      xs={12}
                        >
                        <Typography variant="h4">{this.state.orderStatReady.length}</Typography>
                          <Typography
                          className={classes.overline}
                          variant="overline"
                          >
                            Order ready to pick up 
                        </Typography>
                    </Grid>
              
                    <Grid
                        className={classes.item}
                        item
                        md={3}  
                        sm={6}
                        xs={12}
                        >
                          <Typography variant="h4">{this.state.orderStatCompleted.length}</Typography>
                          <Typography
                              className={classes.overline}
                              variant="overline"
                            >
                            Order completed
                          </Typography>
                      </Grid>
          </Grid>
          
          <Grid
            marginTop={80}
            alignItems="center"
            backgroundColor={'#ccc'}
            container
            justify="space-between">
            
            <Grid
                  className={classes.item}
                    item
                    md={3}  
                    sm={6}
                    xs={12}
                  >
                  <div>
                    <Typography variant="h4"> $ {this.state.OrderCompletedStatAmount.toFixed(2)} USD </Typography>
                  </div>
                  <Typography
                      className={classes.overline}
                      variant="overline">
                    Total money for completed orders 
                  </Typography>
              </Grid>
    
              
            
              <Grid
                    className={classes.item}
                    item
                    md={3}  
                    sm={6}
                    xs={12}
                  >
                  <div>
                <Typography variant="h4"> $
                 {(this.state.paymentStatAmount - (
                  this.state.paymentStatAmount * (15/100)
                )).toFixed(2)
                } USD </Typography>
                  </div>
                  <Typography
                      className={classes.overline}
                      variant="overline"
                    >
                   Total money paid with 15% feed 
                  </Typography>
            </Grid>
            
            {/* <Grid
                    className={classes.item}
                    item
                    md={3}  
                    sm={6}
                    xs={12}
                  >
                  <div>
                <Typography variant="h4"> $ {
                  (this.state.OrderCompletedStatAmount -
                    (this.state.paymentStatAmount - (
                      this.state.paymentStatAmount * (15/100)
                    ))).toFixed(2)
                } USD </Typography>
                  </div>
                  <Typography
                      className={classes.overline}
                      variant="overline"
                  >
                   Total profit    
                  </Typography>
              </Grid> */}
    
              <Grid
                    className={classes.item}
                    item
                    md={3}  
                    sm={6}
                    xs={12}
                  >
                  <div>
                  <Typography variant="h4">
                  $ {
                  Math.abs( (parseFloat(this.state.OrderCompletedStatAmount - this.state.paymentStatAmount).toFixed(2)))
                  } USD </Typography>
                  </div>
                  <Typography
                      className={classes.overline}
                      variant="overline"
                    >
                   Next Payout 
                  </Typography>
              </Grid>
          </Grid>
        </Card>
      </TableContainer>
        )
      }
  };
  
  export default withStyles(styles) (StatisticSuperAdmin)
