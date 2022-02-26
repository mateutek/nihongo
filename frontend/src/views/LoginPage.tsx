import React, { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

import bgImg from '../assets/img/japan_bg.jpeg';

export function LoginPage() {
    let navigate = useNavigate();
    let auth = useAuth();

    const location = useLocation();

    const navigatePathname = useMemo(() => {
        const state = location.state as { from: Location };

        if (state && state.from) {
            return state.from;
        }

        return '/';
    }, [location]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // let formData = new FormData(event.currentTarget);
        // let username = formData.get("email") as string;
        auth.signin('gaksei', () => {
            navigate(navigatePathname, { replace: true });
        });
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {/*<TextField*/}
                        {/*  margin="normal"*/}
                        {/*  required*/}
                        {/*  fullWidth*/}
                        {/*  id="email"*/}
                        {/*  label="Email Address"*/}
                        {/*  name="email"*/}
                        {/*  autoComplete="email"*/}
                        {/*  autoFocus*/}
                        {/*  value="asd@foo.bar"*/}
                        {/*/>*/}
                        {/*<TextField*/}
                        {/*  margin="normal"*/}
                        {/*  required*/}
                        {/*  fullWidth*/}
                        {/*  name="password"*/}
                        {/*  label="Password"*/}
                        {/*  type="password"*/}
                        {/*  id="password"*/}
                        {/*  autoComplete="current-password"*/}
                        {/*  value="asd123"*/}
                        {/*/>*/}
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
