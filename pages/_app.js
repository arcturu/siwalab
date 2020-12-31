import '../styles/global.css'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Button } from '@material-ui/core';
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
export default function App({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>しわラボ</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes" />
            </Head>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/">
                        <a style={{ color: `inherit`, textDecoration: `none` }}>
                            <Typography variant="h6">
                                しわラボ
                            </Typography>
                        </a>
                    </Link>
                    <IconButton color="inherit" style={{ marginLeft: 'auto' }}>
                        <Link href="/info">
                            <InfoIcon />
                        </Link>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
