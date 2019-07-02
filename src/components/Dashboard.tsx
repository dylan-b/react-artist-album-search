import * as React from "react";
import { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import SettingsSidebar from "./SettingsSidebar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  AppBar,
  CircularProgress,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import Settings from "@material-ui/icons/Settings";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#212121" // dark gray
  },
  icon: {
    color: "#eeeeee" // white
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  cardContent: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: "#171717" // darker gray variant of background color
  },
  progress: {
    marginLeft: "50%",
    marginTop: "20%"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [artistId] = useState("273058501"); // Kid Cudi Artist ID
  const [albums, setAlbums] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExplicit, setShowExplicit] = useState(true);

  const itunesSearchApiUrl = "http://itunes.apple.com/lookup?id=" + artistId + "&entity=album&origin=*";

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleToggleShowExplicit = () => {
    setShowExplicit(!showExplicit);
  };

  useEffect(() => {
    try {
      axios
        .get(itunesSearchApiUrl)
        .then((res: any) => {
          const albums = res.data.results;
          setAlbums(albums);
        });
    } catch (error) {
      console.log(error);
      }
  });

  return (
    <div>
      {/* Checks to see if there are any albums and if not shows a loading indicator */}
      {albums.length === 0 ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <div>
          {/* Top Bar */}
          <AppBar position="relative">
            <Toolbar className={classes.toolbar}>
              <IconButton
                onClick={handleToggleSidebar}
                className={classes.icon}
              >
                <Settings />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* Side Bar */}
          <SettingsSidebar
            sidebarOpen={sidebarOpen}
            showExplicit={showExplicit}
            toggleSidebar={handleToggleSidebar}
            toggleShowExplicit={handleToggleShowExplicit}
          />
          {/* Album Grid */}
          <main className={classes.root}>
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {albums.map(
                  (album: any, index: number) =>
                    // Checks if showExplicit is true or only shows clean albums
                    (showExplicit ||
                      (album.contentAdvisoryRating === "Clean" &&
                        !showExplicit)) && album.collectionType && (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <AlbumCard
                          imgUrl={album.artworkUrl100}
                          albumUrl={album.collectionViewUrl}
                          artistUrl={album.artistViewUrl}
                          albumTitle={album.collectionName}
                          artist={album.artistName}
                          advisoryRating={album.contentAdvisoryRating}
                          releaseDate={album.releaseDate}
                          trackCount={album.trackCount}
                          genre={album.primaryGenreName}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </Container>
          </main>
        </div>
      )}
    </div>
  );
};

export default Dashboard;