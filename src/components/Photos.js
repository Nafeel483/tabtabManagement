
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { userContext , getUserById} from '../utils/userContext';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import { Link, Redirect } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import icon_camera from '../assets/images/icon_camera.png';
import tkp from '../assets/images/tkp.png';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import { urlFunction } from '../utils/urls';
import { menuPath } from '../utils/img_link';
import {Table, Paper, Avatar,Button }from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    marginLeft:"33%",
    marginTop:"5%",
    width: '33%',
    height: 540,
    backgroundColor: "#fff",
    border: 'none',
  }
});

class Photos extends Component {
    constructor(props) {
        super(props)
        this.state = {
          user: {},
          userResult: {},
          photos: [],
          open: false,
          imagePreviewUrl: '',
          value: '',
          copied: false,
          openAlert: false,
          showSucess: false,
          openBackdrop: false,
        }
    }

    getPhotos = async () => {
        let result = await axios.get(`${urlFunction()}/photo`);
        if (result.data.length > 0) {
            this.setState({
                photos: result.data.reverse() || []
            })
        }
    }

    deletePhoto = async (photo) => {
        this.setState({
          openBackdrop: !this.state.openBackdrop
        })
       
        const config = {
          method  : 'DELETE',
          headers : {
            Authorization  : 'bearer ' + this.state.user.token,
          },
        };
       
        fetch(`${urlFunction()}/photo/${photo.photos_id}`, config)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data) {
              this.setState({
               label:'',
               imagePreviewUrl:'',
               showProgress: false,
               showSucess: true,
               openBackdrop: !this.state.openBackdrop,
               messageToshow: 'Delete'
              });
              this.getPhotos()
            }
          })
          .catch((err) => {
            this.setState({
              showProgress: false,
              error: true,
              errorMessage: err.message,
              openBackdrop: !this.state.openBackdrop
            });
          });
    }


    setSelectedDate = (date) => {
        this.setState({ selectedDate: date })
    }

    handleOpen = () => {
        this.setState({
            open:!this.state.open
        })
    };

    addPhotoModal = () => {
        this.setState({
            open:!this.state.open  
        })
    }


  _handleSubmit = (e) => {
		this.setState({
		   openBackdrop: !this.state.openBackdrop
    })
    
		e.preventDefault();
	   const data = new FormData();
	   data.append('path',this.state.file)
	   data.append('label', this.state.label);
	   
	   const config = {
		   method  : 'POST',
		   headers : {
			   Authorization  : 'bearer ' + this.state.user.token,
		   },
		   body    : data,
     };
		
	   fetch(`${urlFunction()}/photo`, config)
		   .then((response) => {
			   return response.json();
		   })
       .then((data) => {
         
			   if (data) {
				   this.setState({
            label:'',
						imagePreviewUrl:'',
						showProgress: false,
						showSucess: true,
					  openBackdrop: !this.state.openBackdrop,
					  messageToshow: 'Photo have been add'
				   });
				   this.getPhotos()
			   }
		   })
		   .catch((err) => {
			   this.setState({
				   showProgress: false,
				   error: true,
				   errorMessage: err.message,
				   openBackdrop: !this.state.openBackdrop
			   });
		   });
	  }

    componentDidMount = async () => {
        let user = await userContext();
        if (user !== null) {
            this.setState({
                user: JSON.parse(user),
                isLogin: true,
            })
        } else {
            this.setState({
                isLogin: false
            })
        }
    
        let userResult = await getUserById(JSON.parse(user).data.id_user, JSON.parse(user).token);
        if (userResult.is_first_time_login == 0) {
            this.setState({
                isFirstTime: true
            })
        }
        this.getPhotos()
    }
     
    handleCloseSnackbar = () => {
      this.setState({
        showSucess:!this.state.showSucess
      })
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

    
    render() {
        let { classes } = this.props
        let { openBackdrop,openAlert, imagePreviewUrl, photos, open} = this.state

        if (this.state.isLogin == false) {
            return <Redirect to='/' />
        }

        if (this.state.isFirstTime == true) {
            return <Redirect to={`/customer_details/${this.state.user.data.id_user}`} />
        }
        
        return (
            <TableContainer style={{
              marginTop: 80,
              paddingLeft: 20,
              paddingRight: 20,
              width: window.innerWidth - 300,
        }}>

          <Backdrop className={classes.backdrop} open={openBackdrop} >
           <CircularProgress color="inherit" />
          </Backdrop>
        
             
          <div
           style={{
            display: "flex",
            flexDirection: "row",
              alignItems: "center",
            justifyContent:"space-between"
          }}>         
            <h2> Photos </h2>
              
              {this.state.user.data ?
                this.state.user.data.userTypeID == 1 ?
                  <Button variant="contained" color="primary"
                    startIcon={<Add />}
                    onClick={this.addPhotoModal}>
                    Add photo
                   </Button> : null
                : null
              }
            </div>
            
          <Collapse in={openAlert}>
                <Alert
                  action={
                  <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            this.setState({
                              openAlert: false
                            })
                          }}
                  >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Copied
            </Alert>
          </Collapse>
            <Table
              component={Paper}
              aria-label="customized table">
              <TableRow style={{
                backgroundColor: "#fff"
              }}>
                <TableCell> <b> List pictures  </b> </TableCell>
  
                <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>                  
                  <TableCell>
                  </TableCell>
              </TableRow>
            
              <TableRow style={{
                backgroundColor: "#eeefff"
              }}>
                <TableCell>   </TableCell>
                <TableCell align="left"> Name </TableCell>
                <TableCell align="left"> Link 
                </TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
              <TableBody>
                {photos.map(pho => (
                  <TableRow
                    className={classes.TableRowDesign}
                    style={{
                    }}>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <Avatar
                              style={{
                                width: 130,
                                height: 130
                            }} >
                            <img src={`${menuPath}${pho.img_menu}`}
                              style={{
                                  width: 130,
                                  height: 130
                            }} />
                        </Avatar>
                      </div>
                    </TableCell>

                    <TableCell align="left"> {pho.label} </TableCell>

                    <TableCell align="left">
                      {`${menuPath}${pho.img_menu}`}
                      <CopyToClipboard text={`${menuPath}${pho.img_menu}`}
                        onCopy={() => this.setState({
                          copied: true,
                          openAlert: true
                        })}>
                        <Button
                           color="primary">
                          Copy
                        </Button>
                      </CopyToClipboard>
                    </TableCell>
                    <TableCell align="left">
                    {this.state.user.data ?
                      this.state.user.data.userTypeID == 1 ?
              
                        <Fab color="secondary" aria-label="add"
                            style={{marginLeft: '6px'}}
                            onClick={
                                this.deletePhoto.bind(this, pho)
                            }>
                            <RemoveIcon />
                        </Fab>	
                     
                        : null
                      : null
                      }
                         </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      
          <Modal
            open={open}
            onClose={this.handleOpen}
            style={{
                boxShadow: '0px 2px 0px 3px #ccc',
            }}
            >

            <div className={classes.paperModal}
                style={{
                      boxShadow: '0px 0px 2px #eee',
                    }}>
                    <div style={{
                      backgroundColor: '#0f4c9b',
                      padding: 12,
                  }}>
                                
                  <div
                      style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                      }}>
                
                        <div className={classes.search1}>
                            <Typography variant="h5" component="h2"
                                style = {{
                                    marginLeft: 16,
                                    color: '#fff',
                                    fontSize: 15,
                                }}> 
                                Add a picture 
                            </Typography>
                        </div>
                    </div>     
                </div> 
                        
                <div
                    style={{
                        marginTop: 20,
                        width: '100%',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent:'center'
                  }}>       
                  <div
                    style={{
                      backgroundColor: '#fff',                  
                    }}>
                        <img
                            src={imagePreviewUrl == '' ? tkp:imagePreviewUrl}
                            style={{
                              padding:10,
                              height       : 260,
                              width: 260,	
                              borderRadius:150,
                              background:"#336699",
                              cursor:'pointer'
                          }}
                          onClick={() => this.fileInputFormenuPic.click()}
                          alt="Click to add image"
                        />	
                    
                      <img
                          src={icon_camera}
                          style={{
                              height       : 40,
                              width: 40,	
                              borderRadius: 40,
                              padding: 5,
                              border: '2px solid #eee',
                              cursor:'pointer'
                          }}
                          onClick={() => this.fileInputFormenuPic.click()}
                          alt="Click to add image"
                      />	
                    </div>
                        <div
                            style={{
                                width: '90%'
                            }}> 
                                
                            <TextField
                                autoComplete="fname"
                                name="label"
                                variant="outlined"
                                required
                                fullWidth
                                id="label"
                                label="Photo label"
                                autoFocus
                                onChange={this.handleInputChange}
                                required={true}
                                value={this.state.label}
                                style={{
                                    marginTop:10,
                                    marginLeft:10,
                                    marginRight:10,
                                }}
                                />
                            </div>

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
                            {
                              this.state.showSucess == true ? 
                                <Alert onClose={this.handleCloseSnackbar} severity="success">
                                  {this.state.messageToshow}
                                </Alert>
                              : null
                            }
                            
                            {this.state.imagePreviewUrl !== '' ? 
                                <div
                                style={{
                                        width: '40%',
                                    marginTop: 20,
                                    marginLeft: 8,
                                }}> 
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this._handleSubmit}>
                                    Add photo 
                                </Button>
                                </div>
                                : null
                                }
					
                              {
                                this.state.error == true ? 
                                  <Alert severity="error"> {this.state.errorMessage}</Alert>
                                :
                                null
                                              }
                                              {
                                this.state.success == true ? 
                                  <Alert severity="success"> Photo add successfully </Alert>
                                :
                                null
                              }
                    </div>
                </div>
            </Modal>
           
                
          </TableContainer>
       

        )
      }
  };
  
  export default withStyles(styles) (Photos)
