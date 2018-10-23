import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.css';
class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            serverItems :['1','2','3']
        }
    }
    checkEndPoint(){
        var request = require('request');
        request('https://ord.dev.stackworx.io/health', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
        this.interval = setInterval(()=>{
            //check status
            //set status
            //set block color
            }
            )
    }

    addEndPoint(e){
       e.preventDefault();
       const{serverItems}=this.state;
       const newItem=this.newItem.value;
       const isOneTheList =serverItems.includes(newItem)
        if(isOneTheList){
            this.setState({
                message: 'This item is already on the list'
            })
        }else{

            newItem !== '' &&this.setState({
                serverItems:[...serverItems,newItem],
                message:''
            });
        }
        this.addForm.reset();
    }
    removeItem(item){
        const newServerEndPoints= this.state.serverItems.filter(serverItems=>{
            return serverItems !== item;
        })
        this.setState({
            serverItems: [...newServerEndPoints]
        })
        if(newServerEndPoints.length===0){
            this.setState({
                message:'There are no more items to display in the list'
            })
        }
    }
    clearItems(){

        this.setState({
           serverItems: [],
            message:'There is no server items to be tested'
        })
    }
    render(){
    const {serverItems,message}=this.state;
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
              {
                  message !== '' && <p className="message text-danger" >{message}</p>
              }
              {
                  serverItems.length>0&&
                  <table className="table">
                      <caption>Server End Points</caption>
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>url</th>
                          <th>status</th>
                          <th>Remove</th>
                      </tr>
                      </thead>
                      <tbody>

                      {
                          //change to block
                          serverItems.map(item=>{
                              return(<tr key={item}>
                                      <th>1</th>
                                      <td>{item}</td>
                                      <td>{item}</td>
                                      <td className="text-right">
                                          <button onClick={(e)=>this.removeItem(item)} type="button"
                                                  className="btn btn-default btn-sm"
                                          >Remove</button>
                                      </td>
                                      <td className="text-right">
                                          <button onClick={(e)=>this.checkEndPoint()} type="button"
                                                  className="btn btn-default btn-sm"
                                          >Check Status</button>
                                      </td>

                                  </tr>
                              )
                          })}

                      </tbody>
                      <tfoot>
                        <tr>
                            <td colSpan="2">&nbsp;</td>
                            <td>
                                <button
                                    onClick={(e)=>this.clearItems()}
                                    type ="button"
                                    className="btn btn-default btn-sm"
                                >Clear All</button>
                            </td>
                        </tr>
                      </tfoot>


                  </table>
              }

          </div>
      </div>
    );
  }
}


export default App;
