
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@react95/core'
import { Modal } from '@react95/core'
import { Fieldset } from '@react95/core'

import './index.css';


const Utils = {  
  mark : (x)=> x ? 'X' : 'O',
  fimDeJogo : function(squares){
      return squares.filter((x)=>x===null).length === 0
  },
  verificaVencedor : function (squares) {
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
}



  function Square(p) {
    return <Button onClick={p.onClick} value={(p.value!=null?p.value:'•')}></Button>    
  }
  
  class Board extends React.Component {
    constructor(p){
        super(p)
        this.state = {
            squares  : Array(9).fill(null),
            xProximo : true
        }
    }
    handleClick(i){
        const sq = this.state.squares.slice()
        if (Utils.verificaVencedor(sq) || sq[i]) {
          return
        }
        sq[i] = Utils.mark(this.state.xProximo)
        this.setState({
            squares  : sq,
            xProximo : !this.state.xProximo
        })

    }
    renderSquare(i) {
    return (<Square value={this.state.squares[i]}
                    onClick = {()=>this.handleClick(i)} />)
    }
  
    render() {
      const vencedor = Utils.verificaVencedor(this.state.squares)
      const acabou   = Utils.fimDeJogo(this.state.squares)
      let status
      if (vencedor){
        status = vencedor.concat(' venceu!!!')
      }else{
        if (acabou){
            status = 'Jogo sem vencedor :/'
        }else{
            status = 'Próximo: '.concat(Utils.mark(this.state.xProximo))
        }
      }
  
      return (
        <Modal title='Partida Velha' width= {250} height={200} icon="logo">
          <Fieldset legend={status}>
          {/*  <WindowHeader>{status}</WindowHeader>*/}
          <div className="status"></div>                    
          {/*<div className="board-row">*/}
          <div>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          </Fieldset>
        </Modal>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
 
 