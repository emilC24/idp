import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  private apiBasePath = 'http://localhost:9001/api/v1/';
  private getExamplePath = 'examples';
  private request = {
      credentials: "include" as RequestCredentials,
      headers: new Headers(),
      method: "GET"
  };

  private async getResponseHeaders() {
      let rsp = {headers: "NIMIC"} as any;
      try {
          rsp = await fetch(`${this.apiBasePath}${this.getExamplePath}`, this.request);
          console.log()
      }
      catch {
        console.log("CATCH")
      }
      return rsp;
  }
  render() {
      const a = () => {
          console.log('a')
      };
      const b = [];
      const headers = this.getResponseHeaders();
        console.log(headers);
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
