
import React, { Component } from 'react';
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import { urlFunction } from '../utils/urls';
import LinearProgress from '@material-ui/core/LinearProgress';
import { menuPath } from '../utils/img_link';
import { Bar } from 'react-chartjs-2';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Searchable from 'react-searchable-dropdown';
import {
  userContext, getUserOwnerRestaurant,
  getUserCount, getUserAll
} from '../utils/userContext';
import {
  listRestaurantContext,
  getRestaurantByIdUsers,
  listRestaurantCount
} from '../utils/restaurantContext';
const state = {
  labels: ['1', '2', '3',
    '4', '5',],
  datasets: [
    {
      label: 'Driving Distance',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56,]
    }
  ]
}


const Average_Time_Order = {
  labels: ['1', '2', '3',
    '4', '5',],
  datasets: [
    {
      label: 'Average Time Order',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 30,]
    }
  ]
}
const Average_Expense = {
  labels: ['1', '2', '3',
    '4', '5',],
  datasets: [
    {
      label: 'Average Expense/All Resturants',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56,]
    }
  ]
}
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
  paper12: {
    padding: theme.spacing(2),
    textAlign: 'left',
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
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //     width: '75ch',
  //   },
  // },
  formControl: {
    margin: theme.spacing(5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));
class Graphs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphUpdate: 0,
      age: '',
      showProgress: false,
      reviewData: [],
      restaurants: [],
      resturant_id: '',
      salesData: [],
      logsData: [],
      salesByZip: [],
      sateCityData: [],
      getAllDishes: [],
      setOpen: false,
      setDishValue: '',
      setOpen1: false,
      setDishValue1: '',
      reviewDatalength: 3,
      reviewAnswers: [],
      reviewQuestion: []
    }
  }
  updateGraph = (value) => {
    this.setState({ graphUpdate: value })
    if (value == 2) {
      this.getAnnualSale()
    }
    else if (value == 6) {
      this.getReviews()
    }
    else if (value == 9) {
      this.getAnnualSale()
    }
    else if (value == 10) {
      this.getAnnualSale()
    }
    else if (value == 11) {
      this.getAnnualSale()
    }
    else if (value == 13) {
      this.getDishes()
    }
  }
  getDishes = () => {
    this.setState({ showProgress: true })
    axios
      .get(`${urlFunction()}/restaurant/reports/getdishes`)
      .then((res) => {
        console.log("DOne", res)
        // window.location.reload(true);
        this.setState({ showProgress: false })
        this.setState({ getAllDishes: res.data })
      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  getAnnualSale = async () => {
    this.setState({ showProgress: true })
    axios
      .get(`${urlFunction()}/restaurant/get/all`)
      .then((res) => {
        console.log("Resturants", res)
        if (res.data.length > 0) {
          this.setState({
            restaurants: res.data.sort((a, b) => (a.name_restaurant > b.name_restaurant) ? 1 : -1),
            showProgress: false
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
  getReviews = () => {
    this.setState({ showProgress: true })
    axios
      // .post(`${urlFunction()}/restaurant/reports/reviews`)
      .get(`${urlFunction()}/restaurant/order/getanswer2`)
      .then((res) => {
        console.log("DOne Reviews", res)
        // window.location.reload(true);
        this.setState({ showProgress: false })
        this.setState({ reviewData: res.data })

      })
      .catch((error) => {
        this.setState({
          showProgress: false,
        })
        console.log(error)
      })
  }
  handleChange = (event) => {
    this.setState({ age: event.target.value })
  }
  handleChangeResturant = (event) => {
    console.log("The Event is", event)
    this.setState({ resturant_id: event.label })
    if (event.value) {
      let data = {
        rest_id_fk: event.value
      }
      axios
        .post(`${urlFunction()}/restaurant/reports/sales`, data, {
        })
        .then((res) => {
          console.log("DOne", res)
          // window.location.reload(true);
          this.setState({ showProgress: false })
          this.setState({ salesData: res.data })
        })
        .catch((error) => {
          this.setState({
            showProgress: false,
          })
          console.log(error)
        })
    }
  }
  handleChangeCall = (event) => {
    this.setState({ resturant_id: event.label })
    if (event.value) {
      let data = {
        rest_id_fk: event.value
      }
      axios
        .post(`${urlFunction()}/restaurant/reports/logs`, data, {
        })
        .then((res) => {
          console.log("DOne", res)
          // window.location.reload(true);
          this.setState({ showProgress: false })
          this.setState({ logsData: res.data })
        })
        .catch((error) => {
          this.setState({
            showProgress: false,
          })
          console.log(error)
        })
    }
  }
  handleChangeZipCode = (event) => {
    this.setState({ resturant_id: event.label })
    if (event.label) {
      let data = {
        zipcode: event.label
      }
      axios
        .post(`${urlFunction()}/restaurant/reports/salesbyzip`, data, {
        })
        .then((res) => {
          console.log("salesByZip", res)
          // window.location.reload(true);
          this.setState({ showProgress: false })
          this.setState({ salesByZip: res.data })
        })
        .catch((error) => {
          this.setState({
            showProgress: false,
          })
          console.log(error)
        })
    }
  }
  handleChangeSalesbyState = (event) => {
    this.setState({ resturant_id: event.label })
    if (event.label) {
      let data = {
        state: event.label
        // state: "Fl"
      }
      axios
        .post(`${urlFunction()}/restaurant/reports/salesbystate`, data, {
        })
        .then((res) => {
          console.log("salesByZip", res)
          // window.location.reload(true);
          this.setState({ showProgress: false })
          this.setState({ sateCityData: res.data })
        })
        .catch((error) => {
          this.setState({
            showProgress: false,
          })
          console.log(error)
        })
    }
  }
  getDishesValue = (value, index) => {
    this.setState({ setDishValue: value })
    this.setState({ setOpen: !this.state.setOpen })
    console.log('The Value is', value)
  }
  getDishesValue1 = (value) => {
    let answers = value.answers.split(",", 4)

    let questions = value.questions.split(",", 4)
    this.setState({ reviewAnswers: answers })
    this.setState({ reviewQuestion: questions })

    this.setState({ setOpen1: !this.state.setOpen1 })
    console.log('The Answer is', answers)

  }
  handleClose = () => {
    this.setState({ setOpen: !this.state.setOpen })
  }
  handleClose1 = () => {
    this.setState({ setOpen1: !this.state.setOpen1 })
  }
  renderValue = (value) => {
    return value;
  }
  ReviewsData = (num) => {
    console.log(num)
    const { classes } = this.props;
    for (let i = 1; i <= num; i++) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper12}> <h4>{`Review${i}`}</h4></Paper>
          </Grid>
        </Grid>
      )
    }
  }
  render() {
    console.log("Review Data Length", this.state.reviewAnswers)
    const { classes } = this.props;
    const valueData = this.state.salesData?.map(value => value.price_order)
    const labelData = this.state.salesData?.map(value => value.id_order)
    const Annual_Sales = {
      labels: labelData,
      datasets: [
        {
          label: 'Annual Sales ',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: valueData,
        }
      ]
    }
    let sum = 0
    if (valueData.length > 0) {
      for (let i = 0; i < valueData.length; i++) {
        sum = sum + valueData[i]
      }
    }
    const zipData = this.state.salesByZip?.map(value => value.price_order)
    const zipLabel = this.state.salesByZip?.map(value => value.id_order)
    const Zip_Sales = {
      labels: zipLabel,
      datasets: [
        {
          label: 'Zip Code ',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: zipData
        }
      ]
    }

    const cityStateData = this.state.sateCityData?.map(value => value.price_order)
    const cityStateLabel = this.state.sateCityData?.map(value => value.id_order)
    const City_State = {
      labels: cityStateLabel,
      datasets: [
        {
          label: 'City State ',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: cityStateData
        }
      ]
    }
    const zipCode = this.state.restaurants.filter((value) => {
      return value.zipcode != undefined && value.zipcode != null && value.zipcode != 'null'
    })


    const stateArea = this.state.restaurants.filter((value) => {
      return value.state != undefined && value.state != null && value.state != 'null'
    })
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
          <div>
            <ul>
              {/* <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(1)}>Distance Driving</li> */}
              <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(2)}>Hourly/Daily/ Weekly/Monthly/Quarterly/ Annual Sales</li>
              {/* <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(3)}>Average Time of order completion</li> */}
              {/* <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(4)}>Average expenses per order</li> */}
              {/* <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(5)}>Order Cancellation</li> */}
              <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(6)}>Reviews</li>
              <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(9)}>Area Zip Code</li>
              <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(10)}>Total Sale by City State</li>
              <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(11)}>Call Logs</li>
              <li style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', }} onClick={() => this.updateGraph(13)}>Report on individual dish- To determine which is best seller on what day of the week</li>

            </ul>
          </div>
          {
            this.state.graphUpdate == 1 ?
              // Distance Driving
              <>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-customized-select-label">Resturants</InputLabel>
                  <Select className={classes.formControl}

                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.age}
                    onChange={this.handleChange}
                    style={{ width: "300px" }}
                  >
                    <MenuItem value="All Resturants">
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <Bar
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: 'Average Distance Driving',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
              </> :
              this.state.graphUpdate == 2 ?
                // Hourly/Daily/ Weekly/Monthly/Quarterly/ Annual Sales
                <>
                  <div style={{ display: 'flex', marginTop: '40px' }}>

                    <FormControl className={classes.formControl}>
                      {/* <InputLabel id="demo-customized-select-label">Resturants</InputLabel> */}
                      <Searchable
                        value="" //if value is not item of options array, it would be ignored on mount
                        placeholder="Search" // by default "Search"
                        notFoundText="No result found" // by default "No result found"
                        options={
                          this.state.restaurants.map(el => (
                            {
                              value: el.id_restaurant,
                              label: el.name_restaurant
                            }
                          ))}
                        onSelect={option => {
                          this.handleChangeResturant(option); // as example - {value: '', label: 'All'}
                        }}
                        listMaxHeight={600} //by default 140
                      />
                      {/* <Select className={classes.formControl}

                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={this.state.resturant_id}
                        renderValue={() => this.renderValue(this.state.resturant_id)}
                        onChange={this.handleChangeResturant}
                        style={{ width: "300px" }}
                      >
                        {this.state.restaurants.map(el => (
                          <MenuItem key={el.id_restaurant} value={el}>
                            {el.name_restaurant}
                          </MenuItem>
                        ))}
                      </Select> */}
                    </FormControl>


                    <div style={{ marginLeft: '20px' }}>
                      <div style={{ display: 'flex' }} >
                        <h4>TOTAL SALES =</h4>
                        <h4>{this.state.salesData.length}</h4>
                      </div>
                      <div style={{ display: 'flex' }} >
                        <h4>TOTAL REVENUE  =</h4>
                        <h4>{`$${sum != undefined ? sum : '0'}`}</h4>
                      </div>
                    </div>
                  </div>
                  {
                    this.state.resturant_id ?
                      this.state.salesData.length > 0 ?
                        <Bar
                          data={Annual_Sales}
                          options={{
                            title: {
                              display: true,
                              text: 'Annual Sales',
                              fontSize: 20
                            },
                            legend: {
                              display: true,
                              position: 'right'
                            },
                            scales: {
                              yAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'Order Price'
                                }
                              }],
                              xAxes: [{
                                scaleLabel: {
                                  display: true,
                                  labelString: 'Order Number'
                                }
                              }]
                            }
                          }}
                        />
                        :
                        <h3>NO Order Against this Resturant</h3>
                      :
                      <>
                      </>

                  }
                </> :
                this.state.graphUpdate == 3 ?
                  // /3- Average Time of order completion (micro & macro)
                  <>
                    <div style={{ display: 'flex' }}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-customized-select-label">All Resturants</InputLabel>
                        <Select className={classes.formControl}

                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          value={this.state.age}
                          onChange={this.handleChange}
                          style={{ width: "300px" }}
                        >
                          <MenuItem value="All Resturants">
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <div style={{ marginLeft: '20px' }}>
                        <div style={{ display: 'flex' }} >
                          <h3>Average Time/order =</h3>
                          <h4>10 min</h4>
                        </div>

                      </div>
                    </div>
                    <Bar
                      data={Average_Time_Order}
                      options={{
                        title: {
                          display: true,
                          text: 'Average Time Order',
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: 'right'
                        }
                      }}
                    />
                  </> :
                  this.state.graphUpdate == 4 ?
                    // 4- Average expenses per order (micro & macro) 
                    <>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-customized-select-label">All Resturants</InputLabel>
                        <Select className={classes.formControl}

                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          value={this.state.age}
                          onChange={this.handleChange}
                          style={{ width: "300px" }}
                        >
                          <MenuItem value="All Resturants">
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <div style={{ display: 'flex' }}>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-customized-select-label">Hour</InputLabel>
                          <Select className={classes.formControl}

                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={this.state.age}
                            onChange={this.handleChange}
                            style={{ width: "300px" }}
                          >
                            <MenuItem value="All Resturants">
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        <div style={{ marginLeft: "20px" }}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-customized-select-label">12:00</InputLabel>
                            <Select className={classes.formControl}

                              labelId="demo-customized-select-label"
                              id="demo-customized-select"
                              value={this.state.age}
                              onChange={this.handleChange}
                              style={{ width: "300px" }}
                            >
                              <MenuItem value="All Resturants">
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                          <div style={{ display: 'flex' }} >
                            <h3>Average Expense/All Resturants =</h3>
                            <h4>$22</h4>
                          </div>

                        </div>
                      </div>
                      <Bar
                        data={Average_Expense}
                        options={{
                          title: {
                            display: true,
                            text: 'Average Expense/All Resturants',
                            fontSize: 20
                          },
                          legend: {
                            display: true,
                            position: 'right'
                          }
                        }}
                      />
                    </> :
                    this.state.graphUpdate == 5 ?
                      <>
                      </> :
                      this.state.graphUpdate == 6 ?
                        <>
                          {this.state.reviewData?.map((resto, index) => {
                            return (
                              <div style={{ cursor: 'pointer', marginTop: '40px' }} onClick={() => this.getDishesValue1(resto)}>
                                {
                                  <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                      <Paper style={{ height: 50 }}>
                                        <h4 style={{ padding: '15px' }}
                                        >{`Review${index}`}</h4></Paper>
                                    </Grid>
                                  </Grid>
                                }
                              </div>
                            )
                          })
                          }

                          <Dialog
                            open={this.state.setOpen1}

                            onClose={this.handleClose1}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <div style={{ margin: '10px', width: '100%', height: '500px' }}>
                              <img src={require('../assets/images/logo.png')} style={{ width: "100%", height: '100px' }} />
                              <div style={{ display: 'flex', marginTop: 20 }}>
                                <h4>Question: </h4>
                                <h3 style={{ marginLeft: '20px' }}>{"Was your food ready on time/ Manje a te prepare le'w rive?"}</h3>
                              </div>
                              {/* {this.state.reviewAnswers?.map((value) => { */}
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h3 style={{ color: 'grey' }}>Review : </h3>
                                <h4 style={{ marginLeft: '20px', color: 'grey' }}>{this.state.reviewAnswers[0]}</h4>
                              </div>
                              {/* One */}
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h4>Question: </h4>
                                <h3 style={{ marginLeft: '20px' }}>{"How would you rate your experience/ Koman akey la te ye?"}</h3>
                              </div>
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h3 style={{ color: 'grey' }}>Review : </h3>
                                <h4 style={{ marginLeft: '20px', color: 'grey' }}>{this.state.reviewAnswers[1]}</h4>
                              </div>
                              {/* Three */}
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h4>Question: </h4>
                                <h3 style={{ marginLeft: '20px' }}>{"How was the food/ Koman manje a te ye?"}</h3>
                              </div>
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h3 style={{ color: 'grey' }}>Review : </h3>
                                <h4 style={{ marginLeft: '20px', color: 'grey' }}>{this.state.reviewAnswers[2]}</h4>
                              </div>
                              {/* Four */}
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h4>Question: </h4>
                                <h3 style={{ marginLeft: '20px' }}>{"Please provide any feedback, add your contact info to be contacted/ Pa le nou de eksperyans ou, kite telefon ou si ou vle nou kontakte'w. Mesi!"}</h3>
                              </div>
                              <div style={{ display: 'flex', marginTop: -20 }}>
                                <h3 style={{ color: 'grey' }}>Review : </h3>
                                <h4 style={{ marginLeft: '20px', color: 'grey' }}>{this.state.reviewAnswers[3]}</h4>
                              </div>
                            </div>
                            <DialogActions>

                              <Button onClick={this.handleClose1} color="primary">
                                ok
                                      </Button>
                            </DialogActions>
                          </Dialog>

                        </>
                        : this.state.graphUpdate == 11 ?

                          <>
                            <div style={{ marginTop: '40px' }} >

                              <FormControl className={classes.formControl}>
                                {/* <InputLabel id="demo-customized-select-label">Resturants</InputLabel>
                                <Select className={classes.formControl}

                                  labelId="demo-customized-select-label"
                                  id="demo-customized-select"
                                  value={this.state.resturant_id}
                                  renderValue={() => this.renderValue(this.state.resturant_id)}
                                  onChange={this.handleChangeCall}
                                  style={{ width: "300px" }}
                                >
                                  {this.state.restaurants.map(el => (
                                    <MenuItem key={el.id_restaurant} value={el}>
                                      {el.name_restaurant}
                                    </MenuItem>
                                  ))}
                                </Select> */}
                                <Searchable
                                  value="" //if value is not item of options array, it would be ignored on mount
                                  placeholder="Search" // by default "Search"
                                  notFoundText="No result found" // by default "No result found"
                                  options={
                                    this.state.restaurants.map(el => (
                                      {
                                        value: el.id_restaurant,
                                        label: el.name_restaurant
                                      }
                                    ))}
                                  onSelect={option => {
                                    this.handleChangeCall(option); // as example - {value: '', label: 'All'}
                                  }}
                                  listMaxHeight={600} //by default 140
                                />
                              </FormControl>
                              {
                                this.state.resturant_id != '' ?
                                  this.state.logsData.length > 0 ?
                                    <div>
                                      <Table
                                        component={Paper} aria-label="customized table">

                                        <TableRow style={{
                                          backgroundColor: "#fff"
                                        }}>
                                          <TableCell> <b>Calls List</b> </TableCell>
                                          <TableCell>  </TableCell>
                                          <TableCell>  </TableCell>
                                          <TableCell>  </TableCell>
                                        </TableRow>

                                        <TableRow style={{
                                          backgroundColor: "#eeefff"
                                        }}>
                                          <TableCell>  Resturant ID </TableCell>


                                          <TableCell align="left">User ID</TableCell>
                                          <TableCell align="left">User Call</TableCell>
                                          <TableCell align="left">Direction User</TableCell>


                                        </TableRow>
                                        <TableBody>
                                          {this.state.logsData?.map(resto => (

                                            <TableRow className={classes.TableRowDesign}
                                              key={resto.id_log_call_direction}>
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
                                                    {resto.id_restaurant_fk}
                                                  </div>
                                                </div>
                                              </TableCell>
                                              <TableCell align="left">
                                                {resto.id_user_fk}

                                              </TableCell>
                                              <TableCell align="left">
                                                {resto.call_user}

                                              </TableCell>
                                              <TableCell align="left">
                                                {resto.direction_user}

                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>

                                    </div>
                                    :
                                    <h3>NO Call History Against This Resturnats</h3>
                                  :
                                  <>
                                  </>
                              }
                            </div>
                          </>
                          : this.state.graphUpdate == 9 ?
                            <>
                              <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around' }}>
                                <FormControl className={classes.formControl}>
                                  {/* <InputLabel id="demo-customized-select-label">ZipCode</InputLabel>
                                  <Select className={classes.formControl}

                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={this.state.resturant_id}
                                    renderValue={() => this.renderValue(this.state.resturant_id)}
                                    onChange={this.handleChangeZipCode}
                                    style={{ width: "300px" }}
                                  >
                                    {zipCode.map(el => (
                                      <MenuItem key={el.id_restaurant} value={el}>
                                        {el.zipcode}
                                      </MenuItem>
                                    ))}
                                  </Select> */}
                                  <Searchable
                                    value="" //if value is not item of options array, it would be ignored on mount
                                    placeholder="Search" // by default "Search"
                                    notFoundText="No result found" // by default "No result found"
                                    options={
                                      zipCode.map(el => (
                                        {
                                          value: el.id_restaurant,
                                          label: el.zipcode
                                        }
                                      ))}
                                    onSelect={option => {
                                      this.handleChangeZipCode(option); // as example - {value: '', label: 'All'}
                                    }}
                                    listMaxHeight={600} //by default 140
                                  />
                                </FormControl>
                                <div style={{ marginLeft: '30px', display: 'flex' }}>
                                  <h2>Total sales in this Zip code</h2>
                                  <h2 style={{ marginLeft: '10px' }}>=</h2>
                                  {
                                    this.state.salesByZip.length > 0 &&
                                    <h2 style={{ marginLeft: '5px' }}>{this.state.salesByZip.length}</h2>
                                  }
                                </div>
                              </div>
                              {
                                this.state.resturant_id != '' ?
                                  this.state.salesByZip.length > 0 ?
                                    <Bar
                                      data={Zip_Sales}
                                      options={{
                                        title: {
                                          display: true,
                                          text: 'Zip Code',
                                          fontSize: 20
                                        },
                                        legend: {
                                          display: true,
                                          position: 'right'
                                        },
                                        scales: {
                                          yAxes: [{
                                            scaleLabel: {
                                              display: true,
                                              labelString: 'Order Price'
                                            }
                                          }],
                                          xAxes: [{
                                            scaleLabel: {
                                              display: true,
                                              labelString: 'Order Number'
                                            }
                                          }]
                                        }
                                      }}
                                    />
                                    :
                                    <h3>No Data against this ZipCode</h3>
                                  :
                                  <>
                                  </>
                              }
                            </>
                            : this.state.graphUpdate == 10 ?
                              <>
                                {this.state.restaurants.length > 0 &&
                                  <>
                                    <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around' }}>
                                      {/* <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-customized-select-label">City/State</InputLabel>
                                        <Select className={classes.formControl}

                                          labelId="demo-customized-select-label"
                                          id="demo-customized-select"
                                          value={this.state.resturant_id}
                                          renderValue={() => this.renderValue(this.state.resturant_id)}
                                          onChange={this.handleChangeSalesbyState}
                                          style={{ width: "300px" }}
                                        >
                                          {stateArea.map(el => (
                                            <MenuItem key={el.id_restaurant} value={el}>
                                              {el.state}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl> */}
                                      <Searchable
                                        value="" //if value is not item of options array, it would be ignored on mount
                                        placeholder="Search" // by default "Search"
                                        notFoundText="No result found" // by default "No result found"
                                        options={
                                          stateArea.map(el => (
                                            {
                                              value: el.id_restaurant,
                                              label: el.state
                                            }
                                          ))}
                                        onSelect={option => {
                                          this.handleChangeSalesbyState(option); // as example - {value: '', label: 'All'}
                                        }}
                                        listMaxHeight={600} //by default 140
                                      />
                                      <div style={{ marginLeft: '30px', display: 'flex' }}>
                                        <h2>Total sales in this City/State</h2>
                                        <h2 style={{ marginLeft: '10px' }}>=</h2>
                                        {
                                          this.state.sateCityData.length > 0 &&
                                          <h2 style={{ marginLeft: '5px' }}>{this.state.sateCityData.length}</h2>
                                        }
                                      </div>
                                    </div>
                                    {
                                      this.state.resturant_id != '' ?
                                        this.state.sateCityData.length > 0 ?

                                          <Bar
                                            data={City_State}
                                            options={{
                                              title: {
                                                display: true,
                                                text: 'City State',
                                                fontSize: 20
                                              },
                                              legend: {
                                                display: true,
                                                position: 'right'
                                              },
                                              scales: {
                                                yAxes: [{
                                                  scaleLabel: {
                                                    display: true,
                                                    labelString: 'Order Price'
                                                  }
                                                }],
                                                xAxes: [{
                                                  scaleLabel: {
                                                    display: true,
                                                    labelString: 'Order Number'
                                                  }
                                                }]
                                              }
                                            }}
                                          />
                                          :
                                          <h3>No Data against this State/City</h3>
                                        :
                                        <>
                                        </>
                                    }
                                  </>
                                }
                              </>
                              : this.state.graphUpdate == 13 ?
                                <>
                                  {
                                    this.state.getAllDishes.length > 0 &&
                                    <div style={{
                                      display: 'flex', alignItems: 'flex-start',
                                      paddingHorizontal: 12, flexWrap: 'wrap', marginTop: '40px'
                                    }}>
                                      {
                                        this.state.getAllDishes?.map((value, index) => {
                                          return (
                                            <div style={{ width: '250px', height: '150px', marginHorizontal: 8, marginBottom: 80, }} onClick={() => this.getDishesValue(value, index)}>
                                              <div style={{ borderWidth: '1px', borderRadius: '12px', backgroundColor: '#e0e0dc', marginLeft: 20, }}>
                                                <img src={`${menuPath}${value.img_menu}`}
                                                  style={{ height: 80, width: '100%', alignSelf: 'center' }}
                                                />
                                                <div style={{ margin: '10px' }}>
                                                  <div style={{ display: 'flex', }}>
                                                    <h3>Dish Name: </h3>
                                                    <h4 style={{ marginLeft: '20px' }}>{value.name_menu}</h4>
                                                  </div>
                                                  <div style={{ display: 'flex', marginTop: -20 }}>
                                                    <h3>Sales: </h3>
                                                    <h4 style={{ marginLeft: '20px' }}>{value.amount_serve}</h4>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                  }
                                  <Dialog
                                    open={this.state.setOpen}

                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <img src={`${menuPath}${this.state.setDishValue.img_menu}`}
                                      style={{ height: 80, width: '100%', alignSelf: 'center' }}
                                    />
                                    <div style={{ margin: '10px' }}>
                                      <div style={{ display: 'flex', }}>
                                        <h3>Dish Name: </h3>
                                        <h4 style={{ marginLeft: '20px' }}>{this.state.setDishValue.name_menu}</h4>
                                      </div>
                                      <div style={{ display: 'flex', marginTop: -20 }}>
                                        <h3>Description: </h3>
                                        <h4 style={{ marginLeft: '20px' }}>{this.state.setDishValue.description_menu}</h4>
                                      </div>
                                      <div style={{ display: 'flex', marginTop: -20 }}>
                                        <h3>Sales: </h3>
                                        <h4 style={{ marginLeft: '20px' }}>{this.state.setDishValue.amount_serve}</h4>
                                      </div>
                                      <div style={{ display: 'flex', marginTop: -20 }}>
                                        <h3>Dish Price : </h3>
                                        <h4 style={{ marginLeft: '20px' }}>{this.state.setDishValue.prix_menu}</h4>
                                      </div>
                                      <div style={{ display: 'flex', marginTop: -20 }}>
                                        <h3>Resturant Menu ID : </h3>
                                        <h4 style={{ marginLeft: '20px' }}>{this.state.setDishValue.restaurantMenuID}</h4>
                                      </div>
                                    </div>
                                    <DialogActions>

                                      <Button onClick={this.handleClose} color="primary">
                                        ok
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </>
                                :
                                <>
                                </>

          }
        </TableContainer>
      </>
    )
  }
};

export default withStyles(styles)(Graphs)    