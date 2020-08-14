
import React, { Component } from 'react';
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  userContext, getUserOwnerRestaurant,
  getUserCount, getUserAll
} from '../utils/userContext';
import './styles.css'
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
  }
});
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '75ch',
    },
  },
}));

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      food: '',
      experience: '',
      user: '',
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
  submitSurvey = () => {
    let data = {
      question: ["Was your food ready on time/ Manje a te prepare le'w rive?", "How would you rate your experience/ Koman akey la te ye?",
        "How was the food/ Koman manje a te ye?", "Please provide any feedback, add your contact info to be contacted/ Pa le nou de eksperyans ou, kite telefon ou si ou vle nou kontakte'w. Mesi!"
      ]
    }
    axios.post(`http://3.17.175.93:3001/api/v2/admin/restaurant/order/addquestions`, data, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    }).then(res => {
      console.log("Yes Deleted User is: ", res)
      alert("Survey SuccessFully Submitted")
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
  handleChange = (event) => {
    this.setState({ food: event.target.value });
  };
  _handleChange = (event) => {
    this.setState({ experience: event.target.value });
  };
  render() {
    return (
      <>
        <TableContainer style={{
          marginTop: 80,
          paddingLeft: 20,
          paddingRight: 20,
          width: window.innerWidth - 300,
        }}>
          <div className='MainContainer'>
            <p
              style={{
                margin: 10, width: '70%',
                textAlign: "left", fontSize: '30px', fontWeight: '500'
              }}>Customer Feedback/ Pale nou de eksperyans ou</p>
            <div style={{ width: '85%', margin: 10, }}>
              <p
                style={{
                  textAlign: "left", fontSize: '13px',
                }}>We would love to hear your feedback on how we can improve your experience!/ Nou ta renmen tande de eksperyans ou pou nou ka amelyore sevis nou</p>
            </div>
          </div>
          <div className='MainContainer'>
            <div style={{ width: '85%', margin: 10, }}>
              <p
                style={{
                  textAlign: "left", fontSize: '16px', fontWeight: '500'
                }}>Was your food ready on time/ Manje a te prepare le'w rive?</p>
            </div>
            <div style={{ margin: 10, }}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={this.state.food} onChange={this.handleChange}>
                  <FormControlLabel value="Yes/Wi" control={<Radio color="primary" />} label="Yes/Wi" />
                  <FormControlLabel value="No/non" control={<Radio color="primary" />} label="No/non" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          {/* 2nd Question */}
          <div className='MainContainer'>
            <div style={{ width: '85%', margin: 10, }}>
              <p
                style={{
                  textAlign: "left", fontSize: '16px', fontWeight: '500'
                }}>How would you rate your experience/ Koman akey la te ye?
                </p>
            </div>
            <div style={{ margin: 10, }}>
              <div style={{ display: 'flex', marginLeft: '50px' }}>
                <p
                  style={{
                    textAlign: "left", fontSize: '13px', fontWeight: '500',
                    marginRight: 20

                  }}>Not good/ Pa bon
                </p>
                <Radio
                  checked={this.state.experience === 'a'}
                  onChange={this._handleChange}
                  value="a"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                />
                <Radio
                  checked={this.state.experience === 'b'}
                  onChange={this._handleChange}
                  value="b"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'B' }}
                />
                <Radio
                  checked={this.state.experience === 'c'}
                  onChange={this._handleChange}
                  value="c"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'C' }}
                />
                <Radio
                  checked={this.state.experience === 'd'}
                  onChange={this._handleChange}
                  value="d"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'D' }}
                />
                <Radio
                  checked={this.state.experience === 'e'}
                  onChange={this._handleChange}
                  value="e"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'E' }}
                />
                <p
                  style={{
                    textAlign: "left", fontSize: '13px', fontWeight: '500', marginLeft: 20
                  }}>Very Good/ Li te tre bon
                </p>
              </div>
            </div>
          </div>
          {/* 3rd Question */}
          <div className='MainContainer'>
            <div style={{ width: '85%', margin: 10, }}>
              <p
                style={{
                  textAlign: "left", fontSize: '16px', fontWeight: '500',
                }}>How was the food/ Koman manje a te ye?
                </p>
            </div>
            <div style={{ margin: 10, }}>
              <div style={{ display: 'flex', marginLeft: '50px' }}>
                <p
                  style={{
                    textAlign: "left", fontSize: '13px', fontWeight: '500',
                    marginRight: 20

                  }}>Not good/ Pa bon
                </p>
                <Radio
                  checked={this.state.experience === 'a'}
                  onChange={this._handleChange}
                  value="a"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                />
                <Radio
                  checked={this.state.experience === 'b'}
                  onChange={this._handleChange}
                  value="b"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'B' }}
                />
                <Radio
                  checked={this.state.experience === 'c'}
                  onChange={this._handleChange}
                  value="c"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'C' }}
                />
                <Radio
                  checked={this.state.experience === 'd'}
                  onChange={this._handleChange}
                  value="d"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'D' }}
                />
                <Radio
                  checked={this.state.experience === 'e'}
                  onChange={this._handleChange}
                  value="e"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'E' }}
                />
                <p
                  style={{
                    textAlign: "left", fontSize: '13px', fontWeight: '500', marginLeft: 20
                  }}>Very Good/ Li te tre bon
                </p>
              </div>
            </div>
          </div>

          {/* last Question */}
          <div className='MainContainer'>
            <div style={{ width: '85%', margin: 10, }}>
              <p
                style={{
                  textAlign: "left", fontSize: '16px', fontWeight: '500'
                }}>Please provide any feedback, add your contact info to be contacted/ Pa le nou de eksperyans ou, kite telefon ou si ou vle nou kontakte'w. Mesi!
                </p>
            </div>
            <div style={{ margin: 10, }}>
              <form className={useStyles.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="" placeholder="Your Answer"
                  style={{ width: '600px' }}
                />
              </form>
            </div>
          </div>
          <div className='MainContainer1'>
            <Button variant="contained" color="primary" onClick={this.submitSurvey}>
              Submit
          </Button>
          </div>
        </TableContainer>
      </>
    )
  }
};

export default withStyles(styles)(Review)