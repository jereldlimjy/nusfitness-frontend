import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
        marginTop: theme.spacing(2)
    }
}));

const Home = ({ handleAlert, loggedIn, setLoggedIn }) => {
    const classes = useStyles();
    // const [ loggedIn, setLoggedIn ] = useState(false);

    // useEffect(() => {
    //     fetch('http://localhost:3000/isLoggedIn')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setLoggedIn(data.authenticated);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         setLoggedIn(false);
    //     });
    // }, []);

    return (
        <div className={classes.root}>
            {loggedIn ? (
                <Typography variant="h4" align="center">You are logged in!</Typography>
            ) : (
                <Typography variant="h4" align="center">Welcome to NUSFitness! :)</Typography>
            )}
        </div>
    )
}

export default Home;