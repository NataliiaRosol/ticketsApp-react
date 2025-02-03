interface FlightCardProp {
  id: string
}

const FlightCard:React.FC<FlightCardProp> = ({id}) => {
  return (
    <div>FlightCard {id}</div>
  )
}

export default FlightCard