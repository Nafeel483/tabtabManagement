
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
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  userContext, getUserOwnerRestaurant,
  getUserCount, getUserAll
} from '../utils/userContext';
import { urlFunction } from '../utils/urls';

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
      experience1: "",
      showProgress: false,
      serveyList: [],
      final: ''
    }
  }
  componentDidMount = async () => {

    axios.get(`${urlFunction()}/restaurant/order/getquestions`, {

    }).then(res => {
      console.log("The Survey: ", res.data)
      this.setState({
        serveyList: res.data,
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
  submitSurvey = () => {
    let data = {
      id_question_fk: [this.state.serveyList?.[0]?.id_question, this.state.serveyList?.[1]?.id_question, this.state.serveyList?.[2]?.id_question, this.state.serveyList?.[3]?.id_question
      ],
      answer: [this.state.food, this.state.experience, this.state.experience1, this.state.final]
    }
    console.log("Yes Deleted User is: ", data)

    axios.post(`http://52.15.48.176:3001/api/v2/admin/restaurant/order/addanswer`, data, {
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
  _handleChange1 = (event) => {
    this.setState({ experience1: event.target.value });
  };
  handlechangefinal = (event) => {
    this.setState({ final: event.target.value });
  }
  render() {
    console.log("The Survey", this.state)
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
          <h1 style={{ color: "#13479e", textAlign: 'center' }}>Review Page</h1>
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
                }}>{this.state.serveyList?.[0]?.question}</p>
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
                }}>{this.state.serveyList?.[1]?.question}
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
                  checked={this.state.experience === '1'}
                  onChange={this._handleChange}
                  value="1"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '1' }}
                />
                <Radio
                  checked={this.state.experience === '2'}
                  onChange={this._handleChange}
                  value="2"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '2' }}
                />
                <Radio
                  checked={this.state.experience === '3'}
                  onChange={this._handleChange}
                  value="3"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '3' }}
                />
                <Radio
                  checked={this.state.experience === '4'}
                  onChange={this._handleChange}
                  value="4"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '4' }}
                />
                <Radio
                  checked={this.state.experience === '5'}
                  onChange={this._handleChange}
                  value="5"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '5' }}
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
                }}>{this.state.serveyList?.[2]?.question}
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
                  checked={this.state.experience1 === '1'}
                  onChange={this._handleChange1}
                  value="1"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '1' }}
                />
                <Radio
                  checked={this.state.experience1 === '2'}
                  onChange={this._handleChange1}
                  value="2"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '2' }}
                />
                <Radio
                  checked={this.state.experience1 === '3'}
                  onChange={this._handleChange1}
                  value="3"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '3' }}
                />
                <Radio
                  checked={this.state.experience1 === '4'}
                  onChange={this._handleChange1}
                  value="4"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '4' }}
                />
                <Radio
                  checked={this.state.experience1 === '5'}
                  onChange={this._handleChange1}
                  value="5"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': '5' }}
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
                }}>{this.state.serveyList?.[3]?.question}
              </p>
            </div>
            <div style={{ margin: 10, }}>
              <form className={useStyles.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="" placeholder="Your Answer"
                  style={{ width: '600px' }}
                  onChange={this.handlechangefinal}
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