import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  // 传值 props.value，传方法 props.onClick()
  return (
    <button
      className="square"
      onClick={props.onClick}
      // onClick={() => {
      //   props.onClick();
      // }}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    // 传递参数
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      winner: null,
      stepNumber: 0,
    };
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  handleClick(i) {
    const history = [...this.state.history];
    const current = history[history.length - 1];
    const squaresValue = { ...current.squares };
    if (this.state.winner || squaresValue[i]) {
      console.log("不可落子");
      return;
    }
    squaresValue[i] = this.state.xIsNext ? "X" : "O";
    const winner = calculateWinner(squaresValue);
    this.setState({
      history: [
        ...history,
        {
          squares: squaresValue,
        },
      ],
      xIsNext: !this.state.xIsNext,
      winner,
    });
    console.log("new history", this.state.history);
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = this.state.winner;
    const status = winner
      ? `winner：${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          {/* <div>{JSON.stringify(history)}</div> */}
        </div>
      </div>
    );
  }
}
// 函数调用测试
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      a: "aaaa",
    };
  }
  f1(e) {
    console.log("取value", e.target.value);
    console.log("取this", this.state.a);
    this.setState({
      inputValue: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <p>e => this.fn(e)</p>
        <input iv={this.state.inputValue} onChange={(e) => this.f1(e)}></input>
        <p>fn.bind(this)</p>
        <input onChange={this.f1.bind(this)}></input>
        <p>这样不行 this.f1</p>
        <input onChange={this.f1}></input>
      </div>
    );
  }
}
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["a", "b"],
    };
  }
  handleDelete(i) {
    const list = [...this.state.list];
    list.splice(i, 1);
    this.setState({
      list: list,
      iv: "",
    });
  }
  render() {
    return (
      <div>
        <p>list：</p>
        <ul>
          {this.state.list.map((item, i) => {
            return (
              <li key={item} onClick={() => this.handleDelete(i)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
// 总页面渲染
class Page extends React.Component {
  render() {
    return (
      <div>
        <Game />
        <Test />
        <Todo />
      </div>
    );
  }
}
// ========================================

ReactDOM.render(<Page />, document.getElementById("root"));
// ReactDOM.render(<Game />, document.getElementById("root"));
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
