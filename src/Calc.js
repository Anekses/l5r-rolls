import { Component } from "react";
import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField, FormControlLabel, Checkbox, Typography, Grid } from "@material-ui/core";
import './Calc.css'

export class Calc extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstNumber: 1,
            secondNumber: 1,
            addtionalModificator: 0,
            tnNumber: 0,
            nineExplode: false,
            tenExlode: true,
            rerollOne: false,
            rolls: 1000,
            results: [

            ],
            probability: 0,
            minusToRolls: 0,
        }

        this.probabilities = {
            probability: 0,
            probabilityWithRaise1: 0,
            probabilityWithRaise2: 0,
            probabilityWithRaise3: 0,
            probabilityWithRaise4: 0
        }
    }

    doMagic = () => {
        this.clearState()

        for (let i = 0; i < this.state.rolls; i++) {
            const rolledNumbers = this.prepareFirstNumbers();
            const endNumbers = this.getHighestNumbers(rolledNumbers);

            this.state.results.push(endNumbers.reduce((a, b) => a + b, 0))
        }

        this.calcTn()
    }

    clearState = () => {
        this.setState({ results: [] })

        this.probabilities = {
            probability: 0,
            probabilityWithRaise1: 0,
            probabilityWithRaise2: 0,
            probabilityWithRaise3: 0,
            probabilityWithRaise4: 0
        }
    }

    calcTn = () => {
        this.state.results.forEach(element => {
            this.checkProbability("probability", element, 0)
            this.checkProbability("probabilityWithRaise1", element, 5)
            this.checkProbability("probabilityWithRaise2", element, 10)
            this.checkProbability("probabilityWithRaise3", element, 15)
            this.checkProbability("probabilityWithRaise4", element, 20)
        });
    }

    checkProbability = (stateElementName, element, value) => {
        if (element >= this.state.tnNumber * 1 + value) {
            this.probabilities[stateElementName]++;
        }
    }

    getHighestNumbers = (rolledNumbers) => {
        return rolledNumbers.sort((a, b) => b - a - this.state.minusToRolls * 1).slice(0, this.state.secondNumber)
    }

    prepareFirstNumbers = () => {
        let rolledNumbers = []

        for (let j = 0; j < this.state.firstNumber; j++) {
            rolledNumbers.push(this.rollDice(10, true));
        }

        return rolledNumbers;
    }

    rollDice = (max, shouldReroll) => {
        let result = 1 + Math.floor(Math.random() * max)

        if (
            result === 1 && this.state.rerollOne
        ) {
            result = this.rollDice(10, false);
        }

        if (
            (result === 10 && this.state.tenExlode) ||
            (result === 9 && this.state.nineExplode)
        ) {
            result += this.rollDice(10, false)
        }

        return result;
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            name="firstNumber"
                            label="Pierwsze k"
                            type="number"
                            className="input"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.firstNumber}
                            onChange={this.handleInputChange}
                        />
                        <span className="text">
                            k
                        </span>
                        <TextField
                            name="secondNumber"
                            label="Drugie k"
                            type="number"
                            className="input"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.secondNumber}
                            onChange={this.handleInputChange}
                        />
                        <span className="text">
                            +
                        </span>
                        <TextField
                            name="addtionalModificator"
                            label="Modyfikatory"
                            type="number"
                            className="input"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.addtionalModificator}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="rerollOne"
                                    checked={this.state.rerollOne}
                                    value={this.state.rerollOne}
                                    color="primary"
                                    onChange={this.handleInputChange}
                                />
                            }
                            label="Reroll 1"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="nineExplode"
                                    checked={this.state.nineExplode}
                                    value={this.state.nineExplode}
                                    color="primary"
                                    onChange={this.handleInputChange}
                                />
                            }
                            label="9 wybuchają"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="tenExlode"
                                    checked={this.state.tenExlode}
                                    value={this.state.tenExlode}
                                    color="primary"
                                    onChange={this.handleInputChange}
                                />
                            }
                            label="10 wybuchają"
                        />
                    </div>
                    <div>
                        <TextField
                            name="minusToRolls"
                            label="Minus do rzutów"
                            type="number"
                            className="bigInput"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.minusToRolls}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            name="tnNumber"
                            label="Poziom trudności"
                            type="number"
                            className="bigInput"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.tnNumber}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </form>
                <Button className="button" variant="contained" color="primary" onClick={this.doMagic}>
                    Wylicz
                </Button>

                <Typography variant="subtitle1">
                    <Grid xs={12} item container direction="row">
                        <Grid xs={6} item container direction="column">
                            <p>
                                TN {this.state.tnNumber}:
                            </p>
                            <p>
                                TN {this.state.tnNumber * 1 + 5}:
                            </p>
                            <p>
                                TN {this.state.tnNumber * 1 + 10}:
                            </p>
                            <p>
                                TN {this.state.tnNumber * 1 + 15}:
                            </p>
                            <p>
                                TN {this.state.tnNumber * 1 + 20}:
                            </p>
                        </Grid>
                        <Grid xs={6} item container direction="column">
                            <p>
                                {Math.round(this.probabilities.probability / this.state.rolls * 100)}%
                            </p>
                            <p>
                                {Math.round(this.probabilities.probabilityWithRaise1 / this.state.rolls * 100)}%
                            </p>
                            <p>
                                {Math.round(this.probabilities.probabilityWithRaise2 / this.state.rolls * 100)}%
                            </p>
                            <p>
                                {Math.round(this.probabilities.probabilityWithRaise3 / this.state.rolls * 100)}%
                            </p>
                            <p>
                                {Math.round(this.probabilities.probabilityWithRaise4 / this.state.rolls * 100)}%
                            </p>
                        </Grid>
                    </Grid>
                </Typography>
            </div>
        )
    }
}