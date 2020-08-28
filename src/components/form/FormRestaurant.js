import React, { Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import tkp from '../../assets/images/tkp.png';
import icon_camera from '../../assets/images/icon_camera.png';
import { urlFunction } from '../../utils/urls';
import axios from "axios"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import PlacesAutocomplete from 'react-places-autocomplete';
import FormControl from '@material-ui/core/FormControl';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userContext } from '../../utils/userContext';

import {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';  
import { Redirect } from 'react-router-dom';

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
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
});
  
class FormRestaurant extends React.Component {
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
			user:{},
			delivery_service: '',
			delivery_fee: ''
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
		 this.setState({
			openBackdrop: !this.state.openBackdrop
		})
		e.preventDefault();
		const data = new FormData();
		data.append('logo_restaurant',this.state.file)
		data.append('restaurant_name', this.state.name_restaurant);
		data.append('countryRestID', this.state.country);
		data.append('tel_restaurant', this.state.tel_restaurant);
		data.append('adresse_restaurant', this.state.adresse_restaurant);
		data.append('lat_restaurant', this.state.lat_restaurant.toString());
		data.append('long_restaurant', this.state.long_restaurant.toString());
		data.append('adminRestID', this.state.user.data.id_user);
		data.append('state', this.state.state);
		data.append('zipcode', this.state.zipcode);
		data.append('delivery_service', this.state.delivery_service);
		data.append('delivery_fee', this.state.delivery_fee);
		const config = {
			method  : 'POST',
			headers : {
				Authorization  : 'bearer ' + 1 ,//this.state.user.token,
				// Accept         : 'application/json',
				// 'Content-Type' : 'multipart/form-data',
			},
			body    : data,
		};
			
		fetch(`${urlFunction()}/restaurant`, config)
		
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log('Created restaurant dats', data);
				if (data) {
					this.setState({
						name_restaurant: '',
						tel_restaurant: '',
						zipcode: '',
						state: '',
						lat_restaurant: '',
						long_restaurant: '',
						adresse_restaurant:'',
						delivery_service: '',
						delivery_fee: '',
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
	
	componentDidMount = async () => {
		this.getCountry()
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
	}

	handleCloseSnackbar = () => {
		this.setState({
			showSucess:!this.state.showSucess
		})
	}

	render() {
		if (this.state.isLogin == false ) {
			return  <Redirect to='/' />
		}
		let { classes, selectedDate } = this.props;
		let { user,imagePreviewUrl ,country, countryList,openBackdrop} = this.state;
		 
		return (	
			<div>
				<Backdrop className={classes.backdrop} open={openBackdrop} >
					<CircularProgress color="inherit" />
				</Backdrop>
				<TableContainer style={{
						marginTop: 80,
						paddingLeft: 20,
						paddingRight: 20,
					}}
				>
					<div
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent:"space-between"
						}}>
					
					<h2> Create restaurant</h2>    
				  
				</div>		
				<Container component="main" maxWidth="sm" style={{
				}}>

				<div className={classes.paper}>
							
				{this.state.showSucess == true ?
					<Alert onClose={this.handleCloseSnackbar} severity="success">
						Restautant have been add 
					</Alert>
				 : null}		
							
					<img
						src={imagePreviewUrl == '' ? icon_camera:imagePreviewUrl}
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
				
					<form className={classes.form} noValidate>
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
									marginTop:5
								}}>
									{/* <InputLabel id="demo-simple-select-label">Country</InputLabel> */}
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
							type="text"
							id="zipcode"
							onChange={this.handleInputChange}
						/>					
						</Grid>
						
						<Grid item xs={12}>							
							<PlacesAutocomplete
								value={this.state.adresse_restaurant}
								onChange={this.handleChange}
								onSelect={this.handleSelect}
								shouldFetchSuggestions={this.state.adresse_restaurant.length > 4}
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
							<TextField
								variant="outlined"
								required
								fullWidth
								value={this.state.delivery_service}
								name="delivery_service"
								label="Delivery Service"
								type="text"
								id="delivery_service"
								onChange={this.handleInputChange}
							/>
								{/* <FormControl variant="outlined" style={{
									width: '100%',
								}}>
									<Select
										style={{
											width: '100%'
										}}
										labelId="delivery_service"
										id="delivery_service"
										value={this.state.delivery_service}
										name="delivery_service"
											onChange={this.handleInputChange}>
												<MenuItem  value={'Yes'} >
												Yes
												</MenuItem>
												<MenuItem value={'No'}>
												No
												</MenuItem>
									</Select>
								</FormControl> */}
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
					
							<Grid item xs={6}>					
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
								{this.state.adresse_restaurant !==''? 
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										onClick={this._handleSubmit}>
										Create 
									</Button>
								:null}
								
								{
									this.state.error == true ? 
										<Alert severity="error"> {this.state.errorMessage}</Alert>
									:
									null
								}
						
							</form>
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
export default withStyles(styles) (FormRestaurant)