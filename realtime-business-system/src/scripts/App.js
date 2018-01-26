import React, {Component} from "react";
import "./App.css";
import Header from "./common/Header";
import Main from "./common/Main";

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="Header row">
                    <Header />
                </div>
                <div className="Content row">
                    <Main />
                </div>

            </div>
        );
    }
}

export default App;
