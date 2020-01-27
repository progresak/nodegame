import React from 'react';
import 'typeface-roboto';
import { Container, Grid } from "@material-ui/core";
import SignIn from "./components/views/SignIn";

const App: React.FC = () => (
    <Container fixed>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
        >
            <SignIn />
        </Grid>
    </Container>
);

export default App;
