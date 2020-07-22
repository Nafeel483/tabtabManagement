import React from 'react';
import BasicCard from './Cards/basicCard.js';
import MenuCard from './Cards/menuCard.js';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import image from '../assets/images/restaurant.jpeg';

export default class SuperAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coin95: {title: 'Coin 95', total: "Delmas 66, No 10"},
      Kokoye: {title: 'Kokoye', total: "Delmas 31, No 3"},
      harrys: {title: "Harry's", total: "Ave Panamericaine"},
      plaza: {title: 'Le Plaza', total: "Rue St Cyr, No 46"},
      tifani: {title: 'Tifani', total: "N/A"},
      reserve: {title: 'La Reserve', total: "Rue Rebecca PV, No 10"},
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpzZXRoamV0cm9AZ21haWwuY29tIiwidHlwZSI6IkFkbWluIiwiYXZhdGFyIjoiZGVmYXVsdC5qcGciLCJub20iOiJKb3NlcGgiLCJwcmVub20iOiJTZXRoLUpldHJvIiwiaWF0IjoxNTc0NzE1NDI0LCJleHAiOjE1NzQ5NzQ2MjR9.vWeYeuhJFpvDqJBYYML4e7M98r0_LXzBa1OjS-ipZ7Y",
      restaurant: []
    }
  }

  componentDidMount() {
    let url = "http://localhost:3001/admin/restaurant";
    fetch(url, { // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log("the response: ", response[0]);
      })
      .catch(error => {

      });
  }

  addRestaurant = () => {
    alert('trying to add a new restaurant');
  }

  render() {
    return (
      <div className="theme-cyan">
        <div className="page-loader-wrapper"
          style={{
          marginTop:100
          }}>
          
          <div className="loader">
            <div className="m-t-30">
              <img className="zmdi-hc-spin" src="assets/images/MD Ally_logos-01.png" width="60" height="60" alt="MD Ally" />

              <p>Please wait...</p>
          </div>
          </div>
      </div>
        <div style={{backgroundColor: "#eff4fd", marginTop: 20}}>
        <div
          style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', textAlign: 'center'}}
        >

          <BasicCard  content = {this.state.coin95} image = {image} changeView = {this.props.changeView}/>
          <BasicCard  content = {this.state.Kokoye} image = {image} changeView = {this.props.changeView}/>

        </div>

        <div
          style = {{display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', textAlign: 'center'}}
        >
          <BasicCard  content = {this.state.harrys} image = {image} changeView = {this.props.changeView}/>
          <BasicCard  content = {this.state.plaza} image = {image} changeView = {this.props.changeView}/>
        </div>

        <div
          style = {{display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', textAlign: 'center'}}
        >
          <BasicCard  content = {this.state.tifani} image = {image} changeView = {this.props.changeView}/>
          <BasicCard  content = {this.state.reserve} image = {image} changeView = {this.props.changeView}/>
        </div>

        <div
          style = {{marginRight: 20, marginBottom: 20, position: 'absolute', bottom:0,
          right:0}}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={() => this.addRestaurant()}/>
          </Fab>
        </div>

      </div>
      </div>
    );
      }
    
    }
    
    
