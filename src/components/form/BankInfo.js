import React, { Component } from 'react';
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
import { userContext, getUserById ,getBankInfoByUserId} from '../../utils/userContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import icon_camera from '../../assets/images/icon_camera.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import { urlFunction } from '../../utils/urls';
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

class BankInfo extends Component  {
    constructor(props) {
        super(props)

        this.state = {
            showSucess: false,
            openBackdrop: false,
            showPAsswordConfirmError: false,
            showSucessPasswordUpdate: false,
            userResult: {},
            bank_info: [],
            showEditOption: false,

            user_id_fk: '',
            restaurant_legal_name: '',
            tax_number: '',
            bank_routing: '',
            account_number: '',
            mailing_address: '',
            state: '',
            county_tax_rate: '',
            phone_line: '',
            id_bank_info: '',
            isAcceptContract: false,
            
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
        let bank_info_data = await getBankInfoByUserId(this.props.iduser, JSON.parse(user).token);
        
        this.setState({
            userResult: userResult,
            'photo_user': userResult.photo_user,
            'user_id_fk': userResult.id_user,
            'name_user': userResult.name_user,
            'last_name':userResult.last_name,
            'first_name': userResult.first_name,
            'email_user': userResult.email_user
        })   

        if (bank_info_data.length > 0) {
            this.setState({
                bank_info: bank_info_data[0],
                "id_bank_info": bank_info_data[0].id_bank_info,
                "restaurant_legal_name":bank_info_data[0].restaurant_legal_name,
                "tax_number": bank_info_data[0].tax_number,
                "bank_routing": bank_info_data[0].bank_routing,
                "account_number": bank_info_data[0].account_number,
                "mailing_address": bank_info_data[0].mailing_address,
                "phone_line":bank_info_data[0].phone_line || '',
                "state": bank_info_data[0].state,
                "county_tax_rate": bank_info_data[0].county_tax_rate,
                "showEditOption": true,
                "isAcceptContract": bank_info_data[0].isAcceptContract,
            })
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSaveBankInfo = e => {
        this.setState({
			openBackdrop: !this.state.openBackdrop
        })

        let {isAcceptContract,phone_line,user_id_fk,restaurant_legal_name, tax_number,bank_routing , account_number, mailing_address, state, county_tax_rate} = this.state
        e.preventDefault(); 
        
        let data = {
            user_id_fk:user_id_fk,
            restaurant_legal_name: restaurant_legal_name,
            tax_number: tax_number,
            bank_routing: bank_routing,
            account_number: account_number,
            mailing_address: mailing_address,
            county_tax_rate: county_tax_rate,
            phone_line: phone_line,
            isAcceptContract: isAcceptContract
        }
        console.log("isAcceptContract", isAcceptContract)
        axios.post(`${urlFunction()}/restaurant/user/bank_info/`, data,
        {
            headers : {
              Authorization  : 'bearer ' + this.state.user.token,
            },
          }
        )
       
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
        })
    };

    handleEditBankInfo = e => {
        this.setState({
			openBackdrop: !this.state.openBackdrop
        })

        let {isAcceptContract,id_bank_info,phone_line,user_id_fk,restaurant_legal_name, tax_number,bank_routing , account_number, mailing_address, state, county_tax_rate} = this.state
        e.preventDefault(); 
        
        let data = {
            user_id_fk:user_id_fk,
            restaurant_legal_name: restaurant_legal_name,
            tax_number: tax_number,
            bank_routing: bank_routing,
            account_number: account_number,
            mailing_address: mailing_address,
            county_tax_rate: county_tax_rate,
            phone_line: phone_line,
            id_bank_info: id_bank_info,
            isAcceptContract: isAcceptContract
        }
        axios.post(`${urlFunction()}/restaurant/user/bank_info/update`, data,
        {
            headers : {
              Authorization  : 'bearer ' + this.state.user.token,
            },
        }).then((data) => {
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
        })
    };

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
    

    handleIsAcceptContract = name => event => {
        console.log("value", event.target.checked )
        this.setState({ ...this.state.state, [name]: event.target.checked });
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
								to={`/home`}
								style={{
									textDecoration: "none",
									marginRight: 10,
								}}>
								<ArrowBackIcon color='primary' />
							</Link>
						</div>
						
						<div>
							<h2> Edit bank Informations </h2>
						</div>
                    </div>
    
                    <div className="contentBoxInfo"
                        style = {{
                            marginTop: 90,
                            marginLeft: 20,
                            marginRight: 20,
                            display:"flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >
              
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
                                >
                                    <Avatar 
                                        className={classes.avatar}
                                        src={`http://3.12.104.179:3001/api/v2/api/path?img_profil=${this.state.photo_user}` }    
                                    />
                            </div>                         
                        }    
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

                    </div>
                </CardContent>   
                    
                <form>
                    <CardHeader title="Bank informations" />                   
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
                                        label="Restaurant's legal name"
                                        name="restaurant_legal_name"
                                        onChange={this.handleChange}                                
                                        value={this.state.restaurant_legal_name}
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
                                        label="Tax Identification number"
                                        name="tax_number"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.tax_number}
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
                                        label="Banking routing"
                                        name="bank_routing"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.bank_routing}
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
                                        label="Account number"
                                        name="account_number"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.account_number}
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
                                        label="Mailing address for physical check"
                                        name="mailing_address"
                                                                
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChange}
                                        value={this.state.mailing_address}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    >

                                <span> Direct phone line </span>
                                <PhoneInput
                                    country={'us'}
                                    value={this.state.phone_line}
                                    placeholder={'Direct phone line'}
                                    // onlyCountries={['ca', 'ht', 'us']}
                                    inputProps={{
                                        name: 'phone_line',
                                        required: true,
                                        autoFocus: false,
                                        placeholder:'Direct phone line'
                                    }}
                                    onChange={phone_line => this.setState({ phone_line })}
                                    inputStyle={{
                                        paddding: 12,
                                        width:'100%'
                                    }}
                                    helperText={'to owner or operator ( not the same that is listed for the public)'}
                                    />
                                    <i> to owner or operator ( not the same that is listed for the public)</i>

                                </Grid>
                              
                              

                                <Grid
                                    item
                                    md={6}
                                    xs={6}
                                    >
                                
                                    <TextField
                                        fullWidth
                                        label="State/county tax rate"
                                        name="county_tax_rate"
                                        onChange={this.handleChange}
                                    
                                        value={this.state.county_tax_rate}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                {/* Check who connect to handle this  */}
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    >
                                    {this.state.isAcceptContract == 0 ? 
                                    <Switch
                                        checked={this.state.isAcceptContract == 1}
                                        onChange={this.handleIsAcceptContract('isAcceptContract')}
                                        color="secondary"
                                        value="isAcceptContract"
                                    
                                    />
                                    :
                                    <Switch
                                        checked={1}
                                        color="primary"
                                        value="isAcceptContract"                                        
                                    />}
                                    <b>  Contract acknowledgement </b>
                                </Grid>
                                <Grid
                                    md={12}>
                                    <CardActions>
                                        {this.state.showEditOption != true ?
                                    
                                            <Button
                                                onClick={this.handleSaveBankInfo}
                                                className={classes.saveButton}
                                                    type="submit"
                                                    color="primary"
                                                variant="contained">
                                                Save Changes
                                            </Button>
                                            :
                                            <Button
                                            onClick={this.handleEditBankInfo}
                                            className={classes.saveButton}
                                                type="submit"
                                                color="primary"
                                            variant="contained">
                                            Edit Changes
                                        </Button>}

                                     
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

export default  withStyles(styles) (BankInfo);
