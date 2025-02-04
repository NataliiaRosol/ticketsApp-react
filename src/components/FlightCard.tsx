import { useNavigate } from "react-router";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import planeImg from "../../public/airplane.avif";



interface FlightCardProp {
  flight: Flight;
}

interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  terminal: string;
  gate: string;
  tickets: {
    total: number;
    remaining: number;
  };
}

const FlightCard: React.FC<FlightCardProp> = ({ flight }) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/flights/${id}`);
  };

  return (
    <div onClick={() => handleClick(flight.id)} className="flights-inner">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Airline: {flight.airline}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ID: {flight.id}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 140 }}
          image={planeImg}
          title={`Flight ${flight.id}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {flight.from} → {flight.to}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Departure time: {flight.departureTime}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Arrival time: {flight.arrivalTime}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Terminal: {flight.terminal}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            Gate: {flight.gate}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Total tickets: {flight.tickets.total}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Remaining: {flight.tickets.remaining}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Price: {flight.price}$
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
          <Button size="small">Learn More</Button>
          <div className="card-btns">
            <RemoveShoppingCartIcon color="error" />
            <AddShoppingCartIcon color="info" />
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default FlightCard;
