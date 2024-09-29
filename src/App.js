import Home from './components/Home'
import AllReservations from './components/AllReservations'
import MakeReservations from './components/MakeReservations'
import MyReservation from './components/MyReservation'
import Rooms from './components/Rooms'
import './App.css';
import { BrowserRouter as Router , Routes ,Route  } from 'react-router-dom';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ProtectedRoutes from './ProtectedRoutes'
import UnAuthorized from './components/UnAuthorized'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reservations" element={< ProtectedRoutes element={AllReservations} allowedRole={['ADMIN']} />} />
        <Route path="/make-reservation" element={<MakeReservations />} />
        <Route path="/rooms" element={< ProtectedRoutes element={Rooms} allowedRole={'ADMIN'} />} />
        <Route path="/myreservation" element={<MyReservation />} />
        <Route path="/unauthorized" element={<UnAuthorized/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>

  )
}

export default App;
