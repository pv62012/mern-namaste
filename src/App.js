
import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import { useStateValue } from './state/StateProvider';


function App() {
  const [{ user }, dispatch] = useStateValue();

 useEffect(() => {
   dispatch({
     type: "SET_USER",
     user: localStorage.getItem("user"),
   });
   return () => {
   }
 }, [])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={user?"/":"/profile"}>
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
