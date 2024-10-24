import { styled } from '@mui/material/styles';
import React from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import cookies from 'js-cookie';


const Login = ({setislogIn}) => {

    const navigate = useNavigate()

    const [emailValue, setemailValue] = useState("")
    const [passowrdValue, setpassowrdValue] = useState("")

    console.log(emailValue, passowrdValue)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const LogInData = {
                email: emailValue,
                password: passowrdValue
            }

            const url = "http://localhost:3000/auth/login"
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(LogInData),
                credentials: 'include'
            })

            let response = await data.json()
            console.log(response)
            setemailValue("")
            setpassowrdValue("")

            if (response.success) {
                cookies.set('token', response.token);
                setislogIn(cookies.get('token'))
                navigate("/tasks");
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Login here</h3>

                <InputContainer>
                    <label htmlFor="email">Email:</label>
                    <input
                        onChange={(e) => { setemailValue(e.target.value) }}
                        value={emailValue}
                        type="email"
                        name='email'
                        placeholder='Enter email here'
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="password">Password:</label>
                    <input
                        onChange={(e) => { setpassowrdValue(e.target.value) }}
                        value={passowrdValue}
                        type="password"
                        name='password'
                        placeholder='Enter password here'
                    />
                </InputContainer>

                <StyledButton type='submit'>Log In</StyledButton>
            </LoginForm>
            <span>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
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

export default Login;
