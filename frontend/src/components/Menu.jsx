import React from 'react';
import styled from "styled-components";
import LogoImage from "../img/logo.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Container = styled.div`
flex:1;
background-color:${({ theme }) => theme.bgLighter};
height:100vh;
color:${({ theme }) => theme.text};
position: sticky;
top: 0;
`;

const Wrapper = styled.div`
padding:16px 22px;
font-size: 22px;
`;

const Logo = styled.div`
display:flex;
align-items: center;
gap:5px;
font-weight:bold;
margin-bottom:25px;
`;

const Img = styled.img`
height:25px;
`;

const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0px;

&:hover{
  background-color: ${({ theme }) => theme.soft};
}
`;

const Hr = styled.hr`
margin : 15px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid skyblue;
color: skyblue;
border-radius: 3px;
font-weight: 500;
margin-top: 1px;
cursor: pointer;
display: flex;
align-items: center;
gap:5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {

  const { currentUser } = useSelector(state => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>
            <Img src={LogoImage} />
            YouTube2.0
          </Logo>
        </Link>

        <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>

        <Link to="trends" style={{ textDecoration: 'none', color: "inherit" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>

        <Link to="subscriptions" style={{ textDecoration: 'none', color: "inherit" }}>
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>

        <Hr />

        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Hr />
        {!currentUser &&
          <>
            <Login>
              Sign in to like videos, comment and subscribe.
              <Link to="signin" style={{ textDecoration: 'none' }}>
                <Button><AccountCircleIcon />Sign in</Button>
              </Link>
            </Login>
            <Hr />
          </>
        }
        <Title>Best of YouTube2.0</Title>
        <Item>
          <LibraryMusicIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsIcon />
          Gaming
        </Item>
        <Item>
          <MovieCreationIcon />
          Movies
        </Item>
        <Item>
          <ArticleIcon />
          News
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <FlagIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container >
  )
}

export default Menu