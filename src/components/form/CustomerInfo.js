import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import './form.css';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Switch,
  TextField,
  Typography,
    colors,
    Avatar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link, Redirect } from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import { userContext, getUserById } from '../../utils/userContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import icon_camera from '../../assets/images/icon_camera.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import { urlFunction } from '../../utils/urls';
import {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';
  
import PlacesAutocomplete from 'react-places-autocomplete';
import PhoneInput from 'react-phone-input-2'

const styles = theme => ({
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
        backgroundColor: colors.green[900]
    }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlgin: 'center',
        width: 700
    },
    name: {
        marginTop: theme.spacing(1)
    }, 

    avatar: {
        height: 140,
        width: 140
    },
});

class CustomerInfo extends Component  {
    constructor(props) {
        super(props)
        this.selectImg = React.createRef();
        this.state = {
            showSucess: false,
            openBackdrop: false,
            showPAsswordConfirmError: false,
            showSucessPasswordUpdate: false,
            userResult: {},
            file: '',
			logoToSend: '',
            imagePreviewUrl: '',
            user_address: '',
            active: 1,
            unactive: 0,
            password_user: '',
            confirm_password: '',
            photo_user:''
        }
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

        let userResult = await getUserById(this.props.iduser, JSON.parse(user).token);
       
        this.setState({
            userResult: userResult,
            'name_user': userResult.name_user,
            'first_name': userResult.first_name,
            'last_name':userResult.last_name,
            'email_user': userResult.email_user,
            'tel_user': userResult.tel_user,
            'user_address': userResult.user_address, 
            'actif_user': userResult.actif_user, 
            // 'imagePreviewUrl': userResult.photo_user,
            'photo_user': userResult.photo_user,
        })   
    }

