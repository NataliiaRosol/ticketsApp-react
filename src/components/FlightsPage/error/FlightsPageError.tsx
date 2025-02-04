import '../../styles/error.css'

interface FlightsPageErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const FlightsPageError : React.FC<FlightsPageErrorProps> = ({errorMessage, onRetry}) => {
  return (
    <div className='wrapper'>
      <div className='flightsError'>
        <p className='flightsErrorInfo'>Oops! Something went wrong: {errorMessage}</p>
      </div>
      <button className='errorBtn' onClick={onRetry}>Retry</button>
    </div>    
  )
}

export default FlightsPageError