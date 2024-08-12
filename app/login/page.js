'use client'

import { Box, Stack, TextField, Button, Typography } from "@mui/material"


export default function LoginPage() {
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box 
        width={'70%'} 
        height={'30%'}
        bgcolor={'#285F39'} 
        borderRadius={'20px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      > 
        <Typography variant="h4" fontFamily={'Arial'} color={'white'} textAlign={'center'} ml={2} mr={2} mb={2}>
          Welcome to Your <Box display={'inline'} color={'lightgreen'}>Headstarter</Box> AI Assistant
        </Typography>
        <Typography variant="p" fontSize={'17px'} fontFamily={'cursive'} color={'white'} textAlign={'center'} ml={2} mr={2} mb={2}>
          Powered by Open AI's
          <Box display={'inline'} color={'lightgreen'}> GPT-4o</Box>,
          <Box display={'inline'} color={'lightgreen'}> Auth0</Box> by Okta, and 
          <Box display={'inline'} color={'lightgreen'}> Next.js</Box>
        </Typography>
        <Box bgcolor={'lightgreen'} borderRadius={'15px'} p={2}>
          <a href="/api/auth/login" fontSize={'20px'} sx={{textDecoration: 'none'}}>
            <Typography variant="h5" color='#285F39'>Login/Signup</Typography>
          </a>
        </Box>
      </Box>
    </Box>
  )
}