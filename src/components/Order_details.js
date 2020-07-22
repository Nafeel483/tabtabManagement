import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { urlFunction } from '../utils/urls';
import axios from "axios"
import { getOrderMenuByIdFicheOrder } from '../utils/restaurantContext';
import { userContext } from '../utils/userContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField, TableContainer,
  Paper,

} from '@material-ui/core';



import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import EditIcon from '@material-ui/icons/Edit';
import Backdrop from '@material-ui/core/Backdrop';
const styles = theme => ({
  root: {},
  backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
    },
   
    cardWidth: {
        width: window.innerWidth /2 -50,
        marginRight: 20,
  },
  table: {
    width: window.innerWidth / 2 ,
  }
})

class Order_details extends Component {
    constructor(props) {
        super(props)
      this.state = {  
          customer: {},
          restaurant:{},
          order: {},
        menus: [],
        comment: '',
        openBackdrop: false,
        showSucess: false,
        amountReduce: 0
        }
    }
  
    handleChange = (event)=> {
      this.setState({
        status_fiche: event.target.value
      })
    }
  
    handleChangeComment = (event) => {
      this.setState({
        comment: event.target.value
      })
    }


  updateFicheOrder = async () => {
    this.setState({
			openBackdrop: !this.state.openBackdrop
		})
    let data = {
      id_fiche: this.props.idOrder,
      status_fiche: this.state.status_fiche,
      comment: this.state.comment,
      email_user: this.state.user.data.email_user,
      username: this.state.user.data.name_user || this.state.user.data.first_name
    }
    let res = await axios.put(`${urlFunction()}/restaurant/order/update`, data,{
			headers : {
			  Authorization  : 'bearer ' + this.state.user.token,
			},
    })
    if (res.data != null) {
      this.setState({
        openBackdrop: !this.state.openBackdrop,
        showSucess: true
      })
      this.loadData()
    }
	}
    
  handleCloseSnackbar = () => {
    this.setState({
      showSucess:!this.state.showSucess
    })
  }

  componentDidMount = async () => {
    this.loadData()
  }

  loadData = async() => {
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

    let menus = await getOrderMenuByIdFicheOrder(this.props.idOrder,this.state.user.token);
    this.setState({
      menus: menus || [],
      order:  menus[0],
      customer:  menus[0],
      restaurant: menus[0],
      amountReduce: menus.map(el => parseFloat(el.price_order * el.qty_order)).reduce((a,b)=> a + b)
    })
  }
  
  
  render() {   
    const { classes } = this.props;
    let { order, option, menus, customer, restaurant, openBackdrop} = this.state;

    let options = [
          { code: 2, value: "Review" },
          { code: 3, value: "Ready to pickup" },
          { code: 4, value: "Completed" },
          { code: 5, value: "Report" },
      ];
      return (
            <TableContainer style={{
                marginTop: 80,
                paddingLeft: 20,
                paddingRight: 20,
                width: window.innerWidth - 300,
                height: window.innerHeight - 140,
          }}>
            
            <Backdrop className={classes.backdrop} open={openBackdrop} >

            <CircularProgress color="inherit" />
           
				</Backdrop>
            
  
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
								to={`/restaurant_details/${restaurant.id_restaurant}`}
								style={{
									textDecoration: "none",
									marginRight: 10,
								}}>
								<ArrowBackIcon color='primary' />
							</Link>
						</div>
						
						<div>
            <h2> Order #{this.props.idOrder }</h2>            

						</div>
          </div>	
          


            
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems:'flex-start'
                }}>
            <Card className={classes.cardWidth}>
            {
                this.state.showSucess == true ? 
                <Alert onClose={this.handleCloseSnackbar} severity="success">
                  Order status have been update
                </Alert>
                : null
              }
              
                    <CardHeader title="Order info" />
                    <Divider />
                    <CardContent className={classes.content}>
                        <Table>
                        <TableBody>
                            <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>
                                <Link
                                component={RouterLink}
                                to="/management/customers/1"
                                >
                                {customer.name_user}
                                </Link>
                                <div>{customer.tel_user}</div>
                                <div>{customer.email_user}</div>

                            </TableCell>
                            </TableRow>
                            <TableRow selected>
                            <TableCell>ID</TableCell>
                            <TableCell>#{order.ficheOrderID}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>Ref</TableCell>
                            <TableCell>{order.ficheOrderID * 123}</TableCell>
                            </TableRow>
                            <TableRow selected>
                            <TableCell>Date</TableCell>
                            <TableCell>
                                {moment(order.created_fiche).format('DD/MM/YYYY HH:MM')}
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>Promotion Code</TableCell>
                            <TableCell>{order.promoCode ? order.promoCode : 'N/A'}</TableCell>
                            </TableRow>
                            <TableRow selected>
                            <TableCell>Amount</TableCell>
                            <TableCell>
                              $ {this.state.amountReduce}
                            </TableCell>
                    
                      </TableRow>
                        <TableRow>
                        <TableCell>Tax</TableCell>
                          <TableCell>
                            {restaurant.tax} %
                          </TableCell>
                        </TableRow>

                        <TableRow>
                        <TableCell>Final Total</TableCell>
                          <TableCell>
                          $ {parseFloat(order.montant_transaction)} 
                          </TableCell>
                        </TableRow>

                        <TableRow>
                      <TableCell>Status</TableCell>
                      
                      {order.status_fiche == 2 ?
                        <TableCell>
                          <TextField
                            fullWidth
                            name="status_fiche"
                            onChange={this.handleChange}
                            select
                            // eslint-disable-next-line react/jsx-sort-props
                            SelectProps={{ native: true }}
                            value={option}
                            variant="outlined" >

                            {options.map(option => (
                              <option
                                    
                                key={option.code}
                                value={option.code}
                              >
                                {option.value}
                              </option>
                            ))}
                          </TextField>
                        </TableCell>
                        :order.status_fiche == 3 ?
                        <TableCell>
                          <TextField
                            fullWidth
                            name="status_fiche"
                            onChange={this.handleChange}
                            select
                            // eslint-disable-next-line react/jsx-sort-props
                            SelectProps={{ native: true }}
                            value={option}
                            variant="outlined" >
                          

                          
                            {options.map(option => (
                              <option
                                    
                                key={option.code}
                                value={option.code}
                              >
                                {option.value}
                              </option>
                            ))}
                          
                          
                          </TextField>
                        </TableCell>
                          :
                          <TableCell> {
                            order.status_fiche == 2 ? ` Review. ` :
                              order.status_fiche == 3 ? ` Ready to pickup ` :
                                order.status_fiche == 4 ? ` Completed ` :
                                  order.status_fiche == 5 ? ` Report` :
                                    null
                          }
                          </TableCell>
                        }

                         </TableRow>
                     
                    <TableRow>
                      <TableCell> Comment  </TableCell>
                      <TableCell>
                          <TextField
                            fullWidth
                            name="comment"
                            placeholder={order.comment}
                            onChange={this.handleChangeComment}
                          />

                        </TableCell>
                        </TableRow>

                        </TableBody>
                      </Table>
                </CardContent>
                {
                  order.status_fiche == 2 ?
                  <CardActions className={classes.actions}>
                    <Button
                      variant="contained"
                      onClick={this.updateFicheOrder} color='primary' >
                      <EditIcon className={classes.buttonIcon} />
                        Take care of this order 
                    </Button>
                    
                  </CardActions> :
                    order.status_fiche == 3 ?
                    <CardActions className={classes.actions}>
                    <Button
                      variant="contained"
                      onClick={this.updateFicheOrder} color='primary' >
                      <EditIcon className={classes.buttonIcon} />
                        Take care of this order 
                    </Button>
                  </CardActions> :                
                 null
              }
              
                </Card>

                <Table className={classes.table} component={Paper} aria-label="customized table">
                <TableRow style={{
                  backgroundColor: "#fff"
                }}>
                  <TableCell> <b>Order Items</b> </TableCell>
                 
                </TableRow>
                  
                <TableRow style={{
                  backgroundColor: "#eeefff"
                }}>
                    
                  <TableCell>  Name </TableCell>
                  <TableCell align="left"> Description</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Total</TableCell>
                </TableRow>
                <TableBody>
                  {menus.map(menu => (
                    <TableRow className={classes.TableRowDesign}
                      >
                      <TableCell>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                          <Avatar style={{ width: 60, height: 60 }}>
                            <img src={`http://localhost:3001/api/v2/api/path?img_menu=${menu.img_menu}`}
                              style={{ height: 60 }}
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
                      <TableCell align="left">{menu.qty_order} </TableCell>
                      <TableCell align="left">{menu.price_order} $</TableCell>
                      <TableCell align="left">{ parseFloat(menu.price_order) * parseFloat(menu.qty_order)} $</TableCell>
        
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            </TableContainer>
        );
    }
};
export default withStyles(styles)(Order_details)
