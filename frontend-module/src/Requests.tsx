import React, {Component} from 'react';
import './App.css';

export const apiBasePath = 'http://localhost:9001/';
export const clothesPath = 'clothes';

export class Requests extends Component {
    constructor(props: any) {
        super(props);
    }

    private initRequest = (methodType: string, body?: any) => ({
        credentials: "include" as RequestCredentials,
        headers: new Headers(),
        method: methodType,
        body,
    });

    private async doRequest(path: string, methodType: string, body?: any) {
        let rsp: Response;
        try {
            rsp = await fetch(`${apiBasePath}${path}`, this.initRequest(methodType, body));
            return await ((rsp) =>
            {
                if (!rsp.ok) {
                    return null;
                }
                return rsp.json();
            })(rsp);
            // if (!rsp.ok) {
            //     throw new Error();
            // }
            // return rsp.json();
        }
        catch {
            console.log("CATCH")
        }
    }

    public getRequest(path: string) {
        return this.doRequest(path, "GET");
    }

    public postRequest(path: string, body: any) {
        return this.doRequest(path, "POST", body);
    }

    // public deleteRequest(path: string, body: any) {
    //     return this.doRequest(path, "DELETE", body);
    // }
}
