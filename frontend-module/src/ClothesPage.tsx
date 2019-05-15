import * as React from "react";
import {clothesPath, Requests} from "./Requests";
import {Cloth, Size} from "./models/Cloth";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export class ClothesPage extends React.Component<{}, { clothes: Cloth[] }> {
    private requests: Requests;
    private buyOnePath: string;

    constructor(props: any) {
        super(props);
        this.requests = new Requests(props);
        this.state = {
            clothes: []
        };
        this.buyOnePath = clothesPath + '/buyOne'
    }

    async componentWillMount() {
        await this.loadData();
    }

    private async loadData() {
        const getRequest = this.requests.getRequest(clothesPath).then(r => this.setState({clothes: r}));
    }

    private buttonStyling = {
        borderRadius: "100px",
        color: "white",
        backgroundColor: "green",
        cursor: "pointer"
    };

    private buttonHandler = (cloth: Cloth) => (event: React.MouseEvent<HTMLButtonElement>) => {
        if (cloth.count <= 0) {
            alert("No available stock");
            return;
        }
        this.requests.postRequest(this.buyOnePath, JSON.stringify({cloth}));
        // cloth.count--;
        (this.state.clothes.find(c => c._id === cloth._id) as Cloth).count--;
        // this.setState({clothes: [...this.state.clothes.filter(c => c._id !== cloth._id), cloth]})
        this.setState(this.state);
    };

    private getColumns() {
        return [
            {
                Header: "Type",
                accessor: (c: Cloth) => c.type.toUpperCase(),
                id: "type"
            },
            {
                Header: "Size",
                accessor: (c: Cloth) => Size[c.size].toUpperCase(),
                id: "size"
            },
            {
                Header: "Price",
                accessor: (c: Cloth) => c.price,
                id: "price"
            },
            {
                Header: "Available stock",
                accessor: (c: Cloth) => c.count,
                id: "count"
            }, {
                Cell: (row: any) => <button style={this.buttonStyling} onClick={this.buttonHandler(row.original)}>Buy</button>,
                Header: "Buy",
                id: "buy"
            }]
    }

    public render() {
        return <div>
            <h1 style={{color: "red"}}>
                Clothes Page
            </h1>
            <ReactTable columns={this.getColumns()}
                        data={this.state.clothes}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        />
        </div>
    }
}