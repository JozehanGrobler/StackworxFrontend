import React, { Component } from 'react';

var request = require('request');

function checkEndPoint(url, context) {
    request(url, function (error, response, body) {
        console.log(error);
        if(response&&response.statusCode===200){
            //show site is running
            //make green
            console.log("Console was here")
            context.setState({
                color: 'serverUpBlock'
            })
        }else if(error !== null){
            console.log("Console was here");
           context.setState({
               color: 'serverDownBlock'
           })
        }
        else if(response&&response.statusCode===503){
            context.setState('serverDownBlock')
        }
    })
}

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
        }
    }

    componentDidMount() {
        checkEndPoint(this.props.url, this);
    }

    render() {
        return (
        <tr>
            <td >
                <div className={this.state.color} >
                    <p>{this.props.url}</p>
                    <button onClick={(e)=>this.removeItem(this)} type="button"
                    className="btn btn-default btn-sm"
                    >Remove</button>
                </div>
            </td>
            {/*<td className="text-right">*/}
            {/*<button onClick={(e)=>this.removeItem(item)} type="button"*/}
            {/*className="btn btn-default btn-sm"*/}
            {/*>Remove</button>*/}
            {/*</td>*/}
        </tr>
    )

    }

}

export default TableRow;
