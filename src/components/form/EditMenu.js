import React from 'react';
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
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import logo from '../../assets/images/logo.png';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
	return (
	  <Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://material-ui.com/">
		  Tap tap now  management
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }

const styles = theme => ({
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
  
 class EditMenu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			companyName     : '',
			password        : '',
			error           : '',
			button          : false,
			file            : '',
			imagePreviewUrl : '',
		};
		this._handleImageChange = this._handleImageChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit (e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
	}

	_handleImageChange (e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file            : file,
				imagePreviewUrl : reader.result,
			});
		};

		reader.readAsDataURL(file);
	}

	 render() {
		let { classes } = this.props;
		let { imagePreviewUrl,status } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (
				<img
					src={imagePreviewUrl}
					style={{
						height       : 100,
						width        : 100,
						borderRadius : 50,
					}}
				/>
			);
		}
		return (	
			<div>
				<TableContainer style={{
					marginTop: 80,
					paddingLeft: 20,
					paddingRight: 20,
                }}>
				<div
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent:"space-between"
					}}>
					
				<h2> Edit menu </h2>    
				  
				</div>		
				<Container component="main" maxWidth="sm" style={{
					}}>

				<div className={classes.paper}>
				<Typography component="h1" variant="h5">
				</Typography>
				{ $imagePreview }
				<form className={classes.form} noValidate>
					<Grid container spacing={2} item xs={12}>
					<Grid item xs={12}>
						<InputLabel id="demo-simple-select-label">Status</InputLabel>
							<Select
								style={{
									width: '100%'
								}}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={status}
								onChange={this.handleChange}
>
							<MenuItem value={10}>Availble</MenuItem>
							<MenuItem value={20}>Unavaible</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={12} >
						<TextField
						autoComplete="fname"
						name="restaurant_name"
						variant="outlined"
						required
						fullWidth
						id="restaurant_name"
						label="Dish name"
						autoFocus
						/>
					</Grid>
											
                    <Grid item xs={12}>
						<TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="phone_number"
                            label="Dish description"
                            type="phone"
                            id="phone_number"
                            style={{textAlign: 'left'}}
                            hintText="Message Field"
                            floatingLabelText="MultiLine and FloatingLabel"
                            multiline
                            rows={3}
						/>
					</Grid>
                    
					<Grid item xs={6}>
						<TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            type="decimal"
                            id="price"
						/>
					</Grid>
								
					<Grid item xs={6}  >
						<TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="zip"
                            label="Amount serve per day"
                            name="amount"
                        />                    
					</Grid>
			
					<Grid item xs={12}>
						<TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="address"
                            label=""
                            onChange={this._handleImageChange}  
                            type="file"
                            id='file'
                         />
					</Grid>
					</Grid>
					<Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
					    Edit menu 
					</Button>
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
export default withStyles(styles) (EditMenu)