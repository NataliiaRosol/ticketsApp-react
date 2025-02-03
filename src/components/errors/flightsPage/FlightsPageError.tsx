import styles from './FlightsPage.module.css'

interface FlightsPageErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const FlightsPageError : React.FC<FlightsPageErrorProps> = ({errorMessage, onRetry}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flightsError}>
        <p className={styles.flightsErrorInfo}>Oops! Something went wrong: {errorMessage}</p>
      </div>
      <button className={styles.errorBtn} onClick={onRetry}>Retry</button>
    </div>    
  )
}

export default FlightsPageError