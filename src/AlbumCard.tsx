import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    cardMedia: {
      paddingTop: '56.25%'
    },
    icon: {
      color: 'red'
    }
  }),
);

interface Props {
  imgUrl: string,
  albumUrl: string
  artistUrl: string,
  albumTitle: string,
  artist: string,
  advisoryRating: string
}

const AlbumCard = (props: Props) => {
  const classes = useStyles();
  const largeCover = props.imgUrl.substring(0, props.imgUrl.length - 13) + '200x200bb.jpg';
  
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={largeCover}
          title={props.albumTitle}
        >
        </CardMedia>
      </CardActionArea>
      <CardContent>
      <Typography gutterBottom component="h6">
        <Link href={props.albumUrl}>
          Album: {props.albumTitle}
        </Link>
      </Typography>
      <Typography gutterBottom component="h6">
        <Link href={props.artistUrl}>
          Artist: {props.artist}
        </Link>
      </Typography>
      </CardContent>
    </Card>
            
  )
}

export default AlbumCard;