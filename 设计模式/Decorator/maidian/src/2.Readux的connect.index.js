import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * 1. 在react中 react-redux高祖组件就是装饰器
 */
function connect(maoStateToProps, mapDispathcToProps) { 
    return function (Target) { 
        return class extends React.Component { 
            render() { 
                console.log('WrappedTarget render');
                return <Target/>
            }
        }
    }
}

const maoStateToProps = state => state;
const mapDispathcToProps = dispatch => ({ })
@connect(maoStateToProps, mapDispathcToProps)
class App extends React.Components {

  render() { 
    return <div></div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));