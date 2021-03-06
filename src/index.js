
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@react95/core'
import { Modal } from '@react95/core'
import { Fieldset } from '@react95/core'
import { Utils } from './utils'
import './index.css';




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
 
 