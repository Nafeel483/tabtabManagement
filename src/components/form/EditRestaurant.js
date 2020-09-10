import React, { Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import logo from '../../assets/images/logo.png';
import icon_camera from '../../assets/images/icon_camera.png';

import Chip from '@material-ui/core/Chip';
import { urlFunction } from '../../utils/urls';
import axios from "axios"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import PlacesAutocomplete from 'react-places-autocomplete';
import FormControl from '@material-ui/core/FormControl';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userContext } from '../../utils/userContext';
import { getRestaurantById} from '../../utils/restaurantContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';
  
import * as moment from 'moment';
function Copyright() {
	return (
	  <Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://material-ui.com/">
		  Tap tap now  managementy
		  
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
}

const styles = theme => ({
	root: {
		flexGrow: 1,
	  },
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	avatar: {
	  margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		width: 100,
	  height: 100,
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: - 40
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
});
  
let daysOfWeeks = ['Sunday', 'Monday','Tuesday', 'Wednesday','Thursday', 'Friday','Saturday'];
	 
class EditRestaurant extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			error           : false,
			button          : false,
			file: '',
			logoToSend:'',
			imagePreviewUrl: '',
			name_restaurant  : '',
			tel_restaurant : '',
			website          : 'Not required',
			country          : 1 ,
			state            : '',
			countryList: [],
			successForm: false,
			adresse_restaurant: '',
			latLng: {},
			lat_restaurant: '',
			long_restaurant: '',
			showSucess: false,
			openBackdrop: false,
			user: {},
			open_restaurant: 0,
			tax: 10,
			timesOpening: [],
			daysOfWeeks: daysOfWeeks,
			delivery_service: '',
			menus:[],
      delivery_fee: '',
      indexvalue:false,
		};
	}


	setSelectedDate = (date) => {
		this.setState({ selectedDate: date })
	}

	handleDateChange = date => {
		this.setSelectedDate(date);
	};

	handleChange = adresse_restaurant => {
		this.setState({ adresse_restaurant });
	};
	 
	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => {
				console.log("Adress full result",results[0])
				return	getLatLng(results[0])	
			})
			.then(latLng => {
				this.setState({
					adresse_restaurant:	address,
					latLng: latLng,
					long_restaurant:latLng.lng,
					lat_restaurant:latLng.lat,
				})
				// console.log('get lat', { latLng  })
		}).catch(error => console.error('Error', error));
	};
	
	getCountry = (token) => {
		axios
			.get(
				`${urlFunction()}/country`,
				{ headers: { Authorization: 'bearer ' + token } },
				{
					'Content-Type' : 'multipart/form-data',
				},
			)
			.then((res) => {

					this.setState({
						countryList : res.data,
					});
				
			})
			.catch((error) => {
				this.setState({
					showProgress : false,
				});
				console.log("ERROR BACK " , error);
			});
	};

 	_handleSubmit = (e) => {
     this.setState({indexvalue:false})
		var d = new Date();
		var time = d.getHours() + ":" + d.getMinutes()
		var n = d.getDay()
		 this.setState({
			openBackdrop: !this.state.openBackdrop
		})
		// e.preventDefault();
		// const data = new FormData();
		// data.append('id_restaurant', this.state.restaurant.id_restaurant);
		// data.append('logo_restaurant',this.state.file)
		// data.append('restaurant_name', this.state.name_restaurant);
		// data.append('countryRestID', this.state.country);
		// data.append('tel_restaurant', this.state.tel_restaurant);
		// data.append('adresse_restaurant', this.state.adresse_restaurant);
		// data.append('lat_restaurant', this.state.lat_restaurant.toString());
		// data.append('long_restaurant', this.state.long_restaurant.toString());
		// data.append('adminRestID', this.state.user.data.id_user);
		// data.append('state', this.state.state);
		// data.append('tax', this.state.tax);
		// data.append('zipcode', this.state.zipcode);
		// data.append('open_restaurant', 
		// daysOfWeeks[this.state.timesOpening[0]&&this.state.timesOpening[0].weekday]=='Monday'
		// &&time>=this.state.timesOpening[0].start_hour&&time<=this.state.timesOpening[0].end_hour?1:
		// daysOfWeeks[this.state.timesOpening[1]&&this.state.timesOpening[1].weekday]=='Tuesday'&&
		// time>=this.state.timesOpening[1].start_hour
		// && time<=this.state.timesOpening[1].end_hour?1:
		// daysOfWeeks[this.state.timesOpening[2]&&this.state.timesOpening[2].weekday]=='Wednesday'
		// &&time>=this.state.timesOpening[2].start_hour&&time<=
		// this.state.timesOpening[2].end_hour?1:
		// daysOfWeeks[this.state.timesOpening[3]&&this.state.timesOpening[3].weekday]=='Thursday'&&
		// time>=this.state.timesOpening[3].start_hour&&time<=
		// this.state.timesOpening[3].end_hour?1:
		// daysOfWeeks[this.state.timesOpening[4]&&this.state.timesOpening[4].weekday]=='Friday'&&
		// time>=this.state.timesOpening[4].start_hour&&time<=this.state.timesOpening[4].end_hour?1:
		// daysOfWeeks[this.state.timesOpening[5]&&this.state.timesOpening[5].weekday]=='Saturday'&&
		// time>=this.state.timesOpening[5].start_hour&&time<=this.state.timesOpening[5].end_hour?1:
		// daysOfWeeks[this.state.timesOpening[5]&&this.state.timesOpening[6].weekday]=='Sunday'&&
		// time>=this.state.timesOpening[6].start_hour&&time<=this.state.timesOpening[6].end_hour?1:
		// 0
		// );
		// data.append('delivery_service', this.state.delivery_service);
    // data.append('delivery_fee', this.state.delivery_fee);
    let data={
      id_restaurant: this.state.restaurant.id_restaurant,
      logo_restaurant:this.state.file,
      restaurant_name:this.state.name_restaurant,
      delivery_service:this.state.delivery_service,
      delivery_fee:this.state.delivery_fee,
      countryRestID:this.state.country,
      tel_restaurant:this.state.tel_restaurant,
      adresse_restaurant:this.state.adresse_restaurant,
      lat_restaurant:this.state.lat_restaurant?.toString(),
      long_restaurant:this.state.long_restaurant?.toString(),
      adminRestID: this.state.user.data.id_user,
      state:this.state.state,
      tax:this.state.tax,
      zipcode:this.state.zipcode,
	  open_restaurant:		
	  this.state.timesOpening[0]&&this.state.timesOpening?.[0].weekday==n.toString()
      &&parseInt(time)>=parseInt(this.state.timesOpening[0].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[0].end_hour)?1:
	 
	  this.state.timesOpening[1]&&this.state.timesOpening?.[1].weekday==n.toString()
	 
	  &&
      parseInt(time)>=parseInt(this.state.timesOpening[1].start_hour)
	  && parseInt(time)<=parseInt(this.state.timesOpening[1].end_hour)?1:
	  
	  this.state.timesOpening[2]&&this.state.timesOpening?.[2].weekday==n.toString()
	 

      &&parseInt(time)>=parseInt(this.state.timesOpening[2].start_hour)&&parseInt(time)<=
	  parseInt(this.state.timesOpening[2].end_hour)?1:
	  

	  this.state.timesOpening[3]&&this.state.timesOpening?.[3].weekday==n.toString()
	  &&
	  
      parseInt(time)>=parseInt(this.state.timesOpening[3].start_hour)&&parseInt(time)<=
      parseInt(this.state.timesOpening[3].end_hour)?1:
	  this.state.timesOpening[4]&&this.state.timesOpening?.[4].weekday==n.toString() 
	 
	  &&
      parseInt(time)>=parseInt(this.state.timesOpening[4].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[4].end_hour)?1:
	  this.state.timesOpening[5]&&this.state.timesOpening?.[5].weekday==n.toString() 
	 
	  &&
      parseInt(time)>=parseInt(this.state.timesOpening[5].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[5].end_hour)?1:
	  this.state.timesOpening[6]&&this.state.timesOpening?.[6].weekday==n.toString()
	  &&
      parseInt(time)>=parseInt(this.state.timesOpening[6].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[6].end_hour)?1:
      0,

    }
		const config = {
			method  : 'PUT',
			headers : {
				Authorization  : 'bearer ' +this.state.user.token,
				// Accept         : 'application/json',
				// 'Content-Type' : 'multipart/form-data',
			},
			body    : data,
		};
			console.log("The Update Data is:",data)
		fetch(`${urlFunction()}/restaurant/update`, config)
		
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log('update restaurant', data);
				if (data) {
					this.setState({
						
						showProgress: false,
						error: false,
						showSucess: true,
						openBackdrop: !this.state.openBackdrop
					});
				}
			})
			.catch((err) => {
				console.log('Show the error on create restaurant ', err);
				this.setState({
					showProgress: false,
					error: true,
					errorMessage: err.message,
					openBackdrop: !this.state.openBackdrop
				});
			});
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	 
	_handleImageChange = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				this.setState({
					file            : file,
					imagePreviewUrl: reader.result,
					logoToSend: file
				});
			};
		}
	
	}
	
	handleDeleteTime = async(time) => {
		let { id_opening_time } = time
		axios.delete(`${urlFunction()}/restaurant/opening/${id_opening_time}`)
		this.getTimeOpening()
	}

	addTimeHours = async () => {
		let data = {
			"restaurant_fk": this.props.idRestaurant,
			"weekday": this.state.weekday,
			"start_hour": this.state.start_hour,
			"end_hour":  this.state.end_hour,
		}
		
		let restTimesOpening = await axios.post(`${urlFunction()}/restaurant/opening/`,data)
		this.setState({
			timesOpening : [...this.state.timesOpening, restTimesOpening]
		})

		console.log("addTimeHours", restTimesOpening)
		this.getTimeOpening()
	}

	componentDidMount = async () => {
		this.getCountry();
		let user = await userContext();
		if (user != null) {
			this.setState({
				user: JSON.parse(user),
				token:  JSON.parse(user).token,
			})
		} else {
			// back him login
			this.setState({
				isLogin: false
			})
		}
		// Get restaurant by id 
		let restaurant = await getRestaurantById(this.props.idRestaurant);
		restaurant = restaurant[0]
		console.log("My Resturant",restaurant)
		this.setState({
			restaurant: restaurant || [],
			name_restaurant: restaurant?.name_restaurant,
			tel_restaurant:  restaurant?.tel_restaurant,
			zipcode:  restaurant?.zipcode,
			state:  restaurant?.state,
			lat_restaurant:  restaurant?.lat_restaurant,
			long_restaurant:  restaurant?.long_restaurant,
			adresse_restaurant: restaurant?.adresse_restaurant,
			logo_restaurant: restaurant?.logo_restaurant,
			// open_restaurant: restaurant.open_restaurant,
			country: restaurant?.countryRestID,
			tax: restaurant?.tax,
			delivery_service: restaurant?.delivery_service?restaurant.delivery_service : '',
      delivery_fee: restaurant?.delivery_fee?restaurant.delivery_fee : "",	
      indexvalue:true
		})
		this.getTimeOpening()
		this.getMenusForRestaurant()
	}
	getMenusForRestaurant = async () => {
		let res = await axios.get(`${urlFunction()}/menu/${this.props.idRestaurant}`);
		let data = res.data
		if (data) {
		  this.setState({
			showProgress: false,
			menus: res.data.reverse()
		  })
		} else {
		  this.setState({
			showProgress: false,
		  })
		  alert(res.message)
		}
	  }
	getTimeOpening = async () => {
		let timesOpening = await axios.get(`${urlFunction()}/restaurant/opening/${this.props.idRestaurant}`)
		timesOpening = timesOpening.data;
		if (timesOpening.length > 0) {
			this.setState({
				timesOpening:timesOpening.sort((a,b) => a.weekday - b.weekday)
			})
		}
	}

	handleCloseSnackbar = () => {
		this.setState({
			showSucess:!this.state.showSucess
		})
	}
	renderValue = (value) => {
		return value;
	  }
	render() {
		var d = new Date();
		var time = d.getHours() + ":" + d.getMinutes()
		var n = d.getDay()
		const end_hour=this.state.timesOpening.filter((value)=>{
		if(value.weekday==1)
		{
			return value.end_hour
		}})
		
			console.log("The Time is:",this.state.timesOpening,time,n)
		if (this.state.isLogin == false ) {
			return  <Redirect to='/' />
		}
		let { classes, selectedDate } = this.props;
		let {name_restaurant, tax,open_restaurant,logo_restaurant,user,imagePreviewUrl ,country, countryList,openBackdrop} = this.state;
		 console.log('The this.state.delivery_service',this.state.delivery_service)
		return (	
			<div>
				<Backdrop className={classes.backdrop} open={openBackdrop} >
					<CircularProgress color="inherit" />
				</Backdrop>
				<TableContainer
					style={{
						marginTop: 80,
						paddingLeft: 20,
						paddingRight: 20,
					}}>
				
					<div style={{
						display:'flex',
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						}}> 
						
						<div style={{
								marginRight: 16,
								cursor: 'pointer',
							}}>
								
							<Link
								to={`/restaurant_details/${this.props.idRestaurant}`}
								style={{
									textDecoration: "none",
									marginRight: 10,
								}}>
								<ArrowBackIcon color='primary' />
							</Link>
						</div>
						
						<div>
							<h2> Edit {name_restaurant}</h2>
						</div>
					</div>	
				<Container component="main" maxWidth="large">

				<div className={classes.paper}>
							
					{this.state.showSucess == true ?
						<Alert onClose={this.handleCloseSnackbar} severity="success">
							Restautant have been edit 
						</Alert>
					: null}		

				
					
					<Grid container className={classes.root} spacing={2}>
						<Grid item xs={6}>
							<form className={classes.form} noValidate>
								{
									logo_restaurant == '' ?
									<img
										src={icon_camera}
										style={{
											height       : 100,
											width        : 100,
											borderRadius: 50,	
											background:"#fff",
											cursor:'pointer'
										}}
										onClick={() => this.fileInputFormenuPic.click()}
										alt="Click to add image"
									/> :
									<img
										src={imagePreviewUrl == '' ? `http://localhost:3001/api/v2/api/path?img_restaurant=${logo_restaurant}`:imagePreviewUrl }
										style={{
											height       : 100,
											width        : 100,
											borderRadius: 50,	
											background:"#fff",
											cursor:'pointer'
										}}
										onClick={() => this.fileInputFormenuPic.click()}
										alt="Click to add image"
									/>	
								}	
								<Grid item xs={12}>

										<h3>Resturant status </h3>
										
										{
										this.state.menus.length>0&&<>{
										this.state.timesOpening.length==0?
										<h4>	Close</h4>:
										// this.state.timesOpening.map(el =>
										this.state.timesOpening[1]&&this.state.timesOpening?.[1].weekday==n.toString()

										
											&&parseInt(time)>=parseInt(this.state.timesOpening[1].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[1].end_hour)?
											<>
											<h4>	Open </h4>
                      						{this.state.indexvalue&&
                      						this._handleSubmit()}
											</>
											:
											this.state.timesOpening[2]&&this.state.timesOpening?.[2].weekday==n.toString()
										
											&&parseInt(time)>=parseInt(this.state.timesOpening[2].start_hour)
											&&parseInt(time)<=parseInt(this.state.timesOpening[2].end_hour)?
											<>
											<h4>	Open </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>:
											this.state.timesOpening[3]&&this.state.timesOpening?.[3].weekday==n.toString()
											
											&&parseInt(time)>=parseInt(this.state.timesOpening[3].start_hour)&&
											parseInt(time)<=parseInt(this.state.timesOpening[3].end_hour)?
											<>
											<h4>	Open </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>:
											this.state.timesOpening[4]&&this.state.timesOpening?.[4].weekday==n.toString()
											
										
											&&parseInt(time)>=parseInt(this.state.timesOpening[4].start_hour)&&
											parseInt(time)<=parseInt(this.state.timesOpening[4].end_hour)?
											<>
											<h4>	Open </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>:
											this.state.timesOpening[5]&&this.state.timesOpening?.[5].weekday==n.toString()
					
											&&
											parseInt(time)>=parseInt(this.state.timesOpening[5].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[5].end_hour)?
											<>
											<h4>	Open </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>:
											this.state.timesOpening[6]&&this.state.timesOpening?.[6].weekday==n.toString()
											
											&&parseInt(time)>=parseInt(this.state.timesOpening[6].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[6].end_hour)?
											<>
											<h4>	Open </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>:
											
											this.state.timesOpening[0]&&this.state.timesOpening?.[0].weekday==n.toString()
											&&parseInt(time)>=parseInt(this.state.timesOpening[0].start_hour)&&parseInt(time)<=parseInt(this.state.timesOpening[0].end_hour)?
											<>
											<h4>	Open1 </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>:
											<>
											<h4>	Close </h4>
											{this.state.indexvalue&&this._handleSubmit()}
											</>
										// )
											  }
										</>
										}	
									{/* <Select
										style={{
											width: '96%',
											background: "#fff",
											marginBottom: 20
										}}
										name="open_restaurant"	
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={open_restaurant}
										onChange={this.handleInputChange}
										>
										<MenuItem value={1}>Open</MenuItem>
										<MenuItem value={0}>Close</MenuItem>
									</Select> */}
								</Grid>
										
								<Grid container spacing={2} item xs={12}>
									<Grid item xs={12} >
										<TextField
											name="search"
											name="name_restaurant"
											variant="outlined"
											required
											fullWidth
											id="name_restaurant"
											value={this.state.name_restaurant}
											label="Restaurant name"
											onChange={this.handleInputChange}		
											autoFocus
										/>
									</Grid>									
									<Grid item xs={12}>
									<PhoneInput
										country={'us'}
										value={this.state.tel_restaurant}
										placeholder={'Phone number'}
										// onlyCountries={['ca', 'ht', 'us']}
										inputProps={{
											name: 'phone',
											required: true,
											autoFocus: false
										}}
										onChange={tel_restaurant => this.setState({ tel_restaurant })}
										inputStyle={{
											paddding: 12,
											width:'100%'
										}}

									/>
													
									</Grid>
									<Grid item xs={12}>
										<FormControl variant="outlined" style={{
											width: '100%',
										}}>
											<InputLabel id="demo-simple-select-label">Country</InputLabel>
											<Select
												style={{
													width: '100%'
												}}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={country}
												name="country"
												onChange={this.handleInputChange}>
													{countryList.map(el => (
														<MenuItem key={el.id_country} value={el.id_country}>
															{el.globalname_country}
														</MenuItem>
													))}
											</Select>
										</FormControl>
								</Grid>

								<Grid item xs={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="state"
										value={this.state.state}
										label="State"
										type="text"
										id="password"
										onChange={this.handleInputChange}
									/>
								</Grid>
												
								<Grid item xs={6}>
									<TextField
									variant="outlined"
									required
									fullWidth
									value={this.state.zipcode}
									name="zipcode"
									label="Zip code"
									type='number'
									id="zipcode"
									InputLabelProps={{
										shrink: true,
									  }}
									onChange={this.handleInputChange}
								/>					
								</Grid>

								<Grid item xs={12}>							
									<PlacesAutocomplete
										value={this.state.adresse_restaurant}
										onChange={this.handleChange}
										onSelect={this.handleSelect}
										// shouldFetchSuggestions={this.state.adresse_restaurant.length > 4}
										style={{
											width: '100%'
										}}
									>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div>
											<TextField		
												autoComplete='off'							
												variant="outlined"
												required
												fullWidth
												name="adresse_restaurant"
												label="Restaurant address"
												
												{...getInputProps({
													placeholder: 'Restaurant address ',
													className: 'location-search-input',
												})}

											/>
									<div className="autocomplete-dropdown-container"								
									>
								{loading && <div>Loading...</div>}
								{suggestions.map(suggestion => {
									const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';
									// inline style for demonstration purpose
									const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
									return (
									<div
										{...getSuggestionItemProps(suggestion, {
										className,
										style,
										})}
										>
									<div
										style={{
											paddingTop: 10,
											paddingBottom: 10,
											paddingLeft: 4,
											paddingRight: 4
										}}
										>{suggestion.description}
									</div>
									</div>
									);
								})}
								</div>
							</div>
							)}
							</PlacesAutocomplete>
														
							</Grid>	
							<Grid item xs={6}>
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								value={this.state.delivery_service}
								name="delivery_service"
								label="Delivery Service"
								type="text"
								id="delivery_service"
								onChange={this.handleInputChange}
							/> */}
							 {/* <FormControl className={classes.formControl}>
                                        <Select className={classes.formControl}

                                          labelId="demo-customized-select-label"
                                          id="demo-customized-select"
                                          value={this.state.delivery_service}
                                          renderValue={() => this.renderValue(this.state.delivery_service)}
                                          onChange={this.handleInputChange}
                                          style={{ width: "300px" }}
                                        >
                                          <MenuItem value={"Yes"}>yes</MenuItem>
										<MenuItem value={"NO"}>No</MenuItem>
                                        </Select>
                                      </FormControl> */}
									  <FormControl variant="outlined" style={{
											width: '100%',
										}}>
										<InputLabel id="demo-simple-select-label">Delivery Service</InputLabel>

											<Select
												style={{
													width: '100%'
												}}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={this.state.delivery_service}
												name="delivery_service"
												renderValue={() => this.renderValue(this.state.delivery_service)}
												onChange={this.handleInputChange}>
													 <MenuItem value={"Yes"}>yes</MenuItem>
										<MenuItem value={"NO"}>No</MenuItem>
											</Select>
										</FormControl>
						</Grid>
										
						<Grid item xs={6}>
							<TextField
							variant="outlined"
							required
							fullWidth
							value={this.state.delivery_fee}
							name="delivery_fee"
							label="Delivery Fee"
							type="text"
							id="delivery_fee"
							onChange={this.handleInputChange}
						/>					
						</Grid>																		
								<Grid item xs={6}>
									<input
										variant="outlined"
										required
										name="lat_restaurant"
										placeholder="Latitude"
										type="text"
										id="lat_restaurant"					
										style={{
											width: '100%',
											padding: 12,
											fontSize: 15,
											backgroundColor: '#fafafa',
											border: 'none',
											boxShadow: '0 0px 0px 1px #bbb'
										}}
										defaultValue ={this.state.lat_restaurant}
										onChange={this.handleInputChange}				
									/>
								</Grid>
											
								<Grid item xs={6} >
									<input
										style={{
											padding: 12,
											fontSize: 15,
											backgroundColor: 'none',
											width: '100%',
											padding: 12,
											fontSize: 15,
											backgroundColor: '#fafafa',
											border: 'none',
											boxShadow: '0 0px 0px 1px #bbb'
										}}
										// variant="outlined"
										required
										// fullWidth
										id="Longitude"
										placeholder="Longitude"
										name="long_restaurant"
										defaultValue ={this.state.long_restaurant}
										onChange={this.handleInputChange}
									/>
								</Grid>
															
								<Grid item xs={6} >
									<TextField
										name="tax"
										variant="outlined"
										required
										fullWidth
										id="tax"
										label="Tax"
										type="number"
										onChange={this.handleInputChange}	
										value={ tax}			
										helperText={`Value % example: 10 %`}
									/>
								</Grid>
												
								<Grid item xs={12}>					
									<input
										variant="outlined"
										required
										fullWidth
										name="img_restaurant"
										label=""
										onChange={this._handleImageChange}  
										type="file"
										id='file'
										
										ref={fileInputFormenuPic =>
											(this.fileInputFormenuPic = fileInputFormenuPic)
										}
										style={{ display: 'none' }}
									/>	
								</Grid>

								</Grid>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										onClick={this._handleSubmit}>
										Save
									</Button>

									{
										this.state.error == true ? 
											<Alert severity="error"> {this.state.errorMessage}</Alert>
										:
										null
									}
					
							</form>
						</Grid>

						<Grid spacing={1}
							item xs={6}
							style={{
							marginTop: 70
						}}>
							<h2>Opening times</h2>  
								<div
									style={{
											display:'flex',
											flexDirection: 'row',
											alignItems: "center",
											justifyContent: "space-between",
									}}>
									{this.state.menus.length>0?<>
								
									<div item xs={4}>       
										<InputLabel id="demo-simple-select-label"> Day of weeks </InputLabel>
										<Select
											style={{
												width: '96%',
												marginBottom: 20
												}}
												value={this.state.weekday}
												variant="outlined"
												name="weekday"	
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												onChange={this.handleInputChange}
											>
												{this.state.daysOfWeeks.map( (el, i) =>
												<MenuItem value={i}>{el}</MenuItem>
												)}
								
										</Select>
									</div>
									
									<div item xs={4}>          
										<TextField
											variant="outlined"
											required
											fullWidth
											name="start_hour"
											label="Start hour"
											
											type="time"
											onChange={this.handleInputChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</div>
									<div item xs={4}>          
										<TextField
											variant="outlined"
											required
											fullWidth
												name="end_hour"
												max="23:00"
											label="End hour"
												type="time"
												onChange={this.handleInputChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										</div>
										
										<div item xs={4}>          
												<Fab color="primary" aria-label="add"
													onClick={this.addTimeHours}>
												<AddIcon />
											</Fab>
										</div>
										</>
										:
	<h2>First Add Menu</h2>  
										}
							</div>
									
							{/* List of open times */}
							{this.state.menus.length>0&&<>
							<h3> List of opening times </h3>
							</>
	}
									
							<div>
							{this.state.menus.length>0&&<>
					
							{
								this.state.timesOpening.map(el =>
										<div key={el} style={{ width: '100%' }}
										style={{
											display:'flex',
											flexDirection: 'row',
											alignItems: "center",
											justifyContent: "space-between",
											}}>
											<ListItem button>
											<ListItemText primary={daysOfWeeks[el.weekday]} style={{
												width: 160,
											}}/>
											<ListItemText
												primary={
													el.start_hour
												}
											/>
											<ListItemText primary={el.end_hour} />
											<DeleteIcon className={classes.icon}
												onClick={this.handleDeleteTime.bind(this, el)}/>
											</ListItem>
										</div>
									)
								}
									</>
	}													
							</div>
						</Grid>
					</Grid>

					</div>
					<Box mt={5}>
						<Copyright />
					</Box>
				</Container>
						
				</TableContainer>
			</div>
			);
		}
	}
export default withStyles(styles) (EditRestaurant)