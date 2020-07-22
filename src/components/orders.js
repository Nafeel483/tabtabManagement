import React from 'react';
import MaterialTable from 'material-table';


export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'OrderID', field: 'orderID' },
        { title: 'Order Name', field: 'order' },
        { title: 'Customer', field: 'customer' },
        { title: 'Quantity', field: 'quantity', type: 'numeric' },
        { title: 'Price', field: 'price'},
        { title: 'Status', field: 'status'}
      ],
      data: [
        { orderID: '0001', order: 'Lalo', customer: 'Jetro', quantity: 2, price: '$30', status: 'Pending' },
        { orderID: '0002', order: 'Poisson', customer: 'Julio', quantity: 1, price: '$20', status: 'Pending' },
        { orderID: '0003', order: 'Lalo', customer: 'Randoll', quantity: 1, price: '$15', status: 'Pending' },
        { orderID: '0004', order: 'Acra', customer: 'Sandyna', quantity: 3, price: '$15', status: 'Delivered' },
        { orderID: '0005', order: 'Fritay', customer: 'Josh', quantity: 1, price: '$10', status: 'Cancelled' },

      ],
    };

  }

  render() {
    return (
      <div style = {{marginLeft: 120}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

        <h1  >Orders</h1>
        <div style = {{display: 'flex', flexDirection: 'row', marginBottom: 50}}>
          <span>Date: </span> <input type="date" name="start_date"/>
        </div>

        <div style = {{width: '90%', margin: 'auto'}}>
          <MaterialTable
            title="Orders"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    data.push(newData);
                    this.setState({ ...this.state, data });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    data[data.indexOf(oldData)] = newData;
                    this.setState({ ...this.state, data });
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({ ...this.state, data });
                  }, 600);
                }),
            }}
          />
        </div>


      </div>

    )
  }
}

