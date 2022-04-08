import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../graphql';
import './AddMessage.scss'

const AddMessage = () => {
  let input;
  let name = localStorage.getItem('name')
  const [sendMessage, { loading, error }] = useMutation(ADD_MESSAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <form
        style={{ maxWidth: '75%', display: 'inline-block' }}
        onSubmit={e => {
          e.preventDefault();
          sendMessage({
            variables: { from: name, message: input.value },
          });
          input.value = '';
        }}
      >
        <div>
          <h1>Your Message</h1>
          <input
            ref={node => {
              input = node;
            }}
            placeholder='Enter message'
          />
        </div>
        <br />
        <button className='message-submit' type='submit'>
          Enter
        </button>
      </form>
    </div>
  );
};

export default AddMessage;
