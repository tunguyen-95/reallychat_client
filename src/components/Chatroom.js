import React, { Component } from 'react'
import {url} from '../constants'
import ChatroomForm from './ChatroomForm'
import {connect} from 'react-redux'
import {addMessages} from '../actions'

export class Chatroom extends Component {

    source = new EventSource(`${url}/stream`)

    state = {
        messages: []  //store messages in local state
    }

    componentDidMount(){
        console.log('component did mount', this.source)
        this.source.onmessage = (event)=>{
            console.log('got an event?', event.data)//data sent by the server
            const messages = JSON.parse(event.data)
            console.log('data is:', messages)
            this.props.addMessages(messages)
        }
    }

    render() {
        console.log('local state is: ', this.state)
        return (
            <div>
                <h1>Allan's fun chat</h1>
                <img src=" />
           <ul>
            {this.props.messages.map((message) =>{
                return (<li key={message.id}>{message.message}</li>)
            })}
            </ul>
            <ChatroomForm />
            </div>
            
        )
    }
}
function mapStateToProps(reduxStore){
    console.log('hello from mapStatetoProps', reduxStore)
    return {
        messages: reduxStore.messages
    }
}
const mapDispatchToProps = {addMessages}
export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)