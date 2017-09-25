import React, {Component} from 'react';
import Routes from '../../routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from '../../images/logo.svg';
import icon from '../../images/icon.png';
import Background from '../../images/background.jpg';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div style={{backgroundColor: 'rgba(239, 239, 239, 1)' ,height: '100vh',  paddingTop: '4%'}}>
                    <div style={{margin: 'auto', width:'80%', textAlign:'center'}}>
                        <img src={icon} style={{height: '80px'}} alt="logo" />
                        <Routes/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
//rgba(173, 216, 239, 0.5)