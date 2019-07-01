import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tile: {
      height: 200,
      width: 200
    }
  }),
);

interface Props {
  id: number,
  imgUrl: string
  albumTitle: string,
  artist: string
}

const AlbumTile = (props: Props) => {
  const classes = useStyles();

  return (
    <GridListTile className={classes.tile} key={props.id}>
      <img src={props.imgUrl}/>
      <GridListTileBar
        title={props.albumTitle}
        subtitle={<span>by: {props.artist}</span>}
      />
    </GridListTile>
  )
}

export default AlbumTile;