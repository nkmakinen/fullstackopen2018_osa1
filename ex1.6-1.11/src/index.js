import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            positiivinen: 0,
            neutraali: 0,
            huono: 0
        }
    }

    asetaArvoon = (palaute) => {
        return () => {
            this.setState({ [palaute]: this.state[palaute] + 1 })
        }
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button 
                    handleClick={this.asetaArvoon('positiivinen')}
                    text="hyvä"
                />
                <Button 
                    handleClick={this.asetaArvoon('neutraali')}
                    text="neutraali"
                />
                <Button 
                    handleClick={this.asetaArvoon('huono')}
                    text="huono"
                />
                <h1>statistiikka</h1>
                <Statistics positiivinen={this.state.positiivinen}
                            neutraali={this.state.neutraali}
                            huono={this.state.huono} />
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ nimi, arvo }) => {
    return (
        <tr>
            <td>{nimi}</td>
            <td>{arvo}</td>
        </tr>
    )
}

const Statistics = ({ positiivinen, neutraali, huono }) => {
    let ka = (positiivinen - huono) / (positiivinen + neutraali + huono)
    if (isNaN(ka)) {
        ka = '-';
    } else {
        ka = ka.toFixed(1)
    }

    let positiivisia = positiivinen / (positiivinen + neutraali + huono) * 100
    if (isNaN(positiivisia)) {
        positiivisia = '-'
    } else {
        positiivisia = positiivisia.toFixed(1) + " %"
    }

    if (positiivinen === 0 && neutraali === 0 && huono === 0) {
        return (
            <div>ei yhtään annettua palautetta</div>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic nimi="Hyvä" arvo={positiivinen}/>
                    <Statistic nimi="Neutraali" arvo={neutraali}/>
                    <Statistic nimi="Huono" arvo={huono}/>
                    <Statistic nimi="Keskiarvo" arvo={ka}/>
                    <Statistic nimi="Positiivisia" arvo={positiivisia}/>
                </tbody>
            </table>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)