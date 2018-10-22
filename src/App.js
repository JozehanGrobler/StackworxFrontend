import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            serverItems :['1','2','3']
        }
    }
    addEndPoint(e){
       e.preventDefault();
       const{serverItems}=this.state;
       const newItem=this.newItem.value;

       this.setState({
           serverItems:[...this.state.serverItems,newItem]
       });

        this.addForm.reset();
    }
    render(){
    const {serverItems}=this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <form ref={input=>{this.addForm=input}} className="form-inline" onSubmit={(e)=>{this.addEndPoint(e)}}>
              <div className="form-group">
                  <label className="sr-only" htmlFor="newItemInput">Add new Item</label>
                  <input ref={input=>{this.newItem=input}} type="text" placeholder="Bread" className="form-control" id="newItemInput"/>
              </div>
              <button type="submit" className="btn btn-primary">Add</button>
          </form>
          <div className="content">
              <table className="table">
                  <caption>Server End Points</caption>
                      <thead>
                          <th>#</th>
                          <th>url</th>
                          <th>status</th>
                      </thead>
                    <tbody>

                        {
                            serverItems.map(item=>{
                                return(<tr key={item}>
                                        <th>1</th>
                                        <td>{item}</td>
                                        <td>{item}</td>
                                        <td>Button</td>

                                    </tr>
                                )
                            })}

                    </tbody>


              </table>
          </div>
      </div>
    );
  }
}


export default App;
