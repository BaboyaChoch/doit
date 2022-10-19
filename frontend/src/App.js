import logo from './logo.svg';
import './App.css';
import {Button, Grid} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        height: "100vh",
        width: "100vh",
    },
    buttons: {
        alignItems: "center",
        justifyContent: 'center',
    }
})

function App() {
    const classes = useStyles();
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item>
                <Button className={classes.buttons} variant="contained" color="secondary">Test Button</Button>
            </Grid>
        </Grid>
    );
}

export default App;
