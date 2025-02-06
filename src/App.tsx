import { Route, Routes } from "react-router"
import FlightsPage from "./pages/FlightsPage"
import Cart from "./pages/Cart"
import FlightDetailsPage from "./pages/FlightDetailsPage"

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
