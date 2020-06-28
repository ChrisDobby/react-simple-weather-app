import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import WeatherCard from "./weatherCard";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
    },
    containerGrid: {
        flex: 1,
        overflowY: "auto",
        padding: "2em",
    },
    addButton: {
        position: "absolute",
        margin: "1em",
        right: 0,
        bottom: 0,
    },
}));

const LOCAL_STORAGE_KEY = "locations";
function saveToLocalStorage(locations) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}

function readFromLocalStorage() {
    const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLocations ? JSON.parse(storedLocations) : [];
}

function App() {
    const classes = useStyles();
    const [weatherLocations, setWeatherLocations] = React.useState(readFromLocalStorage());

    const handleAddClick = () => setWeatherLocations([...weatherLocations, ""]);

    const updateLocations = locations => {
        setWeatherLocations(locations);
        saveToLocalStorage(locations);
    };

    const removeAtIndex = index => () =>
        updateLocations(weatherLocations.filter((_, locationIndex) => locationIndex !== index));

    const updateAtIndex = index => updatedLocation =>
        updateLocations(
            weatherLocations.map((location, locationIndex) => (locationIndex === index ? updatedLocation : location)),
        );

    const canAddOrRemove = React.useMemo(() => weatherLocations.every(location => location !== ""), [weatherLocations]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Weather
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3} className={classes.containerGrid}>
                {weatherLocations.map((location, index) => (
                    <Grid key={location} xs={12} sm={6} md={4} lg={3} item>
                        <WeatherCard
                            location={location}
                            canDelete={!location || canAddOrRemove}
                            onDelete={removeAtIndex(index)}
                            onUpdate={updateAtIndex(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Fab
                onClick={handleAddClick}
                aria-label="add weather location"
                className={classes.addButton}
                color="secondary"
                disabled={!canAddOrRemove}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}

export default App;
