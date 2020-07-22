import React from 'react';

export default function MenuCard(props) {

  return (
    <div style = {{display: 'flex', flexDirection: 'row', height: 120, marginBottom: 15}}>

      <div style = {{marginRight: 10}}>
        <img src={props.menu.image} alt="Poisson"
            style={{width: 130, height: 130, borderRadius: 65, marginLeft: 5}}
        />
      </div>
      <div
        style = {{display: 'flex', flexDirection: 'column', marginTop: -15, width: 200 }}
      >
        <h3>{props.menu.title}</h3>
        <span style={{marginTop: -10}}>{props.menu.description}</span>
      </div>

      <div style = {{marginLeft: 120, textAlign: 'center'}}>
        <h3 style = {{backgroundColor: "#9ACD32", width: 60}}>
          {"$ " + props.menu.price}
        </h3>
      </div>
    </div>
  )

}