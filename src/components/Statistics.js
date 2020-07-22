
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
Card, Typography, Grid, colors,
InputBase ,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { userContext , getUserById} from '../utils/userContext';
import { Redirect,NavLink } from 'react-router-dom';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TableContainer from '@material-ui/core/TableContainer';
import { UserList } from './Cards/UserList';
import StatisticAdmin from './StatisticAdmin';
import StatisticSuperAdmin from './StatisticSuperAdmin';

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

class Statistics extends Component {
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
          isSuperAdmin: false
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
    if(userResult.userTypeID == 2){
      this.setState({
        isSuperAdmin: false
      })
    } else {
        this.setState({
          isSuperAdmin: true
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
      if (this.state.isSuperAdmin == true) {      
        return <StatisticSuperAdmin />
      } else {
        return  <StatisticAdmin />
      }
     
    }
  };
  
  
  export default withStyles(styles) (Statistics)
