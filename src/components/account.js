import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount() {
    let url = "http://localhost:3001/admin/users";

    fetch(url, { // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log("the response: ", response);
      })
      .catch(error => {

      });
  }


  render() {
    return (
      <div style={{backgroundColor: "#eff4fd", marginTop: 20}}>
        <div
          style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', textAlign: 'center'}}
        >
          <h1>Users</h1>

        </div>

        <div
          style = {{display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', textAlign: 'center'}}
        >

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
    );
  }

}


