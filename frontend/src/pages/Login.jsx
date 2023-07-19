import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
height: calc(100vh-56px);
background-color: ${({ theme }) => theme.bgLighter};
border: 2px solid ${({ theme }) => theme.soft};
padding: 20px 50px;
gap: 10px;
`;

const Title = styled.h1`
font-size: 20px;
`;

const SubTitle = styled.h2`
font-size: 24px;
font-weight: 300;
`;

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
display: flex;
margin-top: 10px;
font-size: 15px;
color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.span`
margin-left: 50px;
`;

const Link = styled.span`
margin-left: 30px;
`;

const Login = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const resp = await axios.post("http://localhost:4000/api/auth/signin", { email, password });
            const json = await resp.json();
            localStorage.setItem("token", json.authtoken);
            dispatch(loginSuccess(resp.data));
            navigate('/');

        } catch (error) {
            dispatch(loginFailure());
        }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider).then((result) => {
            axios.post("http://localhost:4000/api/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
            }).then((resp) => {
                const json = resp.json();
                dispatch(loginSuccess(resp.data))
                localStorage.setItem("token", json.authtoken);
                navigate('/');
            })
        }).catch((error) => {
            dispatch(loginFailure());
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const resp = await axios.post("http://localhost:4000/api/auth/signup", {
                body: JSON.stringify({ name, email, password })
            }
            );
            const json = await resp.json();
            dispatch(loginSuccess(resp.data));
            localStorage.setItem("token", json.authtoken);
            navigate('/');

        } catch (error) {
            dispatch(loginFailure());
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>Signin</Title>
                <SubTitle>to continue to YouTube2.0</SubTitle>
                <Input placeholder='Email ID' onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignin}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Signin with Google</Button>
                <Title>or</Title>
                <Input placeholder='username' onChange={e => setName(e.target.value)} />
                <Input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignup}>Sign up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default Login