import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.css';
import TableRow from "./Components/TableRow";

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            topCount:0,
            serverItems :['https://cognition.dev.stackworx.cloud/api/status',
                'https://ord.dev.stackworx.io/health',
                'https://api.durf.dev.stackworx.io/health',
                'https://prima.run/health',
                'https://stackworx.io/'],
            color: 'serverUpBlock',
        }
    }

    // checkEndPoint(item){
    //     // TODO Move this to top of application
    //     var request = require('request');
    //     request(item, function (error, response, body) {
    //         if(response&&response.statusCode===200){
    //             //show site is running
    //             //make green
    //             console.log("Console was here")
    //             this.setState('serverUpBlock')
    //         }else if(error!==null){
    //             this.setState('serverDownBlock')
    //         }
    //         else if(response&&response.statusCode===503){
    //             this.setState('serverFailBlock')
    //         }
    //     });
    //
    //     this.interval = setInterval(()=>{
    //         //check status
    //         //set status
    //         //set block color
    //         }
    //         )
    // }

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
    const {serverItems,message,topCount}=this.state;
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
                          <th colSpan="1">&nbsp;</th>
                          <th>Server Blocks</th>
                      </tr>
                      </thead>
                      <tbody>
                      //TODO get items maped with new TABLEROW Element
                      {this.state.serverItems.map((item)=>{
                          <TableRow url={item}/>
                      })}
                      <TableRow url={'https://cognition.dev.stackworx.cloud/api/status'}/>
                      <TableRow url={'https://ord.dev.stackworx.io/health'}/>
                      <TableRow url={this.state.serverItems[1]}/>
                      {/*<TableRow url={item}/>*/}
                      {/*<TableRow url={item}/>*/}
                                      {/*<td className="text-right">*/}
                                          {/*<button onClick={(e)=>this.removeItem(item)} type="button"*/}
                                                  {/*className="btn btn-default btn-sm"*/}
                                          {/*>Remove</button>*/}
                                      {/*</td>*/}


                                  {/*</tr>*/}

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
