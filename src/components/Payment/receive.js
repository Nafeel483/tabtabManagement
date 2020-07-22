import React from 'react';
import { Button, Typography, TextField, Grid} from '@material-ui/core';
import './receive.css';

export default class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows : [
        this.createData('2019-01-15', '$2036.00', '$1.50'),
        this.createData('2019-02-01', '$2110.25', '$1.50'),
        this.createData('2019-02-15', '$1500.50', '$1.50'),
        this.createData('2019-03-01', '$3450.00', '$2.00'),
        this.createData('2019-03-15', '$2300.65', '$2.50'),
        this.createData('2019-04-01', '$2500.50', '$2.50'),
        this.createData('2019-04-15', '$3350.00', '$2.50'),
        this.createData('2019-05-01', '$2430.65', '$3.00'),
        this.createData('2019-05-15', '$1200.65', '$3.50'),
        this.createData('2019-06-01', '$4300.65', '$3.50'),
        this.createData('2019-06-15', '$2300.65', '$3.50'),
      ],
      sold: '$2000.00',
      charges: '$3.50',
      button: false,
      currentDate: this.getDate(),
    }
  }


  createData = (date, payment, charges) => {
    return { date, payment, charges};
  }

  getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today
  }

  handlePayment = () => {
    alert('Process to your payment');

    let rows = [{date: this.state.currentDate, payment: this.state.sold, charges: this.state.charges}].concat(this.state.rows)
    this.setState({sold: 0, button: true, rows});

  }


  render() {
    console.log(this.state.currentDate)
    return (
      <div style = {{marginLeft: 100,}}>

        <h1>Payment</h1>
        <div style = {{display: 'flex', flexDirection: 'row'}}>
          <span>Current Sold: </span>{this.state.sold}
        </div>
        <div style = {{marginTop: 20}}>
          <Button
            disabled = {this.state.button}
            variant="contained"
            onClick={() => this.handlePayment()}
            color="primary"
          >
            Get Your Payment
          </Button>
        </div>
        <div style = {{marginTop: 30, justifyContent: 'center'}}>
          <table>
            <tr>
              <th>Date</th>
              <th>Payment</th>
              <th>Charges</th>
            </tr>
            {this.state.rows.map((obj, index) => (
              <tr>
                <td>{obj.date}</td>
                <td>{obj.payment}</td>
                <td>{obj.charges}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }

}