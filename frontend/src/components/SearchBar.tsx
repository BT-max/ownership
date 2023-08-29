// import { Box, Button, Snackbar, TextField, Typography } from '@mui/material'
// import React, { useState } from 'react'
//
// interface SearchBarProps {
//   title: string
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
// }
//
// function SearchBar({ title, handleSubmit }: SearchBarProps) {
//   const [ticker, setTicker] = useState('')
//   const handleTickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTicker(event.target.value)
//   }
//
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//     >
//       <Typography variant="h2" component="h2">
//         {title}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           id="standard-basic"
//           label="Enter ticker"
//           variant="standard"
//           onChange={handleTickerChange}
//         />
//       </form>
//     </Box>
//   )
// }
