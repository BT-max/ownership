import { Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function Home() {
  const [ticker, setTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleTickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    console.log(`ticker: ${ticker}`)

    try {
      const response = await axios.post(
        API_URL,
        { ticker },
        { headers: { 'Content-Type': 'application/json' } },
      )
      console.log(response.data)
      setFeedback('Data fetched successfully!')
    } catch (error) {
      console.error(error)
      setFeedback('An error occurred while fetching data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" component="h2">
        View Majority Shareholders
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Enter ticker"
          variant="standard"
          onChange={handleTickerChange}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
        >
          Submit
        </Button>
      </form>
      {loading && <Typography variant="body1">Loading...</Typography>}
      <Snackbar
        open={feedback !== ''}
        autoHideDuration={6000}
        onClose={() => setFeedback('')}
        message={feedback}
      />
    </Box>
  )
}

export default Home
