import * as React from 'react';
import { useState, useEffect } from 'react';
import AlbumTile from './AlbumTile';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList';
import axios from 'axios';

const Dashboard = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get('http://itunes.apple.com/lookup?id=273058501&entity=album').then((res: any) => {
            const albums = res.data.results;
            setAlbums(albums);
        });
    });
    
    return (
        <div>
            <Grid justify="center" container spacing={4}>
                <GridList>
                    {albums.map((album: any, index: number) =>
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

export default Dashboard;

