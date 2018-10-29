import React, { Component } from 'react';
//var React = require('react/addons');
var request = require('request');



class TableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: '',
            body:'',
            bShow:true,
            mes:''
        }
        this.icheckEndPoint=this.icheckEndPoint.bind(this);
        this.showLoad=this.showLoad.bind(this);
    }
    showLoad(){
        if(this.state.mes===''){
            console.log('Console was here')
            this.setState({mes:this.state.body})
        }else if(this.state.mes!=='') {
            this.setState({mes:''})
        }
    }
    icheckEndPoint(url) {
        request(url, function (error, response, body) {
            console.log(error);
            console.log(response&&response.statusCode);
            console.log(body);
            var data =JSON.stringify(response);
            if(body!=""){
                this.setState({body:data})
            }else {
                this.setState({body:"No data to display"})
            }

            if(response&&response.statusCode===200){
                //show site is running
                //make green
                this.setState({
                    color: 'serverUpBlock'
                })
            }else if(response&&[400,401,402,403,404,405,406,407,408,410,409].includes(response.statusCode)||response&&[400,401,402,403,404,405,406,407,408,410,409].includes(body)||error === 'TypeError: Failed to fetch'){
                this.setState({
                    color: 'serverDownBlock'
                })
            }
            else if(response&&[500,501,502,503,504,505,506,507,508,510,509].includes(response.statusCode)||error!==null){
                this.setState({
                    color: 'serverFailBlock'
                })
            }
        }.bind(this))}
    componentDidMount() {
        this.icheckEndPoint(this.props.url);
        this.interval =setInterval(()=>this.icheckEndPoint(this.props.url),1000*5*60);
    }

    render() {
        return (
        //{/*<tr>*/}
            <td>
                <div className={this.state.color} onClick={(e)=>this.showLoad(this)} >
                    <p className="blockLimit">{this.props.url}</p>
                    {
                        this.state.mes !== '' && <p className="message text-danger" >{this.state.mes}</p>
                    }
                </div>
            </td>
        // </tr>
    )

    }

}

export default TableRow;
