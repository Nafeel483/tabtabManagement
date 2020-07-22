import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import moment from 'moment';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  colors
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import logo from "../assets/images/logo.png";

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

const styles = theme => ({
    root: {
        marginTop: 20
    },
    content: {
      padding: theme.spacing(6),
      marginLeft: 20,
  },
  marginTop: {
    marginTop: theme.spacing(4)
  },
  dates: {
    padding: theme.spacing(2),
    backgroundColor: colors.grey[100]
    },
    tableHead: {
        backgroundColor: "#eee",
        fontSize: 8
    }
});

class InvoicesDetails extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            invoice: [{
                id: '12',
                due_date: "12/12/2029",
                issue_date: "12/12/2029",
                ref: "1w4244",
                currency: '$',
                taxes: 10,   
                subtotal: 1200,
                total: 12000,
                customer: {
                    name: "julio",
                    company: "company",
                    nzbn: "nzbn",
                    address: "address",
                }
                ,
                products: [{
                    id: 1,
                    currency: '$',
                    value: 122,
                    subtotal: 12000,                           
                    taxes: 10,                           
                    total: 120000,      
                    desc: 'Invoices  send (12/05/2019 - 11/06/2019)'
                }]
            }][0]
        }
    }

    handleClick = event => {
        // alert(event.currentTarget);
        console.log(event.currentTarget)
        // setAnchorEl(event.currentTarget);
        this.setState({anchorEl:!this.state.anchorEl})
      };
    
    handleClose = () => {
        this.setState({anchorEl:!this.state.anchorEl})
     };
    
    render() {
        const { classes } = this.props;
        const { invoice,anchorEl } = this.state;
        
        return (

            <TableContainer style={{
                marginTop: 80,
                paddingLeft: 20,
                paddingRight: 20,
                width: 1140,
                }}>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl}
                    onClose={this.handleClose}
                >
                    <StyledMenuItem>
                    <ListItemIcon>
                        <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Pay the invoice" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                    <ListItemIcon>
                        <DraftsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Report the invoice" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    </StyledMenuItem>
                </StyledMenu>
      
             <div
                 style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:"space-between"
              }}>
              
                <h2> Invoices details </h2>    
                    <Button variant="contained" color="primary"
                    onClick={this.handleClick}>
                    Options 
                </Button>    
            </div>
            <Card
            className={classes.root}>    
                <CardContent className={classes.content}>
                    <Grid
                        container
                        justify="space-between"
                    >
                        <Grid item>
                        <img src={logo} alt="Logo"
                                style={{ height: 40, marginLeft: 0, marginRight: 20}}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                align="right"
                                component="h3"
                                variant="h3"
                            >
                                PAID
                         </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        alignItems="center"
                        className={classes.marginTop}
                        container
                        justify="space-between"
                    >
                        <Grid item>
                            <Typography variant="h5">Taptap Now</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="right">
                                Invoice #{invoice.id.split('-').shift()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.marginTop}
                        container
                        justify="space-between"
                    >
                        <Grid item>
                            <Typography>
                                Street King William, 123 <br />
                                Level 2, C, 442456 <br />
                                San Francisco, CA, USA
                         </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Company No. 4675933 <br />
                                EU VAT No. 949 67545 45 <br />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="right">
                                Email: accounts@devias.io <br />
                                Tel: (+40) 652 3456 23
                         </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="space-between"
                    >
                        <Grid item>
                            <Typography
                                component="h4"
                                gutterBottom
                                variant="overline"
                            >
                                Due date
                             </Typography>
                            <Typography>
                                {moment(invoice.due_date).format('DD MMM YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                component="h4"
                                gutterBottom
                                variant="overline"
                            >
                                Date of issue
                            </Typography>
                                <Typography>
                                    {moment(invoice.issue_date).format('DD MMM YYYY')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    component="h4"
                                    gutterBottom
                                    variant="overline"
                                >
                                    Reference
                            </Typography>
                            <Typography>{invoice.ref}</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.marginTop}>
                        <Typography
                            component="h4"
                            gutterBottom
                            variant="overline"
                        >
                            Billed to
                        </Typography>
                        <Typography>
                            {invoice.customer.name} <br />
                            {invoice.customer.company} <br />
                            {invoice.customer.nzbn} <br />
                            {invoice.customer.address} <br />
                        </Typography>
                    </div>
                    <Table className={classes.marginTop}>
                            <TableRow className={classes.tableHead}>
                                <TableCell>Description</TableCell>
                                <TableCell />
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableBody>
                            {invoice.products.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.desc}</TableCell>
                                    <TableCell />
                                    <TableCell align="right">
                                        {invoice.currency}
                                        {product.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell />
                                <TableCell>Subtotal</TableCell>
                                <TableCell align="right">
                                    {invoice.currency}
                                    {invoice.subtotal}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell />
                                <TableCell>Taxes</TableCell>
                                <TableCell align="right">
                                    {invoice.currency}
                                    {invoice.taxes}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell />
                                <TableCell>Total</TableCell>
                                <TableCell align="right">
                                    {invoice.currency}
                                    {invoice.total}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className={classes.marginTop}>
                        <Typography
                            component="h4"
                            gutterBottom
                            variant="overline"
                        >
                            Notes
                        </Typography>
                        <Typography>
                            Please make sure you have the right bank registration number as I
                            had issues before and make sure you guys cover transfer expenses.
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            </TableContainer>
      
            );
        };
    }
                
export default  withStyles(styles) (InvoicesDetails);
