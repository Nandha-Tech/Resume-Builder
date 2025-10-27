
import { Outlet, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'

export default function App() {
  const { pathname } = useLocation()
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar>
          <DescriptionIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Resume Builder</Typography>
          <Button
            component={Link}
            to="/"
            variant={pathname === '/' ? 'contained' : 'outlined'}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Builder
          </Button>
          <Button
            component={Link}
            to="/preview"
            variant={pathname === '/preview' ? 'contained' : 'outlined'}
            color="inherit"
          >
            Preview
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
        <Typography variant="caption"> WELCOM TO RESUME BUILDER for free</Typography>
      </Box>
    </Box>
  )
}
