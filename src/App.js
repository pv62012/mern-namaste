
import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import { useStateValue } from './state/StateProvider';
import UserProfile from './pages/UserProfile';
import SubscribeUsersPost from './pages/SubscribeUsersPost';


function App() {
  const [{ user }, dispatch] = useStateValue();

 useEffect(() => {
   dispatch({
     type: "SET_USER",
     user: JSON.parse(localStorage.getItem("user")),
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
          <Route exact path={user ? "/profile" : "/"}>
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profile/:userid">
            <UserProfile />
          </Route>
          <Route path="/myfollowingpost">
            <SubscribeUsersPost/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
