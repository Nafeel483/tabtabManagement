import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 300,
  },

});

export default function MenuEntry(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <img src={props.content.image} alt="Logo"
            style={{width: 320, height: 200, margin: 'auto'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.content.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.content.description}
          </Typography>
          <Typography variant="body2" color={"red"} component="p">
            Status : {props.content.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
            Price : {props.content.price}
        </Typography>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}