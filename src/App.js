
import logo from './logo.svg';
import React, { Component } from 'react';

import './App.css';
import Login from './components/Login.js';
import Drawer from './components/Drawer.js';
import Menu from './components/menu.js';
import Employee from './components/employee.js';
import Customer from './components/customer.js';
import Main from './components/home.js';
import EditMenu from './components/form/EditMenu';
import Order from './components/orders.js';
import Account from './components/account.js';
import Payment from './components/payment.js';
import Restaurant from './components/Restaurant.js';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import Register from './components/Register';
import RestaurantDetails from './components/RestaurantDetails';
import InvoicesDetails from './components/InvoicesDetails';
import Order_details from './components/Order_details';
import Report from './components/Report';
import Photos from './components/Photos';
import Reviews from './components/review';
import FormRestaurant from './components/form/FormRestaurant';
import FormMenu from './components/form/FormMenu';
import Statistics from './components/Statistics'
import EditRestaurant from './components/form/EditRestaurant';
import CustomerInfo from './components/form/CustomerInfo';
import Interest from './components/Interest';
import Logout from './components/Logout';
import { userContext } from './utils/userContext';
import FormInvoice from './components/form/FormInvoice';
import BankInfo from './components/form/BankInfo';


class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      user: {},
      isLogin: false,
    }
  }

  componentDidMount = async () => {
    let user = await userContext();
    if (user != null) {
      this.setState({
        user: JSON.parse(user),

      })
    } else {
      // back him login
      this.setState({
        isLogin: false
      })
    }
  }

  render() {
 
    return (
      // console.log("pass user data to the component instead of call it in each component")
      <Router>
      <React.Fragment>
       
        <Route
          exact
          path="/restaurant_details/:idRestaurant"
          render={({ match }) => {
            return (
              <React.Fragment>
                <Drawer>
                  <RestaurantDetails
                    idRestaurant={match.params.idRestaurant}
                  />
                </Drawer>
              </React.Fragment>
            );
          }}
        />
        <Route
          exact
          path="/order_details/:idOrder"
          render={({ match }) => {
            return (
              <React.Fragment>
                <Drawer >
                  <Order_details
                    idOrder={match.params.idOrder}
                  />
                </Drawer>
              </React.Fragment>
            );
          }}
        />

        <Route
          exact
          path="/invoices_details/:idInvoces"
          render={({ match }) => {
            return (
              <React.Fragment>
                <Drawer >
                  <InvoicesDetails
                    idInvoces={match.params.idInvoces}
                  />
                </Drawer>
              </React.Fragment>
            );
          }}
        />

        <Route
          exact
          path='/edit_restaurant/:idRestaurant'
          render={({ match }) => {
            return (
              <Drawer>
                <EditRestaurant
                  idRestaurant={match.params.idRestaurant}
                />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/edit_menu/:idMenu'
          render={({ match }) => {
            return (
              <Drawer>
                <EditMenu
                  idMenu={match.params.idMenu}
                />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/add_menu/:idRestaurant'
          render={({ match }) => {
            return (
              <Drawer>
                <FormMenu
                  idRestaurant={match.params.idRestaurant}
                />
              </Drawer>
            )
          }}
        />
          
        <Route
          exact
          path='/create_invoice/:idRestaurant'
            render={({ match }) => {
            
            return (
              <Drawer>
                <FormInvoice
                  idRestaurant={match.params.idRestaurant} />
              </Drawer>
            )
          }}
        />
    

        <Route
          exact
          path='/'
          render={() => {
            return <Login />;
          }}
        />

        <Route
          exact
          path='/add_customer'
          render={() => {
            return (
              <Drawer>
                <Register />
              </Drawer>
            )
          }}
        />
          
        <Route
          exact
          path='/register'
          render={() => {
            return <Register />;
          }}
        />
          
        <Route
          exact
          path='/account'
          render={() => {
            return <Account />;
          }}
        />

               
        <Route
          exact
          path='/logout'
          render={() => {
            return <Logout />;
          }}
        />

          
        <Route
          exact
          path='/report'
          render={() => {
            return (
              <Drawer>
                <Report />
              </Drawer>
            )
          }}
        />
          
        <Route
          exact
          path='/payment'
          render={() => {
            return (
              <Drawer>
                <Payment />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/restaurant'
            render={() => {
            return (
              <Drawer >
                <Restaurant />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/home'
          render={() => {
            return (
              <Drawer>
                <Statistics />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/register'
          render={() => {
            return <Register />;
          }}
        />
         
        <Route
          exact
          path='/customer'
          render={() => {
                
            return (
              <Drawer>
                <Customer />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/customer_details/:iduser'
          render={({ match }) => {
            return (
              <Drawer>
                <CustomerInfo
                  iduser={match.params.iduser} />
              </Drawer>
            )
          }}
        />
          
        <Route
          exact
          path='/bank_info/:iduser'
          render={({ match }) => {
            return (
              <Drawer>
                <BankInfo
                  iduser={match.params.iduser} />
              </Drawer>
            )
          }}
        />
            
        <Route
          exact
          path='/menu'
          render={() => {
            return (
              <Drawer
                type={1}>
                <Menu />
              </Drawer>
            )
          }}
        />

        <Route
          exact
          path='/interest'
          render={() => {
            return (
              <Drawer
                type={1}>
                <Interest />
              </Drawer>
            )
          }}
        />
          
        <Route
          exact
          path='/form_restaurant'
          render={() => {
            return (
              <Drawer>
                <FormRestaurant />
              </Drawer>
            )
          }}
        />
          
        <Route
          exact
          path='/photos'
          render={() => {
            return (
              <Drawer>
                <Photos />
              </Drawer>
            )
          }}
        />
           <Route
          exact
          path='/review'
          render={() => {
            return (
              <Drawer>
                <Reviews />
              </Drawer>
            )
          }}
        />
        </React.Fragment>
      </Router>
    )
  }
}
    
export default App 