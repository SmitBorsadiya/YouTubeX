import React, { useState } from 'react';
import { styled } from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VideoCallOutlined } from '@mui/icons-material';
import Upload from './Upload';


const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.bgLighter};
height: 56px;
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;
`;

const Search = styled.div`
width: 40%;
position: absolute;
left: 0px;
right: 0px;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid skyblue;
color: skyblue;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap:5px;
`;

const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({ theme }) => theme.text};
cursor: pointer;
`;

const Avtar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`;


const Navbar = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector(state => state.user);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder='Search' onChange={(e) => setQ(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?title=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined onClick={() => setOpen(true)} />
              <Avtar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: 'none' }}>
              <Button>
                <AccountCircleIcon />
                Sign in
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container >
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar