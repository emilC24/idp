import * as React from "react";
import {clothesPath, Requests} from "./Requests";
import {Cloth} from "./models/Cloth";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export class ClothesPage extends React.Component<{}, { clothes: Cloth[] }> {
    private requests: Requests;

    constructor(props: any) {
        super(props);
        this.requests = new Requests(props);
        this.state = {
            clothes: []
        }
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
        // this.requests.postRequest(clothesPath, JSON.stringify({cloth: this.state}));
    };

    private getColumns() {
        return [
            {
                Header: "Type",
                accessor: (c: Cloth) => c.type,
                id: "type"
            },
            {
                Header: "Size",
                accessor: (c: Cloth) => c.size,
                id: "size"
            },
            {
                Header: "Available stock",
                accessor: (c: Cloth) => c.count,
                id: "count"
            }, {
                Cell: (row: any) => <button style={this.buttonStyling} onClick={this.buttonHandler(row.original)}>Order</button>,
                Header: "Order",
                id: "order"
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