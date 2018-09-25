import React, { PureComponent, Component } from 'react';
import autobind from 'autobind-decorator';
import './App.css';
import Main from './Main.js'

class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="App">
                <header className="Head">
                </header>
                <div className="Main">
                    <Main />
                </div>
            </div>
        );
    }
}

export default App;
