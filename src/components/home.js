import React from 'react';
import BasicCard from './Cards/basicCard.js';
import MenuCard from './Cards/menuCard.js';
import Card from '@material-ui/core/Card';

import poisson from "../assets/images/poissongrossel.jpeg";
import lalo from "../assets/images/lalo.jpeg";
import acra from "../assets/images/acra.jpeg";
import bannane from "../assets/images/bannane.jpeg";
import fritay from "../assets/images/fritay.jpeg";
import logo from "../assets/images/logo.jpg";

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {title: 'Orders', total: 2000},
      revenue: {title: 'Revenue', total: 25000},
      customer: {title: 'Customer', total: 120},
      employees: {title: 'Employees', total: 20},
      topMenu: [
        {title: 'Poisson', description: 'Grossel', image: poisson, price: 35},
        {title: 'Lalo', description: 'Lalo Latibonit', image: lalo, price: 23},
        {title: 'Fritay', description: 'griot, tassot, poulet', image: fritay, price: 10},
        {title: 'Bannane', description: 'bannane douce, boeuf en sauce', image: bannane, price: 12},
        {title: 'Acra', description: 'Acra malanga', image: acra, price: 5},

      ]
    }
  }

  render() {
    return (
      <div style={{backgroundColor: "#eff4fd", marginTop: 20}}>
        <div
          style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', textAlign: 'center'}}
        >

          <BasicCard  content = {this.state.order} image = {logo} changeView = {this.props.changeView}/>
          <BasicCard  content = {this.state.revenue} image = {logo} changeView = {this.props.changeView}/>

        </div>

        <div
          style = {{display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', textAlign: 'center'}}
        >
          <BasicCard  content = {this.state.customer} image = {logo} changeView = {this.props.changeView}/>
          <BasicCard  content = {this.state.employees} image = {logo} changeView = {this.props.changeView}/>
        </div>

        <div style = {{marginLeft: '30%'}}>
          <Card style = {{heigth: 'auto', width: 600, marginTop: 15}}>
            <h1 style = {{textAlign: 'center'}}>Top menu</h1>
              {this.state.topMenu.map((obj, index) => (
                <MenuCard menu = {obj} key= {index} />
              ))}
          </Card>
        </div>
      </div>
    );
  }

}


