import * as React from 'react';
import itunesAlbums from './itunesAlbums';
import AlbumTile from './AlbumTile';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList';
import axios from 'axios';

interface State {
    albums: any
}

export default class Dashboard extends React.Component {

    state: State = {
        albums: itunesAlbums.results
    }
    
    componentDidMount() {
        axios.get('http://itunes.apple.com/lookup?id=273058501&entity=album').then((res: any) => {
            const albums = res.data.results;
            this.setState({albums});
        });
    }

    render() {
        return (
            <div>
                <Grid justify="center" container spacing={4}>
                    <GridList>
                        {this.state.albums.map((album: any, index: number) =>
                            <Grid item xs={3}>
                                <AlbumTile
                                    id={index}
                                    artist={album.artistName}
                                    imgUrl={album.artworkUrl100}
                                    albumTitle={album.collectionName}
                                />
                            </Grid>
                        )}
                    </GridList>
                </Grid>  
            </div>  
        )
    }
}

