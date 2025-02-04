import { CircularProgress } from '@mui/material'
import '../../styles/loading.css'

function FlightDetailsLoading() {
  return (
    <div className='flightsLoading'>
      <div className='flightsLoadingInfo'>Data is loading, please wait...</div>
      <CircularProgress />
    </div>
  )
}

export default FlightDetailsLoading