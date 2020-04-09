import React from 'react';

class Counter extends React.Component {
  
  state = {
    num: 0
  }

  onIncrement = () => this.setState({num : this.state.num + 1});
  onDecrement = () => this.setState({num : this.state.num - 1});
  onReset = () => this.setState({num : 0});
 
  render() {
      return (
        <div class = 'Counter'>
          <div id='num'> {this.state.num} </div>
          <button class='btn' onClick={this.onIncrement}>Increment</button>
          <button class='btn' onClick={this.onDecrement}>Decrement</button>
          <button class='btn' onClick={this.onReset}>Reset</button>
        </div>
      );
    }
};

export default Counter;