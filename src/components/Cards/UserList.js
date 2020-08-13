import React, { Component } from 'react'

import {Table, Paper, Avatar,Button }from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import ImageIcon from '@material-ui/icons/Image';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { lighten, makeStyles, fade, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { CSVLink } from "react-csv";
const styles = theme => ({
    rootList: {
      width: '100%',
      height: 520,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
  
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  
    TableRowDesign:{
      "&:hover": {
        backgroundColor: "#eee", cursor:"pointer"
      },
  },
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    paperModal: {
      position: 'absolute',
      marginLeft:"20%",
      marginTop:"5%",
      width: '60%',
      height: 700,
      backgroundColor: "#fff",
      border: 'none',
    },
    search: {
      width: 400,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('#336699', 0.15),
      '&:hover': {
        backgroundColor: fade('#336699', 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    search2: {
      width: '80%',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#FFF',
      elevation:6,
      '&:hover': {
        backgroundColor: fade('#FFF', 0.8),
      },
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginTop: 16,
      [theme.breakpoints.up('sm')]: {
      },
    },
    search1: {
      width: '100%',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#FFF',
      elevation:6,
      '&:hover': {
        backgroundColor: fade('#FFF', 0.8),
      },
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginTop: 16,
      [theme.breakpoints.up('sm')]: {
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      marginLeft: 0,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
  
    ListItemStyle: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        backgroundColor: fade('#eee', 0.20),
        cursor: "pointer",
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
     
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 400,
      },
    },
    inputInput1: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('md')]: {
        width: 200,
      }
    }
});
  
export class UserList extends Component {
    constructor(pros) {
        super(pros)
        // console.log("tt", this.props.customerOwner)
        let customers = this.props.customerOwner
        let customerToCsv = [];
        
        for(let cus in  customers) {
          delete customers[cus].password_user;
          customerToCsv.push(customers[cus])
        }

        this.state = {
          customerToCsv: customerToCsv
        }
    }

    render() {
        const { classes} = this.props;
        return (
            <>
            <Table component={Paper} aria-label="customized table">
              <TableRow style={{
                backgroundColor: "#fff"
              }}>
                <TableCell> <b>Restaurant owner List</b> </TableCell>
  
                <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  
                  <TableCell>
                    <Button variant="contained" color="secondary">
                      <CSVLink
                        data={this.state.customerToCsv}
                        style={{
                          color: "#fff",
                          listStyleType:'#fff'
                      }}
                      > Download owner CSV </CSVLink>
                    </Button>
                   
                  </TableCell>
              </TableRow>
            
              <TableRow style={{
                backgroundColor: "#eeefff"
              }}>
                <TableCell>  Name </TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone number</TableCell>

                <TableCell align="left">Actions</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
              <TableBody>
                {this.props.customerOwner.map(user => (
                  <TableRow
                    className={classes.TableRowDesign}
                    // onClick={() =>
                    //   // this.getUser(user)
                    //   user.restaurant_owner == 0 ? this.getUser(user) : alert("Already manage a restaurant")
                    // }
                    style={{
                      backgroundColor: user.restaurant_owner == 1 ? '#eee' : null,
                    }}>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: 8,
                          }}>
                          {user.name_user}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="left"> {user.email_user} </TableCell>
                    <TableCell align="left"> {user.tel_user} </TableCell>
                    <TableCell align="left">
                      <Link to={`customer_details/${user.id_user}`}>
                        <Button variant="outlined" color="primary">
                          View
                    </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                        <Button variant="contained" color="secondary" >
                          Delete
                       </Button>
                    </TableCell>
                    <TableCell align="left">
                        <Button variant="contained" color="primary" >
                          Suspend
                       </Button>
                    </TableCell>
                    <TableCell align="left">
                        <Button variant="contained" color="primary" >
                          Cancel
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           
            {/* <TablePagination
              rowsPerPageOptions={[20]}
              component="div"
              count={Math.ceil(countUser / 20)}
              rowsPerPage={1}
              page={this.state.setPage}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              /> */}
           </>      
          
        )
    }
}

export default withStyles(styles)(UserList);