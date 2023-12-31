import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignUpForm.js';
import HomePage from './components/HomePage/HomePage.js';
import UserUpdateForm from './components/SessionForms/UserUpdateForm';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import { getCurrentUser } from './store/session';
import Discover from './components/Discover/Discover';
import SearchBar from './components/SearchBar/SearchBar';
import CreateTuneUps from './components/CreateTuneUps/CreateTuneUps';
import AboutDevs from './components/AboutDevs/AboutDevs';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        
        <ProtectedRoute exact path= "/home" component={HomePage} />
        <ProtectedRoute exact path="/update" component={UserUpdateForm} />
        <ProtectedRoute exact path="/users/:id" component={UserProfilePage}/>
        <ProtectedRoute exact path="/discover" component={Discover} />
        <ProtectedRoute exact path="/search" component={SearchBar} />
        <ProtectedRoute exact path="/create" component={CreateTuneUps} />

        <Route exact path="/about" component={AboutDevs}/>
      </Switch>
    </>
  );
}

export default App;