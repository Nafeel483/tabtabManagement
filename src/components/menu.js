import React, { Fragment } from 'react';
import MenuEntry from './Cards/menuEntry.js';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//import ressource
import poisson from "../assets/images/poissongrossel.jpeg";
import lalo from "../assets/images/lalo.jpeg";
import fritay from "../assets/images/fritay.jpeg";


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: 60,
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      menu: [
        {title: 'Poisson', description: 'Grossel', image: poisson, price: 35, status: 'available'},
        {title: 'Poisson', description: 'Grossel', image: poisson, price: 35, status: 'available'},
        
        { title: 'Poisson', description: 'Grossel', image: poisson, price: 35, status: 'available' },
        {title: 'Poisson', description: 'Grossel', image: poisson, price: 35, status: 'available'},
        {title: 'Lalo', description: 'Lalo Latibonit', image: lalo, price: 23, status: 'available'},
        {title: 'Lalo', description: 'Lalo Latibonit', image: lalo, price: 23, status: 'available'},
        {title: 'Fritay', description: 'griot, tassot, poulet', image: fritay, price: 10, status: 'unavailable'},
        {title: 'Fritay', description: 'griot, tassot, poulet', image: fritay, price: 10, status: 'unavailable'},
        {title: 'Fritay', description: 'griot, tassot, poulet', image: fritay, price: 10, status: 'unavailable'}

      ]
    }
  }

  addMenu = () => {
    alert('trying to add a new menu');
  }

  render() {


    const { classes } = this.props;

    return (
    <Fragment>
        <div className={classes.root}>
        {/* <MenuEntry content = {obj} key={index}/> */}
          <GridList cellHeight={190}  cols ={4}>
            <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
              <ListSubheader component="div"
            
                style={{ height: 'auto' , backgroundColor:"#fff"}}
              > List Menu </ListSubheader>
            </GridListTile>
            
            {this.state.menu.map(tile => (
              <GridListTile key={tile.image}>
                <img src={tile.image} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>{tile.price} $</span>}
                  actionIcon = {
                    <IconButton aria-label={`info about ${tile.description}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
    
        <div
          style = {{marginRight: 20, marginBottom: 20, position: 'absolute', bottom:0,
          right:0}}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={() => this.addMenu()}/>
          </Fab>
      </div>
      </Fragment>

    );
  }

}

export default withStyles(useStyles)(Menu);