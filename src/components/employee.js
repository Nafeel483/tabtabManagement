import React from 'react';

export default class Employee extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style = {{marginLeft: 100}}>
        <h1>Employees</h1>
      </div>
    )

  }
}