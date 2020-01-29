import React from 'react';
import Button from '@material-ui/core/Button';
import { Box, TextField, Typography } from "@material-ui/core";

const LoginForm = () => (
    <Box component="div">
        <Typography variant="h3" component="h1">
            SignIn Form
        </Typography>
        <TextField id="standard-basic" label="Username" />
        <Button variant="contained" color="primary">Log in</Button>
    </Box>
);

export default LoginForm;
