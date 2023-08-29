import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  CircularProgress,
} from '@mui/material'

interface SearchBarProps {
  title: string
}

const API_URL = import.meta.env.VITE_API_URL

function SearchBar({ title }: SearchBarProps) {
  const [ticker, setTicker] = useState('')
  const [apiCalled, setApiCalled] = useState(false)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleTickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        API_URL,
        { ticker },
        { headers: { 'Content-Type': 'application/json' } },
      )

      setData(response.data)
      setApiCalled(true)
      setFeedback('Data fetched successfully!')
    } catch (error) {
      console.error(error)
      setFeedback('An error occurred while fetching data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={apiCalled ? 'flex-start' : 'center'}
        justifyContent={apiCalled ? 'flex-start' : 'center'}
        height={apiCalled ? 'auto' : '100vh'}
        p={apiCalled ? 3 : 0}
      >
        <Typography variant="h2" component="h2">
          {title}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Enter ticker"
            variant="standard"
            onChange={handleTickerChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Call API'}
          </Button>
        </form>

        <Snackbar
          open={!!feedback}
          autoHideDuration={6000}
          onClose={() => setFeedback('')}
          message={feedback}
        />

        {apiCalled && data && (
          <Grid container spacing={3}>
            {/* Grid for Breakdown data */}
            <Grid item xs={4}>
              <TableContainer component={Paper}>
                <Typography variant="h6">Breakdown</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Percentage</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.Breakdown.map((row: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{row.percentage}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* Grid for Top Institutional Holders data */}
            <Grid item xs={4}>
              <TableContainer component={Paper}>
                <Typography variant="h6">Top Institutional Holders</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Holder</TableCell>
                      <TableCell>Shares</TableCell>
                      <TableCell>Date Reported</TableCell>
                      <TableCell>% Out</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data['Top Institutional Holders'].map(
                      (row: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{row.holder}</TableCell>
                          <TableCell>{row.shares}</TableCell>
                          <TableCell>{row.date_reported}</TableCell>
                          <TableCell>{row.percentage_out}</TableCell>
                          <TableCell>{row.value}</TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* Grid for Top Mutual Fund Holders data */}
            <Grid item xs={4}>
              <TableContainer component={Paper}>
                <Typography variant="h6">Top Mutual Fund Holders</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Holder</TableCell>
                      <TableCell>Shares</TableCell>
                      <TableCell>Date Reported</TableCell>
                      <TableCell>% Out</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data['Top Mutual Fund Holders'].map(
                      (row: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{row.holder}</TableCell>
                          <TableCell>{row.shares}</TableCell>
                          <TableCell>{row.date_reported}</TableCell>
                          <TableCell>{row.percentage_out}</TableCell>
                          <TableCell>{row.value}</TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  )
}

export default SearchBar
