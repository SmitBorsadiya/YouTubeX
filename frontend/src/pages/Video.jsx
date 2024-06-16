import React, { useEffect, useState } from 'react';
import { format } from "timeago.js";
import { styled } from 'styled-components';
import axios from 'axios';
import Recommendation from '../components/Recommendation';
import Comments from '../components/Comments';


import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchSuccess, like, dislike, fetchFailure } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import { ThumbDown, ThumbUp } from '@mui/icons-material';

const Container = styled.div`
display: flex;
gap: 24px;
`;

const Content = styled.div`
flex: 5;
`;

const VideoWrapper = styled.div`

`;

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
`;

const Hr = styled.hr`
margin : 15px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
display: flex;
justify-content: space-between;
`;

const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`;

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
font-weight: 500;
`;

const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({ theme }) => theme.textSoft};
font-size: 12px;
`;

const Description = styled.p`
font-size: 14px;
`;

const Subscribe = styled.button`
background-color: red;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`;

const VideoFrame = styled.video`
max-height: 720px;
width: 100%;
object-fit: cover;
`;

const Video = () => {

    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoResp = await axios.get(`http://localhost:4000/api/videos/find/${path}`)
                const channelResp = await axios.get(`http://localhost:4000/api/users/find/${videoResp.data.UserId}`)

                setChannel(channelResp.data)
                dispatch(fetchSuccess(videoResp.data))
            } catch (error) {
                dispatch(fetchFailure());
            }
        }
        fetchData();
    }, [path, dispatch]);

    const handleLike = async () => {
        await axios.put(`http://localhost:4000/api/users/like/${currentVideo._id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        dispatch(like(currentUser._id))
    }

    const handleDislike = async () => {
        await axios.put(`http://localhost:4000/api/users/dislike/${currentVideo._id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        dispatch(dislike(currentUser._id));
    }

    const handleSubscribe = async () => {
        currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`http://localhost:4000/api/users/unsub/${channel._id}`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            : await axios.put(`http://localhost:4000/api/users/sub/${channel._id}`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
        dispatch(subscription(channel._id));
    }

    return (
        <Container>
            {
                <>
                    currentVideo &&
                    <Content>
                        <VideoWrapper>
                            <VideoFrame src={currentVideo?.videoUrl} controls />
                        </VideoWrapper>
                        <Title>{currentVideo?.title}</Title>
                        <Details>
                            <Info>{currentVideo?.views} views  {format(currentVideo?.createdAt)}</Info>
                            <Buttons>
                                <Button onClick={handleLike}>
                                    {currentVideo?.likes?.includes(currentUser?._id)
                                        ? (<ThumbUp />)
                                        : (<ThumbUpAltOutlinedIcon />)}{""}
                                    {currentVideo?.likes?.length}
                                </Button>
                                <Button onClick={handleDislike}>
                                    {currentVideo?.dislikes?.includes(currentUser?._id)
                                        ? (<ThumbDown />)
                                        : (<ThumbDownAltOutlinedIcon />)}{""}
                                    Dislike
                                </Button>
                                <Button><ReplyOutlinedIcon />Share</Button>
                                <Button><AddTaskOutlinedIcon />Save</Button>
                            </Buttons>
                        </Details>
                        <Hr />
                        <Channel>
                            <ChannelInfo>
                                <Image src={channel?.img} />
                                <ChannelDetail>
                                    <ChannelName>{channel?.name}</ChannelName>
                                    <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
                                    <Description>{currentVideo?.desc}</Description>
                                </ChannelDetail>
                            </ChannelInfo>
                            <Subscribe onClick={handleSubscribe}>
                                {currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                            </Subscribe>
                        </Channel>
                        <Hr />
                        <Comments videoId={currentVideo?._id} />
                    </Content>
                    <Recommendation tags={currentVideo?.tags} />
                </>
            }
        </Container>
    )
}

export default Video 