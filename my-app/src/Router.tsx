
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
// import Home from './Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}
