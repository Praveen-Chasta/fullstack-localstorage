import {BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom' 

import Signin from './component/signin/Signin';
import Signup from './component/signup/Signup';
import Dashboard from './component/dashboard/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/signin" element = {<Signin/>} />
          <Route path = "/dashboard" element = {<Dashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
