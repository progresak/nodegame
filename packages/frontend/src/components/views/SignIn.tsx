import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RootState } from '../../reducer';
import { connect } from 'react-redux';
import { addSystemMessage, signIn, signInSuccessfull } from '../../ducks/App/actions';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://progresak.cz/">
                Progresak
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface SignInProps {
    signedIn: boolean;
    signIn: (credentials: { username: string; password: string }) => void;
    signInSuccessfull: () => void;
    addSystemMessage: (args: { message: string }) => void;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    input: {
        color: 'white'
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    wrapper: {
        zIndex: 999999
    }
}));

const SignIn: React.FC<SignInProps> = ({
    signedIn,
    signIn,
    signInSuccessfull,
    addSystemMessage
}) => {
    const classes = useStyles();

    if (signedIn) {
        return null;
    }
    useEffect(() => {
        // @ts-ignore
        window.socket.on('signInResponse', (data: { player: string; message: string }) => {
            addSystemMessage({ message: 'Welcome on the server' });
            signInSuccessfull();
        });
    }, []);
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.currentTarget.value);

    const onFormSubmit = (e: React.FormEvent) => {
        signIn({ username, password: '' });
        e.preventDefault();
    };

    return (
        <Container id="signDiv" className={classes.wrapper} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>{/*<LockOutlinedIcon />*/}</Avatar>
                <Typography component="h1" variant="h5">
                    Shot me if you can
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={onFormSubmit}
                    autoComplete="off"
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Nickname"
                        onChange={handleUsernameChange}
                        name="email"
                        autoFocus
                        className={classes.input}
                    />
                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    /> */}
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    {/*<Grid container>*/}
                    {/*    <Grid item xs>*/}
                    {/*        <Link href="#" variant="body2">*/}
                    {/*            Forgot password?*/}
                    {/*        </Link>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        <Link href="#" variant="body2">*/}
                    {/*            {"Don't have an account? Sign Up"}*/}
                    {/*        </Link>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        signedIn: state.app.authenticated
    };
};

interface StateProps {
    signedIn: boolean;
}

interface DispatchProps {
    signIn: (credentials: { username: string; password: string }) => void;
    signInSuccessfull: () => void;
    addSystemMessage: (args: { message: string }) => void;
}

export default connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, {
    signIn,
    signInSuccessfull,
    addSystemMessage
})(SignIn);
