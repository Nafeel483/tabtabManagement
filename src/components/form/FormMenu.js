import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { urlFunction } from '../../utils/urls';
import { userContext } from '../../utils/userContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios"
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import icon_camera from '../../assets/images/icon_camera.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { menuPath } from '../../utils/img_link';

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
    marginRight: 40,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class FormMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: false,
      button: false,
      file: '',
      logoToSend: '',
      imagePreviewUrl: '',
      name_menu: '',
      description_menu: '',
      prix_menu: '',
      amount_serve: '',
      successForm: false,
      showSucess: false,
      openBackdrop: false,
      restaurantMenuID: this.props.idRestaurant,
      menus: [],
      buttonEditSubmit: false,
      currentMenu: {},
      id_menu: '',
      open: false,
      img_menu: '',
      imagesSelectedValue: 1,
    };
  }
  onselectImage = (item) => {

    this.setState({ img_menu: '' })
    this.setState({ imagePreviewUrl: '' })
    this.setState({ imagesSelectedValue: item })
  }
  setOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleClickOpen = () => {
    this.setOpen();
  };

  deleteMenu = async (menu) => {
    this.handleClickOpen()
    this.setState({
      id_menu: menu.id_menu,
      currentMenu: menu,
    })
  }

  deleteMenuConfirm = async () => {
    let res = await axios.delete(`${urlFunction()}/menu/${this.state.id_menu}`, {
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
      },
    })
    this.getMenusForRestaurant(this.props.idRestaurant)
    this.setState({
      open: false
    })
  }

  editMenu = (menu) => {
    this.setState({
      currentMenu: menu,
      buttonEditSubmit: true,
      img_menu: menu.img_menu.trim(),
      file: menu.img_menu,
      name_menu: menu.name_menu,
      description_menu: menu.description_menu,
      prix_menu: menu.prix_menu,
      amount_serve: menu.amount_serve,
      id_menu: menu.id_menu,
      imagePreviewUrl: ''
    })
  }

  getMenusForRestaurant = async (rest_id) => {
    let res = await axios.get(`${urlFunction()}/menu/${rest_id}`);
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

  _handleEditSubmit = (e) => {
    this.setState({
      openBackdrop: !this.state.openBackdrop,
    })
    e.preventDefault();
    const data = new FormData();
    data.append('img_menu', this.state.file || this.state.img_menu)
    data.append('name_menu', this.state.name_menu);
    data.append('description_menu', this.state.description_menu);
    data.append('actif_menu', 1);
    data.append('prix_menu', this.state.prix_menu);
    data.append('amount_serve', this.state.amount_serve);
    data.append('restaurantMenuID', this.props.idRestaurant);
    data.append('id_menu', this.state.id_menu);

    const config = {
      method: 'PUT',
      headers: {
        Authorization: 'bearer ' + this.state.user.token,
        // Accept         : 'application/json',
        // 'Content-Type' : 'multipart/form-data',
      },
      body: data,
    };

    fetch(`${urlFunction()}/menu`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          this.setState({
            img_menu: '',
            name_menu: '',
            description_menu: '',
            amount_serve: '',
            prix_menu: '',
            imagePreviewUrl: '',
            showProgress: false,
            error: false,
            showSucess: true,
            openBackdrop: !this.state.openBackdrop,
            buttonEditSubmit: false,
            messageToshow: 'Dish have been edit'
          });
          this.getMenusForRestaurant(this.props.idRestaurant)
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

  _handleSubmit = (e) => {
    this.setState({
      openBackdrop: !this.state.openBackdrop
    })
    e.preventDefault();
    const data = new FormData();
    data.append('img_menu', this.state.file)
    data.append('name_menu', this.state.name_menu);
    data.append('description_menu', this.state.description_menu);
    data.append('actif_menu', 1);
    data.append('prix_menu', this.state.prix_menu);
    data.append('amount_serve', this.state.amount_serve);
    data.append('restaurantMenuID', this.props.idRestaurant);

    const config = {
      method: 'POST',
      headers: {
        Authorization: 'bearer ' + this.state.user.token,

      },
      body: data,
    };

    fetch(`${urlFunction()}/menu`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          this.setState({
            img_menu: '',
            name_menu: '',
            description_menu: '',
            amount_serve: '',
            prix_menu: '',
            imagePreviewUrl: '',
            showProgress: false,
            error: false,
            showSucess: true,
            openBackdrop: !this.state.openBackdrop,
            messageToshow: 'Dish have been add'
          });
          this.getMenusForRestaurant(this.props.idRestaurant)
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
    console.log("Hello<<<", e.target.files[0])
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          logoToSend: file,
          img_menu: file,
        });
      };
    }

  }

  componentDidMount = async () => {
    let user = await userContext();
    if (user != null) {
      this.setState({
        user: JSON.parse(user)
      })
    } else {
      // back him login
      this.setState({
        isLogin: false
      })
    }
    this.getMenusForRestaurant(this.props.idRestaurant)
  }

  handleCloseSnackbar = () => {
    this.setState({
      showSucess: !this.state.showSucess
    })
  }

  getmenusDetails = (user) => {
    this.setState({
      currentUser: user
    })
  }

  render() {
    let { classes } = this.props;
    let { imagePreviewUrl, openBackdrop, menus } = this.state;
    console.log("My Menu are", menus)


    return (
      <div>
        <Backdrop className={classes.backdrop} open={openBackdrop} >
          <CircularProgress color="inherit" />
        </Backdrop>

        <TableContainer style={{
          marginTop: 80,
          paddingLeft: 20,
          paddingRight: 20,
          width: '100%'
        }}>
          {
            this.state.showSucess == true ?
              <Alert onClose={this.handleCloseSnackbar} severity="success">
                {this.state.messageToshow}
              </Alert>
              : null
          }



          <div style={{
            display: 'flex',
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
              <h2> 	Add menu  </h2>
            </div>
          </div>


          <Container>
            <div className="content"
              style={{
                display: 'flex',
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginLeft: '-20px'
              }}>
              <div
                style={{
                  width: '40%',
                }}>
                <Typography component="h1" variant="h5">
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={1} item xs={12}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={require('../../assets/images/acra.jpeg')}
                          onClick={() => this.onselectImage(1)}
                          style={{
                            height: 55,
                            width: 80,
                            background: "#fff",
                            cursor: 'pointer',
                            border: this.state.imagesSelectedValue == 1 && '5px solid #3f51b5',
                          }}

                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={require('../../assets/images/acra.jpeg')}
                          onClick={() => this.onselectImage(2)}
                          style={{
                            height: 55,
                            width: 80,
                            background: "#fff",
                            cursor: 'pointer',
                            border: this.state.imagesSelectedValue == 2 && '5px solid #3f51b5',
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>

                        <img
                          src={require('../../assets/images/acra.jpeg')}
                          onClick={() => this.onselectImage(3)}
                          style={{
                            height: 55,
                            width: 80,
                            overflow: 'hidden',
                            borderWidth: 10,
                            background: "#fff",
                            cursor: 'pointer',
                            border: this.state.imagesSelectedValue == 3 && '5px solid #3f51b5',
                          }}
                        />

                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={require('../../assets/images/acra.jpeg')}
                          onClick={() => this.onselectImage(4)}
                          style={{
                            height: 55,
                            width: 80,
                            background: "#fff",
                            cursor: 'pointer',
                            border: this.state.imagesSelectedValue == 4 && '5px solid #3f51b5',
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={require('../../assets/images/acra.jpeg')}
                          onClick={() => this.onselectImage(5)}
                          style={{
                            height: 55,
                            width: 80,
                            background: "#fff",
                            cursor: 'pointer',
                            border: this.state.imagesSelectedValue == 5 && '5px solid #3f51b5',
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} item xs={12}>
                      <Grid item xs={5}>
                        <Button
                          // type="submit"
                          // onClick={this._handleSubmit}
                          fullWidth
                          variant="contained"
                          color="primary"
                        >
                          Select
										</Button>
                      </Grid>
                      <Grid item xs={7}>
                        <Button
                          // type="submit"
                          onClick={() => this.fileInputFormenuPic.click()}
                          fullWidth
                          variant="contained"
                        // color="primary"
                        >
                          Upload from device
                        </Button>

                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{
                      textAlign: 'center'
                    }}>
                      {this.state.img_menu == '' ?
                        <img
                          src={require('../../assets/images/acra.jpeg')}
                          // onClick={() => this.onselectImage(4)}
                          style={{
                            height: 75,
                            width: 95,
                            borderRadius: 10,
                            background: "#fff",
                            cursor: 'pointer',
                            // border: this.state.imagesSelectedValue == 4 && '5px solid #3f51b5',
                          }} />
                        :
                        <img
                          src={imagePreviewUrl == '' ? `${menuPath}${this.state.img_menu}` : imagePreviewUrl}
                          style={{
                            height: 75,
                            width: 95,
                            borderRadius: 10,
                            background: "#fff",
                            cursor: 'pointer'
                          }}
                          onClick={() => this.fileInputFormenuPic.click()}
                          alt="Click to add image"
                        />
                      }
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                        autoComplete="fname"
                        name="name_menu"
                        variant="outlined"
                        required
                        fullWidth
                        id="name_menu"
                        label="Dish name"
                        autoFocus
                        onChange={this.handleInputChange}
                        required={true}
                        value={this.state.name_menu}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="description_menu"
                        label="Dish description"
                        type="phone"
                        id="description_menu"
                        style={{ textAlign: 'left' }}
                        hintText="Message Field"
                        floatingLabelText="MultiLine and FloatingLabel"
                        multiline
                        rows={3}
                        required={true}
                        onChange={this.handleInputChange}
                        value={this.state.description_menu}
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="prix_menu"
                        label="Price"
                        id="prix_menu"
                        required={true}
                        type='number'
                        onChange={this.handleInputChange}
                        value={this.state.prix_menu}
                      />
                    </Grid>

                    <Grid item xs={7}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="zip"
                        label="Amount serve per day"
                        name="amount_serve"
                        type='number'
                        onChange={this.handleInputChange}
                        value={this.state.amount_serve}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <input

                        onChange={this._handleImageChange}
                        type="file"
                        ref={fileInputFormenuPic =>
                          (this.fileInputFormenuPic = fileInputFormenuPic)
                        }
                        id='file'
                        style={{ display: 'none' }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {
                      this.state.buttonEditSubmit !== true ?
                        <Button
                          type="submit"
                          onClick={this._handleSubmit}
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}>
                          Create
										</Button>
                        : null
                    }

                    {
                      this.state.buttonEditSubmit == true ?
                        <Button
                          type="submit"
                          onClick={this._handleEditSubmit}
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}>
                          Edit menu
										</Button>
                        : null
                    }


                  </Grid>
                  <Link
                    to={`/restaurant_details/${this.props.idRestaurant}`}
                    style={{
                      textDecoration: "none",
                      marginRight: 10,
                      float: "right",
                      marginTop: -70,
                    }}>

                    <Button
                      type="submit"
                      fullWidth
                      color="secondary"
                      className={classes.submit}>
                      Cancel
													</Button>
                  </Link>
                </form>
              </div>

              <div
                style={{
                  width: '60%',
                }}>
                <Table className={classes.table} component={Paper} aria-label="customized table">
                  <TableRow style={{
                    backgroundColor: "#fff"
                  }}>
                    <TableCell> <b>Menu list</b> </TableCell>

                  </TableRow>

                  <TableRow style={{
                    backgroundColor: "#eeefff"
                  }}>

                    <TableCell>  Name </TableCell>
                    <TableCell align="left"> Description</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Units serve</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                  <TableBody>
                    {menus.map(menu => (
                      <TableRow className={classes.TableRowDesign}
                        onClick={this.getmenusDetails.bind(this, menu)}
                        key={menu.id_menu}>

                        <TableCell>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                          }}>
                            <Avatar style={{ width: 60, height: 60 }}>
                              <img src={`${menuPath}${menu.img_menu}`}
                                style={{ height: 60 }}
                              />
                            </Avatar>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 8,
                              }}
                            >
                              {menu.name_menu} <br />
                            </div>
                          </div>
                        </TableCell>

                        <TableCell align="left">{menu.description_menu} </TableCell>
                        <TableCell align="left">{menu.prix_menu} $</TableCell>
                        <TableCell align="left">{menu.amount_serve} units</TableCell>
                        <TableCell align="left" style={{ width: 180 }}>

                          <Fab color="primary" aria-label="edit"
                            onClick={
                              this.editMenu.bind(this, menu)
                            }>
                            <EditIcon />
                          </Fab>
                          <Fab color="secondary" aria-label="add"
                            style={{ marginLeft: '6px' }}
                            onClick={
                              this.deleteMenu.bind(this, menu)
                            }>
                            <RemoveIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </div>

            <Box mt={5}>
            </Box>
          </Container>
        </TableContainer>
        <div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClickOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Delete confirmation'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to delete {this.state.currentMenu.name_menu || ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickOpen} color="primary">
                Disagree
				</Button>
              <Button onClick={this.deleteMenuConfirm} color="primary" autoFocus>
                Agree
				</Button>
            </DialogActions>
          </Dialog>
        </div>

      </div>
    );
  }
}
export default withStyles(styles)(FormMenu)