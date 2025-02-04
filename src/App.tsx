import { Route, Routes } from "react-router"
import FlightsPage from "./components/FlightsPage/FlightsPage"
import Cart from "./components/Cart/Cart"
import FlightDetailsPage from "./components/FlightDetailsPage/FlightDetailsPage"

function App() {
  

  return (
    <div>
      <Routes >
        <Route path='/' element={<FlightsPage/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/flights/:id' element={<FlightDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
