// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


// const useStyles = makeStyles({
//   card: {
//     width: 400,
//   },
//   media: {
//     height: 150,
//   },
// });

// export default function BasicCard(props) {
//   const classes = useStyles();

//   const itemClick = () => {
//     let title = props.content.title;

//     switch (title)     // Passing the variable to switch condition
//     {
//         case "Revenue":
//             props.changeView('Receive Payment')
//             break;

//         case "Orders":
//             props.changeView(title)
//             break;

//         case "Customer":
//             props.changeView('Customer Overview')
//             break;

//         //Need to change to handle more case
//         case "Coin 95":
//             props.changeView('Admin Overview')
//             break;

//         case "Employees":
//             alert('Implementing');
//             break;
//     }



//   }

//   return (


//     <Card className={classes.card}>
//       <CardActionArea>
//         <img src={props.image} alt="Logo"
//             style={{width: 400, height: 150, margin: 'auto'}}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {props.content.title}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             {"Total " + props.content.title}: {props.content.total}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button
//           size="small"
//           color="primary"
//           onClick={() => itemClick()}
//         >
//           {props.content.title + " Details"}
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }