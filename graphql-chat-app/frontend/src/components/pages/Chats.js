import React from 'react'
import AddMessage from '../AddMessage'
import ChatMessages from '../ChatMessages'

const Chats = () => {
    let name = localStorage.getItem('name')
  return (
    <div>
        <h1>{name}'s Messages</h1>
        <ChatMessages/>
        <AddMessage/>
    </div>
  )
}

export default Chats
