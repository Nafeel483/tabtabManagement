 
import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Redirect } from 'react-router-dom';
import { urlFunction } from '../utils/urls';
import axios from "axios"
import { getRestaurantById,getOrdersByRestaurantId , getPaymentByRestaurantId} from '../utils/restaurantContext';
import { userContext } from '../utils/userContext';
import moment from 'moment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { profilePath, menuPath } from '../utils/img_link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';


import Select from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rootTabs: {
    flexGrow: 1,
  },
  rootList: {
    width: 800,
    height: 520,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",

  },
  table: {
    width: 1180,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },

  TableRowDesign:{
    "&:hover": {
      backgroundColor: "#eee", cursor:"pointer"
    },
},
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  paperModal: {
    position: 'absolute',
    marginLeft:"20%",
    marginTop:"5%",
    width: '60%',
    height: 700,
    backgroundColor: "#fff",
    border: 'none',
    boxShadow:"#eee",
    padding: theme.spacing(2, 4, 3),
  },
  search: {
    width: 400,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#336699', 0.15),
    '&:hover': {
      backgroundColor: fade('#336699', 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  search1: {
    width: 300,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
    elevation:6,
    '&:hover': {
      backgroundColor: fade('#FFF', 0.8),
    },
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 16,
    [theme.breakpoints.up('sm')]: {
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    marginLeft: 0,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },

  ListItemStyle: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: fade('#eee', 0.20),
      cursor: "pointer",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
   
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  inputInput1: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: 200,
    }
  }
});

class RestaurantDetails extends React.Component {  
  constructor(props) {
     super(props);
     this.state = {
       orders: [
       
       ],
       menus: [
        
       ],

       payments: [
        
       ],
       open: false,
       openDialog: false,
       currentUser: {},
       currentRestaurant: {},
       successOperation: null,
       snackbarOpen: false,
       valueTabs: 0,
       idRestaurant: this.props.idRestaurant,
       restaurant: {},
       amountAlreadyPay: 0,
       orderSelectValue: 4,
       ordersFilter:[]
     }
  }
  
  handleValueTabs = (event, valueTabs) => {
    this.setState({ valueTabs: valueTabs });
  };
  
  getmenusDetails = (user) => {
    this.setState({
      currentUser: user
    })
  }

  currentRestaurant =(restaurant) => {
    this.setState({
      currentRestaurant: restaurant
    })  
  }

