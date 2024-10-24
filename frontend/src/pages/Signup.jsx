import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

  const [nameValue, setnameValue] = useState("")
  const [emailValue, setemailValue] = useState("")
  const [passwordValue, setpasswordValue] = useState("")

  console.log(nameValue, emailValue, passwordValue)

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const signInDAta = {
        name: nameValue,
        email: emailValue,
        password: passwordValue
      }

      const url = "http://localhost:3000/auth/signup"
      let data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInDAta)
      })
      let resopnse = await data.json()
      console.log(resopnse)
      setnameValue("")
      setemailValue("")
      setpasswordValue("")
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSignup}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Signup here</h3>
        <InputContainer>
          <label htmlFor="name">Name:</label>
          <input
            value={nameValue}
            onChange={(e) => { setnameValue(e.target.value) }}
            type="text"
            name='name'
            placeholder='Enter name here'
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="email">Email:</label>
          <input
            value={emailValue}
            onChange={(e) => { setemailValue(e.target.value) }}
            type="email"
            name='email'
            placeholder='Enter email here'
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Password:</label>
          <input
            value={passwordValue}
            onChange={(e) => { setpasswordValue(e.target.value) }}
            type="password"
            name='password'
            placeholder='Enter password here'
          />
        </InputContainer>
        <StyledButton type='submit'>signup</StyledButton>
      </LoginForm>
      <span>
        have an account? <Link to='/login'>Log In</Link>
      </span>
    </Container>
  );
};

const Container = styled('div')`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
justify-content: center;
background-color: #f7f7f7;
`;

const LoginForm = styled('form')`
width: 25rem;
display: flex;
flex-direction: column;
gap: 15px;
align-items: center;
padding: 20px;
border: 1px solid #ccc;
border-radius: 10px;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
background-color: white;
`;

const InputContainer = styled('div')`
width: 100%;
display: flex;
flex-direction: column;
gap: 5px;

label {
    font-weight: 600;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border 0.3s;

    &:focus {
        border-color: purple;
        outline: none;
    }
}
`;

// Button ko yahan hi modify kiya
const StyledButton = styled('button')`
width: 30%;
padding: 10px;
background-color: purple;
color: white;
font-weight: 800;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s, transform 0.2s;

&:hover {
    background-color: darkviolet;
    transform: scale(1.05);
}

&:active {
    transform: scale(0.95);
}
`;

export default Signup
