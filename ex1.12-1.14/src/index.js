import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: Array(anecdotes.length).fill(0)
        }
    }

    naytaSatunnainen = () => {
        let randomIndex = Math.floor(Math.random() * anecdotes.length)
        if (randomIndex === this.state.selected) {
            do {
                randomIndex = Math.floor(Math.random() * anecdotes.length)
            } while (randomIndex === this.state.selected)
        }

        this.setState({ selected: randomIndex })
    }

    lisaaAani = () => {
        return () => {
            let copy = this.state.votes
            copy[this.state.selected] = this.state.votes[this.state.selected] + 1

            this.setState({ votes: copy })
        }
    }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.votes[this.state.selected]} votes</p>
        <Button
            handleClick={this.lisaaAani()}
            text={'vote'}
        />
        <Button
            handleClick={this.naytaSatunnainen}
            text={'next anecdote'}
        />
        <MostVotes votes={this.state.votes} />
      </div>
    )
  }
}

const MostVotes = ({ votes }) => {
    let maxIdx = 0
    let maxVal = 0

    for (let i = 0; i < votes.length; i++) {
        if (votes[i] > maxVal) {
            maxVal = votes[i]
            maxIdx = i
        }
    }

    return (
        <div>
            <h3>anecdote with most votes:</h3>
            <p>{anecdotes[maxIdx]}</p>
            <p>{maxVal}</p>
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)