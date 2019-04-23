import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    private apiBasePath = 'http://localhost:9001/api/v1/';
    private getExamplePath = 'examples';
    private initRequest = (methodType: string) => ({
        credentials: "include" as RequestCredentials,
        headers: new Headers(),
        method: methodType
    });

    private async getRequest(path: string) {
        let rsp: Response;
        try {
            rsp = await fetch(`${this.apiBasePath}${path}`, this.initRequest("GET"));
            console.log(rsp)
            if (!rsp.ok) {
                throw new Error();
            }
            return rsp;
        }
        catch {
            console.log("CATCH")
        }
        return null;
    }

    private async postRequest(path: string) {
        let rsp: Response;
        try {
            rsp = await fetch(`${this.apiBasePath}${path}`, this.initRequest("POST"));
            console.log(rsp)
            if (!rsp.ok) {
                throw new Error();
            }
            return rsp;
        }
        catch {
            console.log("CATCH")
        }
        return null;
    }

    render() {
        const a = () => {
            console.log('a')
        };
        const b = [];
        const rsp = this.getRequest(this.getExamplePath);
        console.log(rsp.then(r => r ? r.headers : "NEVER"));
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit wosssw<code>src/App.tsx</code> and save to reload.
                    </p>
                    <p>
                        Response
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
