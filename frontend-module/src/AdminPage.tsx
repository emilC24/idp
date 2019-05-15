import * as React from "react";
import {Cloth, ClothType, Size} from "./models/Cloth";
import {clothesPath, Requests} from "./Requests";
import {CSSProperties} from "react";
import {Redirect} from "react-router";

interface AdminPageProps {
    clothType: ClothType, size: Size, price: number, count: number,
    redirect: boolean,
}

export class AdminPage extends React.Component<{}, AdminPageProps> {
    private requests: Requests;

    constructor(props: any) {
        super(props);
        this.requests = new Requests(props);
    }

    async componentWillMount() {
        await this.loadData();
    }

    private async loadData() {
        await this.setState({
            clothType: ClothType.Jeans,
            size: Size.s,
            price : 0,
            count: 0
        });
    }

    private redirectButtonStyling = {
        borderRadius: "10px",
        color: "white",
        backgroundColor: "blue",
        cursor: "pointer",
        float: "right",
        margin: "10px"
    } as CSSProperties;

    private buttonStyling = {
        borderRadius: "100px",
        color: "white",
        backgroundColor: "green",
        cursor: "pointer",
        margin: "15px"
    };

    private clothTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({...this.state, clothType: event.target.value as ClothType})
    };

    private sizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({...this.state, size: parseInt(event.target.value) as Size})
    };

    private priceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, price: parseInt(event.target.value) })
    };

    private countChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, count: parseInt(event.target.value)})
    };

    private submitClick = () => {
        this.requests.postRequest(clothesPath, JSON.stringify({cloth: this.state}))
        alert("Items added!");
    };

    private redirectButtonHandler = () => {
        this.setState({...this.state, redirect: true});
    };

    private renderRedirect() {
        if (this.state.redirect === true) {
            return <Redirect to={'/'}/>
        }
    }

    public render() {
        return <div>
            {this.renderRedirect()}
            <button style={this.redirectButtonStyling}  onClick={this.redirectButtonHandler}> Go to store </button>
            <h1 style={{margin: "15px"}}> Add cloth </h1>
            <label style={{'margin': '15px'} as React.CSSProperties}>
                Cloth Type:
                <select value={this.state.clothType} onChange={this.clothTypeChange} style={{'marginLeft': '5px'} as CSSProperties}>
                    <option value={ClothType.Jeans}>
                        Jeans
                    </option>
                    <option value={ClothType.Shirt}>
                        Shirt
                    </option>
                    <option value={ClothType.T_shirt}>
                        T-Shirt
                    </option>
                </select>
            </label>

            <label>
                Size:
                <select value={this.state.size} onChange={this.sizeChange} style={{'marginLeft': '5px'} as CSSProperties}>
                    <option value={Size.xs}>
                        XS
                    </option>
                    <option value={Size.s}>
                        S
                    </option>
                    <option value={Size.m}>
                        M
                    </option>
                    <option value={Size.l}>
                        L
                    </option>
                    <option value={Size.xl}>
                        XL
                    </option>
                </select>
            </label>

            <div style={{'margin': '15px'} as React.CSSProperties}>
                Price: <input type="text" name="price" onChange={this.priceChange}/>
            </div>

            <div style={{'margin': '15px'} as React.CSSProperties}>
                Count: <input type="text" name="count" onChange={this.countChange}/>
            </div>
            <button onClick={this.submitClick} style={this.buttonStyling as React.CSSProperties}> Submit </button>
        </div>

    }
}