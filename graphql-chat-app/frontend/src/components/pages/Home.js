import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let name = localStorage.getItem('name');
  let navigate = useNavigate();
  useEffect(() => {
    if (name) {
      navigate('/chats');
    }
  });

  const handleOnSubmit = e => {
    localStorage.setItem('name', e.target[0].value);
  };
  return (
    <Form
      style={{ maxWidth: '75%', display: 'inline-block' }}
      onSubmit={handleOnSubmit}
    >
      <br />
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder='Enter name' />
      </Form.Group>
      <br />
      <Button variant='primary' type='submit'>
        Enter
      </Button>
    </Form>
  );
};

export default Home;
