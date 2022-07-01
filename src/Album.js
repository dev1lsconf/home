import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://dev1ls.online/">
        Dev1ls | Homepage
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" align="center">
            About me:
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">

            <Typography variant="h1" color="inherit" align="center">
              Dev1ls
            </Typography>

            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Linux User, SysAdmin and Web Developer from 🇩🇴 with apassion for building
              digital services/stuff. From planning and designing all the way to solving
              real-life problems with code. Im in ♥ with: Linux, Music, (CLI), Networking,
              IRC and Web Developer.
            </Typography>

            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">
                <Link color="inherit" href="http://dev1ls.deno.dev">
                  My Blog
                </Link>
              </Button>
              <Button variant="outlined">
                <Link color="inherit" href="https://discord.gg/peSFEH45P4">
                  Discord
                </Link>
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 4 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Dev1ls Homepage
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          power of the command lines..
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

