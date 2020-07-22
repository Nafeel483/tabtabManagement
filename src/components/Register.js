import React, { Component } from 'react';
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
import { urlFunction } from '../utils/urls';
import Backdrop from '@material-ui/core/Backdrop';
import Alert from '@material-ui/lab/Alert';
import { userContext } from '../utils/userContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import CircularProgress from '@material-ui/core/CircularProgress';
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

class Register extends Component {
    constructor(props) {
      super(props)
      this.state = {
        showSucess: false,
        openBackdrop: false,
        tel_user: '',
        email_user: '',
        first_name: '',
        last_name: '',
        password_user:'',
        tel_user : '',
      }
    }

      
    handleCloseSnackbar = () => {
      this.setState({
        showSucess:!this.state.showSucess
      })
    }

  _handleSubmit = (e) => {
    this.setState({
			openBackdrop: !this.state.openBackdrop
		})
    e.preventDefault(); 
    let data = {
      'first_name': this.state.first_name,
      'name_user': this.state.name_user,
      'last_name': this.state.last_name,
      'email_user': this.state.email_user,
      'tel_user': this.state.tel_user,
      'password_user': 'taptapnow01@', 
    }    

    axios.post(`${urlFunction()}/user/create`, data,{
        headers : {
          Authorization  : 'bearer ' + this.state.user.token,
        },
      }
    ).then(res => {
      this.setState({
        first_name: '',
        last_name: '',
        email_user: '',
        password_user: '',
        name_user: '',
        showSucess: true,
        tel_user : '',
        openBackdrop: !this.state.openBackdrop
      })
    }).catch(err => {
      alert("This mail address 's already used")
      this.setState({
        email_user: '',
        showSucess: false,
        openBackdrop: !this.state.openBackdrop
      })
    })
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
      
  componentDidMount = async () => {
      let user = await userContext();
      if (user != null) {
        this.setState({
          user: JSON.parse(user)
        })
      } else {
        // Back him login
        this.setState({
          isLogin: false
        })
      }
  }
  
  render() {
    let {openBackdrop} = this.state
      if (this.state.isLogin == false ) {
        return  <Redirect to='/' />
      }
      let { classes } = this.props;
    return (
      <div>
        	<Backdrop className={classes.backdrop} open={openBackdrop} >
					<CircularProgress color="inherit" />
				</Backdrop>
          				
        <Grid
            alignContent={'center'}
            alignItems={'center'}
            justify={'center'}> 

          <Container component="main" maxWidth="sm" margin="auto">
            <div className={classes.paper}>
              {
                this.state.showSucess == true ? 
                <Alert onClose={this.handleCloseSnackbar} severity="success">
                  Customer have been create.
                </Alert>
                : null
              }
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Create customer
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="name_user"
                        label="User name"
                        type="text"
                        id="name_user"
                        value={this.state.name_user}
                        onChange={this.handleInputChange}
                      />
                  </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="first_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={this.state.first_name}
                        onChange={this.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="last_name"
                        autoComplete="lname"
                        value={this.state.last_name}
                        onChange={this.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email_user"
                        autoComplete="email"
                        value={this.state.email_user}
                        onChange={this.handleInputChange}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
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
                  
                  {/* 
                  <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password_user"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password_user}
                        onChange={this.handleInputChange}
                      />
                  </Grid> 
                  */}
                  
                </Grid>
                {this.state.email_user != '' ?
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this._handleSubmit}
                  >
                  Create 
                  </Button>: null
                }
                </form>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
          </Grid>
        </div>
      )
  }
}
export default  withStyles(styles)(Register);