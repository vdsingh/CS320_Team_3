import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/login.module.css'

const BoxContainer = styled.div`
    width: 30%;
    min-height: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.25);
    position: relative;
    overflow: hidden;
    position: absolute;
    top: 55%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;

const Input = styled.input`
    margin-top: 15px;
    margin-bottom: 30px;
    margin-left: 15px;
    height: 50px;
    width: 80%;
    align-self: center;
    outline: none;
    border: 3px solid rgba(200, 200, 200, .4);
    padding: 0px 10px;
    border-radius: 8px;

    &::placeholder{
        color: rgba(170, 170, 170, 1);
    }
    
    &:focus{
        outline: none; 
    }
`;
const SubmitButton = styled.button`
    margin-top: 50px;
    margin-left: 15px;
    width: 80%;
    align-self: center;
    padding: 11px ;
    color: #275947;
    font-size: 15px;
    font-weight; 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: #FFC600;
`;  
export default function LoginForm(){
    return <BoxContainer>
        <div className = {styles.heading}>
            Login
            <div className = {styles.heading2}>
                Email Address
                <Input type = 'email' placeholder='Type your email address'/>
                Password
                <Input type = 'password' placeholder='Type your password'/>
                <SubmitButton type = 'submit'>Login</SubmitButton>
            </div>
        </div>
        
    </BoxContainer>
}