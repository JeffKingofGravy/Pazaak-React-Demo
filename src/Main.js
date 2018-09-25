import React, { PureComponent, Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            playerStand: false,
            cpuList: [],
            cpuStand: false,
            value: ''
        };
    }

    getRandom = (max = 10) => {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    getWeightedRandom = (total) => {
        const pool1 = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,8,8,9,9,10,10];
        const pool2 = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,6,6,7,7,8,8,9,10];
        return total < 10 ? pool1[Math.floor(Math.random() * pool1.length)] : pool2[Math.floor(Math.random() * pool2.length)];
    }

    getTotal = (list) => {
        const sum = (newNum, currNum) => currNum + newNum;
        return list.length > 0 ? list.reduce(sum) : 0;
    }

    checkResults = () => {
        const playerTotal = this.getTotal(this.state.playerList);
        const cpuTotal = this.getTotal(this.state.cpuList);
        const {playerStand} = this.state;
        const {cpuStand} = this.state;
        switch(true) {
            case (playerStand && cpuStand):
                if (playerTotal > cpuTotal) {
                    window.alert("You win");
                }
                else if (cpuTotal > playerTotal) {
                    window.alert("Opponent wins");
                }
                else {
                    window.alert("Draw");
                }
                break;
        }
    }

    newCard = (caller) => {
        const {playerList} = this.state;
        const {cpuList} = this.state;
        const total = caller === 0 ? this.getTotal(playerList) : this.getTotal(cpuList);
        if (total < 20) {
            switch (caller) {
                // player hit button
                case 0:
                    const newPlayerVal = this.getWeightedRandom();
                    playerList.push(newPlayerVal);
                    this.setState({playerList});
                    break;
                // cpu hit
                case 1:
                    const newCPUVal = this.getWeightedRandom();
                    console.log(newCPUVal);
                    cpuList.push(newCPUVal);
                    this.setState({cpuList});
                    break;
            }
        }
    }

    reset = () => {
        this.setState({
            playerList: [],
            playerStand: false,
            cpuList: [],
            cpuStand: false,
            value: ''});
    }

    stand = (caller) => {
        switch (caller) {
            // player stands
            case (0):
                this.setState({playerStand: true});
                break;
            // cpu stands
            case (1):
                this.setState({cpuStand: true});
                break;
        }
    }

    render = () => {
        const {playerList} = this.state;
        const {cpuList} = this.state;
        return (
            <div className="Main">
                <div className="cardZone">
                    <div className="playerTotal">
                        {this.getTotal(playerList)}
                    </div>
                    <button onClick={() => this.newCard(0)}>Hit</button>
                    <br />
                    <br />
                    <button onClick={() => this.stand(0)}>Stand</button>
                    <div className="playerZone" stood={this.state.playerStand}>
                        {playerList.map((i, j) => <span className="playerCard">{i}</span>)}
                    </div>
                    <hr />
                    <div className="playerTotal">
                        {this.getTotal(cpuList)}
                    </div>
                    <button onClick={() => this.newCard(1)}>Hit</button>
                    <br />
                    <br />
                    <button onClick={() => this.stand(1)}>Stand</button>
                    <div className="cpuZone" stood={this.state.cpuStand}>
                        {cpuList.map((i, j) => <span className="cpuCard">{i}</span>)}
                    </div>
                </div>
                <button onClick={this.checkResults}>Check</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

export default Main;
