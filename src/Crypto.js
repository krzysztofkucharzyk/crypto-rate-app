import React, {Component} from "react";
import './Crypto.css';
import CryptoList from "./CryptoList";
import axios from "axios";


class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: []
        }

    }

    componentDidMount() {
        this.getCryptoData();
        this.timerID = setInterval(() =>
            this.getCryptoData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCryptoData = () => {
        axios.get('https://blockchain.info/ticker')
            .then(res => {
                const tickers = res.data;

                this.setState((state) => {
                    let newCryptoList = [];

                    for (const [ticker, cryptoRate] of Object.entries(tickers)) {

                        let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
                            return(cryptoObj.currency === ticker);
                        });

                        let newCryptoObj = {
                            currency: ticker,
                            symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            sell: cryptoRate.sell,
                            lastRate: cryptoRate.last,
                        }

                        if (lastCryptoObj !== undefined) {
                            // code
                        } else {
                            newCryptoObj.cssClass = 'blue';
                            newCryptoObj.htmlArray = String.fromCharCode(8596);
                        }

                    newCryptoList.push(newCryptoObj); 
                    }
                    
                    return({
                        cryptoList: newCryptoList
                    })
                });

                // console.log(tickers);
            }); 
    }


    render() {
        return(
            <div className="Crypto">
                <input typeof="text" placeholder="Filter"></input>
                <CryptoList cryptoList={this.state.cryptoList}/>
            </div>
        );
    }
}


export default Crypto;