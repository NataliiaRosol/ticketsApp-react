import "../../styles/error.css";

interface ErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const Error : React.FC<ErrorProps> = ({errorMessage, onRetry}) => {
  return (
    <div className='wrapper'>
      <div className='flightsError'>
        <p className='flightsErrorInfo'>Oops! Something went wrong: {errorMessage}</p>
      </div>
      <button className='errorBtn' onClick={onRetry}>Retry</button>
    </div>    
  )
}

export default Error