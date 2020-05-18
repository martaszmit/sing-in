import React from 'react';
import LoginForm from "./components/form/LoginForm";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import RegisterForm from "./components/form/RegisterForm";

function App() {

  return (
      <div>
          <Router>
              <Switch>
                  <Route path='/' exact>
                      <LoginForm/>
                  </Route>
                  <Route path='/register' exact>
                      <RegisterForm/>
                  </Route>
                  <PrivateRoute path='/welcome' component={WelcomePage}/>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
