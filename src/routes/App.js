import React from 'react';
import  {BrowserRouter,Switch, Route} from 'react-router-dom';
import Login from '../pages/login';
import Principal from '../pages/principal';
import 'bootstrap/dist/css/bootstrap.css';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Home" component={Principal}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
