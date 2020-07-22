import React from 'react';

export default function CustomersCard(props) {

  return (
    <div style = {{display: 'flex', flexDirection: 'row', height: 120, marginBottom: 15}}>

      <div style = {{marginRight: 10}}>
        <img src={props.customer.image} alt="Poisson"
            style={{width: 100, height: 100, borderRadius: 60, marginLeft: 5}}
        />
      </div>
      <div
        style = {{display: 'flex', flexDirection: 'column', marginTop: -15, width: 200 }}
      >
        <h3>{props.customer.lastname}</h3>
        <span style={{marginTop: -10}}>{props.customer.firstname}</span>
      </div>

      <div style = {{marginLeft: 120, textAlign: 'center'}}>
        <h3 style = {{backgroundColor: "#9ACD32", width: 200}}>
          {"Total Achat: $ " + props.customer.totalAchat}
          <br/>{"Total Orders: " + props.customer.totalOrders}
        </h3>
      </div>
    </div>
  )

}