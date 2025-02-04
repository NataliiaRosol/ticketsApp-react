import { CircularProgress } from '@mui/material'
import  '../../styles/loading.css'

function FlightsPageLoading() {
  return (
    <div className='flightsLoading'>
      <div className='flightsLoadingInfo'>Flights page loading, please wait...</div>
      <CircularProgress />
    </div>
    
  )
}

export default FlightsPageLoading