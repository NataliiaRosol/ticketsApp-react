import { CircularProgress } from "@mui/material"


function CartLoading() {
    return (
        <div className='flightsLoading'>
          <div className='flightsLoadingInfo'>Tickets are loading, please wait...</div>
          <CircularProgress />
        </div>
      )
  
}

export default CartLoading