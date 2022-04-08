import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { MESSAGES_SUBSCRIPTION, CHAT_MESSAGES } from '../graphql';
import './ChatMessage.scss'

const ChatMessages = () => {
  const [chats, setChats] = useState('');
  const { subscribeToMore, loading, error, data } = useQuery( CHAT_MESSAGES, {
    onCompleted: (data) => {
    setChats(data.chats)
  }});


  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageSent;
        return {
          chats: [...prev.chats, newFeedItem],
        };
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  const onChange = e => {
    const copies = [...data.chats];
    if (e.target.value !== '') {
      setChats(
        copies.map(copy => {
          let highlight = copy.message.replace(
            new RegExp(e.target.value, 'gi'),
            match =>
              `<mark style="background-color:yellow; padding:0em">${match}</mark>`
          );
          return {
            ...copy,
            message: highlight,
          };
        })
      );
    } else {
      setChats('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className='chat-message-container'>
      {chats ? (
        <div className='card-container'>
          {chats.map(chat => (
            <div
              key={chat.id}
              className='chat-cards'
            >
              <div
                className='individual-chat-card'
                style={{ width: '10rem', height: '5rem' }}
              >
                <h1 style={{ color: 'blue', height: '5px'}}>{chat.from}:</h1>
              </div>
              <p dangerouslySetInnerHTML={{ __html: chat.message }} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {data.chats.map(chat => (
            <div
              key={chat.id}
              className='chat-cards'
            >
              <div
                className='individual-chat-card'
                style={{ width: '10rem', height: '5rem' }}
              >
                <h1 className='card-header' style={{ color: 'red', height: '5px' }}>{chat.from}:</h1>
                <p style={{ color: 'red', height: '10px' }}>{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <br />
      <h1>Filter Messages:</h1>
      <input list='select' name='select' onChange={onChange} />
      <datalist className='form-control' id='select' style={{ display: 'none' }}>
        {data.chats.map((item, i) => (
          <option style={{ display: 'none' }} key={i}>
            {item.message}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default ChatMessages;
