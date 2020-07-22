import React from 'react';
import axios from 'axios';
import logo from '../assets/images/logo.png';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link ,Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// var jwt_decode = require('jwt-decode');
import { urlFunction } from '../utils/urls';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { userContext } from '../utils/userContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
		<b>
        Tap tap now  management
      </b>{' '}
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
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
  });

class Login extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			email    : '',
			password : '',
			error    : false,
			button: false,
			isLogin: false,
			openBackdrop: false
		};
	}
	
	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleLoginClick = () => {

		this.setState({
			openBackdrop: true
		});

		if (this.state.name !== '' && this.state.password !== '') {

			let data = {
				email    : this.state.email,
				password : this.state.password,
			};

			axios
				.post(`${urlFunction()}/user/login`, data)
				.then((response) => {
					console.log("response",response)
					var data = response.data
					if (data) {
						localStorage.setItem('user', JSON.stringify(data));
					}
					this.setState({
						openBackdrop: !this.state.openBackdrop,
						isLogin: true
					})
				})
				.catch((error) => {
					this.setState({
						error : true,
						openBackdrop: false,
						errorMessage: 'Verify your credentials' ||error.message,
					});
					console.log("Data login", error)
				});
		}
		else {
			this.setState({
				errorMessage: 'Field can\'t  be empty ',
				openBackdrop: false,
				error : true,
			});
		}
	};

	componentDidMount = async () => {
		let user = await userContext();
		if (user !== null) {
			// setUser(JSON.parse(user))
			this.setState({
				isLogin: true
			})
		} else {
			this.setState({
				isLogin: false
			})
		}
	}


	 render() {
		let { classes } = this.props;
		if (this.state.isLogin == true ) {
			return  <Redirect to='/home' />
		}
		return (
			<Container component="main" maxWidth="xs">
				 <Backdrop className={classes.backdrop} open={this.state.openBackdrop} >
					<CircularProgress color="inherit" />
				</Backdrop>
			<CssBaseline />
			<div className={classes.paper}>
				<img src={logo} style={{width:100,}} />
			  <Typography component="h1" variant="h5">
			   Log in
			  </Typography>
				<div className={classes.form} noValidate>
				<Grid container spacing={2}>
				  <Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="email"
						label="Email address"
						name="email"
						autoComplete="email"
						value={this.state.email}
						onChange={this.handleInputChange}	
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={this.state.password}
						onChange={this.handleInputChange}	
					/>
				  </Grid>
				</Grid>
				<Button
				  type="submit"
				  fullWidth
				  variant="contained"
				  color="primary"
					className={classes.submit}
					onClick={()=>this.handleLoginClick()}
				>
					Log in
				</Button>
						
				{
					this.state.error == true ? 
						<Alert severity="error"> {this.state.errorMessage}</Alert>
					:
					null
				}
				
			   
			  </div>
			</div>
			<Box mt={5}>
			  <Copyright />
			</Box>
		  </Container>
		);
	}
 }

 export default  withStyles(styles)(Login);

