import { CircularProgress } from '@mui/material'
import styles from './FlightsPage.module.css'

function FlightsPageLoading() {
  return (
    <div className={styles.flightsLoading}>
      <div className={styles.flightsLoadingInfo}>Flights page loading, please wait...</div>
      <CircularProgress />
    </div>
    
  )
}

export default FlightsPageLoading