  handleChangeSelectOrder = (event) => {
    let ordersFilterSelect =
      this.state.orders.filter(order => order.status_fiche == event.target.value)
  
    this.setState({
      ordersFilter: ordersFilterSelect,
      orderSelectValue: event.target.value
      })
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen:!this.state.snackbarOpen
    })
  }

  // editMenu = (menu) => {
	// 	this.setState({
	// 		currentMenu: menu,
	// 		buttonEditSubmit: true,
	// 		img_menu: menu.img_menu,
	// 		file: menu.img_menu,
	// 		name_menu: menu.name_menu,
	// 		description_menu: menu.description_menu,
	// 		prix_menu: menu.prix_menu,
	// 		amount_serve: menu.amount_serve,
	// 		id_menu: menu.id_menu,
	// 		imagePreviewUrl:  menu.img_menu,
	// 	})
	// }

  // deleteMenu = async (menu) => {
	// 	this.handleClickOpen()
	// 	this.setState({
	// 		id_menu: menu.id_menu,
	// 		currentMenu: menu,
	// 	})
  // }
  
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
    
    let restaurant = await getRestaurantById(this.props.idRestaurant);
    this.setState({
      restaurant:restaurant[0] || []
    })

    let orders = await getOrdersByRestaurantId(this.props.idRestaurant,this.state.user.token);
    this.setState({
      orders: orders || [],
      ordersFilter: orders
    })

    this.getMenusForRestaurant(this.props.idRestaurant)

    let payments = await getPaymentByRestaurantId(this.props.idRestaurant, this.state.user.token);
      
    if (payments.length > 0) {  
        this.setState({
            payments: payments || [],
            amountAlreadyPay: payments.map(el => el.amount).reduce((a, b) => a + b),
        })
    } else {
      this.setState({
          payments: payments || [],
          amountAlreadyPay: 0,    
      })
    }

  }

  render() {
    if (this.state.isLogin == false ) {
      return <Redirect to='/' />
    }
    let { customer,open , orders,close,menus,payments ,AlertTitle,successOperation,snackbarOpen, idRestaurant} = this.state
    const { classes } = this.props;
    return (
      <div>
      <TableContainer style={{
            marginTop: 80,
            paddingLeft: 20,
            paddingRight: 20,
            width: window.innerWidth - 300,
            height: window.innerHeight - 140,
        }}>

          <div
           style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between"
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
								to={`/restaurant/`}
								style={{
									textDecoration: "none",
									marginRight: 10,
								}}>
								<ArrowBackIcon color='primary' />
							</Link>
						</div>
						
						<div>
							<h2> {this.state.restaurant.name_restaurant}</h2>
						</div>
            </div>
            
        <div>
            <Link
                  to={`/edit_restaurant/${this.props.idRestaurant}`}
                  style={{
                    textDecoration: "none",
                    marginRight: 10,
                }}>
                <Button variant="contained" color="primary">
                Edit Restaurant 
                </Button>
              </Link>

              <Link
                to={`/add_menu/${idRestaurant}`}
                style={{
                  textDecoration: "none",
                  marginRight: 10,
                }}>
                <Button variant="contained" color="secondary">
                  Manage menu
                </Button>
              </Link>

            
              {orders.length > 0
                && this.state.user.data.userTypeID == 1 
                ?
                <Link
                  to={`/create_invoice/${idRestaurant}`}
                  style={{
                    textDecoration: "none",
                    marginRight: 10,
                  }}>
                  <Button variant="contained" color="primary">
                    Process payment
                </Button>
                </Link>
                : null
              }
            </div>
          </div>
      
          <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
          >        
          <div className={classes.search1}> 
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput1,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          
            </div>
            <Button variant="contained" color="primary">
            SEARCH
            </Button>
            
          </div>
        
       
          <Tabs
            value={this.state.valueTabs}
            onChange={this.handleValueTabs}
            indicatorColor="primary"
            textColor="primary"
          >

          <Tab label="Orders" />
          <Tab label="Menu"   />
          <Tab label="Payment" />
          
          </Tabs>

          {
             this.state.valueTabs == 0 ?
              <div value={this.state.valueTabs} index={1}>
                {/* ORDERS NEEDS ATTENTIONS  */}
                <ExpansionPanel
                  style={{
                    marginBottom: 20,
                 }}
                 defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  >
                  <Typography className={classes.heading}> <h3> Orders need to process </h3> </Typography>
                </ExpansionPanelSummary>
               
                  <ExpansionPanelDetails>
                    <Table component={Paper} aria-label="customized table">
                      <TableRow style={{
                        backgroundColor: "#fff"
                      }}>
                        {/* <TableCell> <b> ODERS  need attention</b> </TableCell> */}
                        
                      </TableRow>               
                      <TableRow style={{
                        backgroundColor: "#eeefff"
                      }}>
                          
                        <TableCell>  </TableCell>
                        <TableCell> Order ID </TableCell>
                        {/* <TableCell align="left">Qty</TableCell> */}
                        <TableCell align="left">Total</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Actions</TableCell>
                      </TableRow>
                      <TableBody>
                        {orders.filter(el=>el.status_fiche == 2 ) .map(order => (
                          <TableRow className={classes.TableRowDesign}
                            onClick={this.getmenusDetails.bind(this, order)}
                          key={order.id_fiche}>
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
                                      <Avatar style={{ width: 60, height: 60 }}>
                                    <img src={`${order.photo_user}` 													}
                                      style={{  height: 60 }}
                                    />
                                  </Avatar>
                                  
                                  <div style={{marginLeft: 8, fontSize: 15}}>
                                    {order.name_user} /
                                    {order.tel_user}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="left">
                            {order.id_fiche}
                            </TableCell>
                            {/* <TableCell align="left">{order.qty_total} </TableCell> */}
                            <TableCell align="left">{order.montant_transaction} $</TableCell>

                            <TableCell align="left">
                              {  
                                order.status_fiche == 2 ? ` Review. ` :  
                                order.status_fiche == 3 ? ` Ready to pickup ` :  
                                order.status_fiche == 4 ? ` Completed ` : 
                                order.status_fiche == 5 ? ` Report` :  
                                null
                              }
                            </TableCell>
                            <TableCell align="left">
                            <Link to={`/order_details/${order.id_fiche}`}>
                              <Button variant="outlined" color="primary">
                                More
                              </Button>
                            </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </ExpansionPanelDetails>
              
                </ExpansionPanel>
  
                {/* Order history */}
                <ExpansionPanel
                   defaultExpanded={true}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">                  
                  <Typography className={classes.heading}> <h3> Orders history </h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Table component={Paper} aria-label="customized table">
                      <TableRow style={{
                        backgroundColor: "#fff"
                      }}>
                        <TableCell>
                          <b> ODERS </b>
                          <Button
                            // variant="outlined"
                            color="primary"
                            startIcon={<FilterListIcon />}>
                                    
                          <Select
                              value={this.state.orderSelectValue}
                              onChange={this.handleChangeSelectOrder}
                            >
                              <MenuItem value={3}> Ready to pickup </MenuItem>
                              <MenuItem value={4}> Completed </MenuItem>
                              <MenuItem value={5}> Report </MenuItem>
                          </Select>    
                         </Button>  
                      </TableCell>
           
                  
                        
                    </TableRow>               
                      <TableRow style={{
                        backgroundColor: "#eeefff"
                      }}>   
                        <TableCell>  </TableCell>
                        <TableCell> Order ID </TableCell>
                        {/* <TableCell align="left">Qty</TableCell> */}
                        <TableCell align="left">Total</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Actions</TableCell>
                      </TableRow>
                      <TableBody>
                        {this.state.ordersFilter.map(order => (
                          <TableRow className={classes.TableRowDesign}
                            onClick={this.getmenusDetails.bind(this, order)}
                            key={order.id_fiche}>
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
                                  <Avatar style={{ width: 60, height: 60 }}>
                             
                                    <img src={`${profilePath}${order.photo_user}` 													}
                                      style={{  height: 60 }}
                                    />
                                  </Avatar>
                                  
                                  <div style={{marginLeft: 8, fontSize: 15}}>
                                    {order.name_user} /
                                    {order.tel_user}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="left">
                            {order.id_fiche}
                            </TableCell>

                            <TableCell align="left">{order.montant_transaction} $</TableCell>
                            <TableCell align="left">
                              {  
                                order.status_fiche == 2 ? ` Review. ` :  
                                order.status_fiche == 3 ? ` Ready to pickup ` :  
                                order.status_fiche == 4 ? ` Completed ` : 
                                order.status_fiche == 5 ? ` Report` :  
                                null
                              }
                            </TableCell>
                            <TableCell align="left">
                            <Link to={`/order_details/${order.id_fiche}`}>
                              <Button variant="outlined" color="primary">
                                More
                              </Button>
                            </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </ExpansionPanelDetails>
               </ExpansionPanel>        
              </div>  
              :
              this.state.valueTabs == 1 ? 
         
              <div value={this.state.valueTabs} index={0}>
              <Table component={Paper} aria-label="customized table">
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
                          <img src={`${menuPath}${menu.img_menu}` 													}
                            style={{  height: 60 }}
                          />
                        </Avatar>
                        <div
                          style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: 8,
                          }}>
                          {menu.name_menu} <br />
                        </div>
											</div>
										</TableCell>

										<TableCell align="left">{menu.description_menu} </TableCell>
										<TableCell align="left">{menu.prix_menu} $</TableCell>
										<TableCell align="left">{menu.amount_serve} units</TableCell>
										<TableCell align="left" style={{width: 180}}>
                    <Link to={`/add_menu/${this.props.idRestaurant}`}>
                        <Button variant="outlined" color="primary">
                          Manage
                        </Button>
                      </Link>
												
										</TableCell>
										</TableRow>
									))}
									</TableBody>
							
              </Table>

              </div>  
            
                :
              this.state.valueTabs == 2 ? 
              <div value={this.state.valueTabs} index={3}>
              <Table component={Paper} aria-label="customized table">
                <TableRow style={{
                  backgroundColor: "#fff"
                }}>
                  <TableCell> <b> Payment </b> </TableCell>
                  
                </TableRow>
                  
                <TableRow style={{
                    backgroundColor: "#eeefff"
                  }}>
                    
                  <TableCell>  ID </TableCell>
                  <TableCell align="left"> Date</TableCell>
                  <TableCell align="left"> Notes</TableCell>
                  <TableCell align="left"> <b>Amount</b></TableCell>
                  <TableCell align="left"> Status</TableCell>
                  <TableCell align="left"> </TableCell>
                </TableRow>
                <TableBody>
                  {payments.map(payment => (
                    <TableRow className={classes.TableRowDesign}
                      onClick={this.getmenusDetails.bind(this, payment)} >
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
                            #{payment.id_admin_payment} <br />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="left">

                        {moment(payment.date_admin_payment).format('DD/MM/YYYY HH:MM')}
                      </TableCell>
                      <TableCell align="left">{payment.notes} </TableCell>
                      <TableCell align="left"> <b>$ {payment.amount} </b> </TableCell>
                      <TableCell align="left"> 
                        
                        {payment.status_admin_payment== 1 ? 'Completed': 'Report'}

                      </TableCell>
                      {/* <TableCell align="left">
                        <Link to={`/invoices_details/${1}`}>
                          <Button variant="outlined" color="primary">
                            View
                          </Button>
                        </Link>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
                    </Table>
              </div>  
          
              : null       
          }
        </TableContainer>
      </div>
    )
  }

}
export default withStyles(styles)(RestaurantDetails);