    handleSelect = address => {
		geocodeByAddress(address)
			.then(results => {
				console.log("Adress full result",results[0])
				return	getLatLng(results[0])	
			})
			.then(latLng => {
				this.setState({
					user_address:	address,
					latLng: latLng,
					long_restaurant:latLng.lng,
					lat_restaurant:latLng.lat,
				})
				// console.log('get lat', { latLng  })
		}).catch(error => console.error('Error', error));
	};
	
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(" event.target.value  ",  event.target.value )
    };

    handleSubmit = e => {
        this.setState({
			openBackdrop: !this.state.openBackdrop
		})
        e.preventDefault(); 
        let data = new FormData()

        data.append('photo_user',this.state.file)
        data.append('first_name',this.state.first_name)
        data.append('last_name',this.state.last_name)
        data.append('email_user',this.state.email_user)
        data.append('tel_user',this.state.tel_user)
        data.append('user_address',this.state.user_address)
        data.append('name_user',this.state.name_user)
        data.append('is_first_time_login',1)
        data.append('id_user', this.props.iduser,)

        const config = {
            method  : 'POST',
            headers : {
                Authorization  : 'bearer ' + this.state.user.token,
            },
            body    : data,
        };

        fetch(`${urlFunction()}/user/update`, config)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data) {
                this.setState({
                    openBackdrop: !this.state.openBackdrop,
                    showSucess:true
                })
            }
        }).catch(e => {
            this.setState({
                email_user: '',
                showSucess: false,
                openBackdrop: !this.state.openBackdrop
            })
            alert(e.message)
        })
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
                    logoToSend: file,
                    photo_user: reader.result,
                });
            };
        }
    }

    updatePassword = (e) => {
        if (this.state.password_user != this.state.confirm_password) {
            this.setState({
                showPAsswordConfirmError: true
            })
        } else {

            this.setState({
                openBackdrop: !this.state.openBackdrop,
                showPAsswordConfirmError: false
            })
            e.preventDefault();
    
            let data = {
                'password_user': this.state.password_user,
                'is_first_time_login': 1,
                id_user: this.props.iduser
            }
            axios.post(`${urlFunction()}/user/update`, data, {
                headers: {
                    Authorization: 'bearer ' + this.state.user.token,
                },
            }
            ).then(res => {
                this.setState({
                    openBackdrop: !this.state.openBackdrop,
                    showSucessPasswordUpdate: true,
                })
            }).catch(err => {
                console.log("error", err)
                this.setState({
                    showSucess: false,
                    openBackdrop: !this.state.openBackdrop
                })
            })
        }
    }
    
    handleCloseSnackbar = () => {
        this.setState({
          showSucess:!this.state.showSucess
        })
    }

    handleCloseSnackbarPassWord = () => {
        this.setState({
            showSucessPasswordUpdate:false
        })
    }
      
    handleChangeAdress = user_address => {
		this.setState({ user_address:user_address });
	};
     
    render() {
        let {imagePreviewUrl, values ,profile, userResult, openBackdrop} = this.state;
        let { classes } = this.props;

        if (this.state.isLogin == false ) {
            return <Redirect to='/' />
        }

        return (  
            <>        
                <div style={{
						display:'flex',
						flexDirection: "row",
						alignItems: "center",
                        justifyContent: "flex-start",
                        marginTop: 80,
                        marginLeft: 12,
						}}> 
						
                        <div 
                        style={{
								marginRight: 16,
								cursor: 'pointer',
							}}>
								
							<Link
								to={`/customer`}
								style={{
									textDecoration: "none",
									marginRight: 10,
								}}>
								<ArrowBackIcon color='primary' />
							</Link>
						</div>
						
						<div>
							<h2> Edit profile </h2>
						</div>
                </div>
                
                <div className="contentBoxInfo"
                style={{
                    marginTop: 90,
                    marginLeft: 20,
                    marginRight: 20,
                    display:"flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}>
              
                
                <Backdrop className={classes.backdrop} open={openBackdrop} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                
                <CardContent className={classes.content}>
                {
                    this.state.showSucess == true ? 
                    <Alert onClose={this.handleCloseSnackbar} severity="success">
                        Informations 're update
                    </Alert>
                    : null
                }
                        <div className="avatar">
                            
                        {
                            this.state.photo_user == '' ?
            
                            <div
                                className="imageContent"
                                style={{
                                    padding: 20
                                }}
                                onClick={() => this.fileInputForProfilePic.click()}>
                                    
                                    <Avatar 
                                        className={classes.avatar}
                                        src={icon_camera}
                                    />
                                </div> : <div
                                className="imageContent"
                                style={{
                                    padding: 20
                                }}
                                onClick={() => this.fileInputForProfilePic.click()}>
                                    <Avatar 
                                        className={classes.avatar}
                                        src={imagePreviewUrl == '' ? `http://3.12.104.179:3001/api/v2/api/path?img_profil=${this.state.photo_user}`: imagePreviewUrl }    
                                    />
                            </div>                         
                        }
                        
                        <Grid item xs={12}>
						<input
                            fullWidth
                            name="address"
                            onChange={this._handleImageChange}  
                            type="file"
                            id='file'
                            ref={fileInputForProfilePic =>
                                (this.fileInputForProfilePic = fileInputForProfilePic)
                              }
                            style={{ display: 'none' }}
                                
                         />
                        </Grid>
                        
                    </div>
                    <Typography
                        className={classes.name}
                        gutterBottom
                    >
                    {this.state.name_user} 
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="body1"
                    >
                    {this.state.email_user}
                    </Typography>

                    <div
                      style={{
                        marginTop: 40,
                        marginBottom: 20,
                        
                    }}>

                    <Grid
                            item
                            md={12}
                            xs={12}>
                            <Typography variant="body2"
                          >
                                Update password  
                            </Typography>                           
                        </Grid>
                    
                    <Grid
                            container
                            spacing={4}>
                        
                         <Grid
                                item
                                md={12}
                                xs={12} >
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password_user"
                                    onChange={this.handleChange}
                                    type="password"
                                    variant="outlined"
                                    
                                />
                        </Grid>
                        
                        <Grid
                            item
                            md={12}
                            xs={12}>
            
                            <TextField
                                fullWidth
                                label="Confirm password"
                                name="confirm_password"
                                onChange={this.handleChange}
                                type="password"
                                variant="outlined"
                                error={this.state.showPAsswordConfirmError}
                                helperText=" Confirm password can't be different than password "
                            />
                        </Grid>
                        <Grid
                         item
                            md={12}
                            xs={12}>
                        
                            {
                                this.state.showSucessPasswordUpdate == true ? 
                                <Alert onClose={this.handleCloseSnackbarPassWord} severity="success">
                                    The password have been updated
                                </Alert>
                                : null
                            }
                        </Grid>

                        <Grid>
                        {
                            this.state.password_user != '' ?
                                <CardActions>
                                    <Button onClick={this.updatePassword}
                                        type="submit"
                                        color="primary"
                                        variant="contained">
                                        Update password
                                    </Button>
                            </CardActions>
                             : null
                        }
    
                        </Grid>
                    </Grid>

                    </div>
                </CardContent>     
                

                <form onSubmit={this.handleSubmit}>
                    <CardHeader title="Profile" />                   
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={4}>

                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                        
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        name="first_name"
                                        onChange={this.handleChange}                                
                                        value={this.state.first_name}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}>
                                
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        name="last_name"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.last_name}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                        
                                    <TextField
                                        fullWidth
                                        // helperText="Please specify the first name"
                                        label="User name"
                                        name="name_user"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.name_user}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    >
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email_user"
                                                                
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChange}
                                        value={this.state.email_user}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    >


                                <PhoneInput
                                    country={'us'}
                                    value={this.state.tel_user}
                                    placeholder={'Phone number'}
                                    // onlyCountries={['ca', 'ht', 'us']}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: false
                                    }}
                                    onChange={tel_user => this.setState({ tel_user })}
                                    inputStyle={{
                                        paddding: 12,
                                        width:'100%'
                                    }}
                                />

                                </Grid>
                              
                                {/* <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    >
                                
                                    <TextField
                                        fullWidth
                                        label="Full address"
                                        name="user_address"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.user_address}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid> */}


						<Grid item xs={12}>							

                            <PlacesAutocomplete
								value={this.state.user_address}
								onChange={this.handleChangeAdress}
								onSelect={this.handleSelect}
                                // shouldFetchSuggestions={}
                                    
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
										name="user_address"
										label=" Address"
										
										{...getInputProps({
											placeholder: 'Address ',
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
            
                                {/* Check who connect to handle this  */}
                                {/* <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    >
                                    <Typography variant="h6"> Available </Typography>
                                    <Typography variant="body2">

                                        
                                    </Typography>
                                    <Switch
                                        checked={parseInt(this.state.actif_user)}
                                        color="secondary"
                                        edge="start"
                                        name="actif_user"
                                        onChange={this.handleChange}
                                    />
                                </Grid> */}
                                <Grid
                                    md={12}>
                                    <CardActions>
                                    <Button
                                        className={classes.saveButton}
                                            type="submit"
                                            color="primary"
                                        variant="contained">
                                        Save Changes
                                    </Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        
                    </CardContent>
                <Divider />         
            </form>
        </div>                                        
            </>
        )
    }
};

export default  withStyles(styles) (CustomerInfo);
