interface FlightDetailsErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const FlightDetailsError : React.FC<FlightDetailsErrorProps> = ({errorMessage, onRetry}) => {
  return (
    <div className='wrapper'>
      <div className='flightsError'>
        <p className='flightsErrorInfo'>Oops! Something went wrong: {errorMessage}</p>
      </div>
      <button className='retryBtn' onClick={onRetry}>Retry</button>
    </div>    
  )
}

export default FlightDetailsError