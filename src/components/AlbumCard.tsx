import * as React from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  IconButton,
  Link,
  Tooltip
} from "@material-ui/core";
import { Explicit, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      height: 200
    },
    cardContent: {
      height: 70
    },
    icon: {
      color: "red"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    }
  })
);

interface Props {
  imgUrl: string;
  albumUrl: string;
  artistUrl: string;
  albumTitle: string;
  artist: string;
  advisoryRating: string;
  releaseDate: string;
  trackCount: number;
  genre: string;
}

const AlbumCard = (props: Props) => {
  const classes = useStyles();
  // Gets a larger album cover than the api initally provides
  const largeCover =
    props.imgUrl.substring(0, props.imgUrl.length - 13) + "200x200bb.jpg";
  const releaseYear = props.releaseDate.substring(0, 4);

  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      {/* Album artwork */}
      <CardActionArea>
        <Link href={props.albumUrl}>
          <CardMedia
            className={classes.cardMedia}
            image={largeCover}
            title={props.albumTitle}
          >
            {/* If album is explicit show icon */}
            {props.advisoryRating === "Explicit" && (
              <Tooltip title="Explicit" placement="top-start">
                <Explicit className={classes.icon} />
              </Tooltip>
            )}
          </CardMedia>
        </Link>
      </CardActionArea>
      {/* Album meta data */}
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="subtitle2">
          <Link href={props.albumUrl}>Album: {props.albumTitle}</Link>
        </Typography>
        <Typography gutterBottom variant="subtitle2">
          <Link href={props.artistUrl}>Artist: {props.artist}</Link>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      {/* Expand area album meta data */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2">Released: {releaseYear}</Typography>
          <Typography variant="subtitle2">
            Tracks: {props.trackCount}
          </Typography>
          <Typography variant="subtitle2">Genre: {props.genre}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default AlbumCard;
