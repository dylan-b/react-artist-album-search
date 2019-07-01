import * as React from 'react';
import { useState, useEffect } from 'react';
import AlbumTile from './AlbumCard';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
    
    const useStyles = makeStyles((theme: Theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        cardContent: {
          flexGrow: 1,
        }
      }));
      
      
      const Dashboard = () => {
        const classes = useStyles();

        const [albums, setAlbums]: any = useState([]);

        useEffect(() => {
            axios.get('http://itunes.apple.com/lookup?id=273058501&entity=album').then((res: any) => {
                const albums = res.data.results;
                setAlbums(albums);
            });
        });
      
        return (
          <div>
            <CssBaseline />
            <AppBar position="relative">
            </AppBar>
            <main>
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                  {albums.map((album: any, index: number) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <AlbumTile
                        imgUrl={album.artworkUrl100}
                        albumTitle={album.collectionName}
                        artist={album.artistName}
                        explicit={false}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>
          </div>
        );
    }

export default Dashboard;

