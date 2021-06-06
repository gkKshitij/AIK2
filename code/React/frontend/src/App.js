import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';


class App extends React.Component{


    render(){
        return(
            <Router>
                
                    <LoginPage />
                    <Route path="/signup" exact component={SignupPage}/>
                
                
            </Router>
        )
    }
}

export default App