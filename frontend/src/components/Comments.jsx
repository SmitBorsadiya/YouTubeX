import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Comment from './Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`

`;

const NewComment = styled.div`
display: flex;
align-items: center;
gap: 10px;
`;

const Avtar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const Input = styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
color: ${({ theme }) => theme.text};
`;


const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const resp = await axios.get(`http://localhost:4000/api/comments/${videoId}`);
        setComments(resp.data);
      } catch (error) {
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avtar src={currentUser?.img} />
        <Input placeholder='Add a comment....' />
      </NewComment>
      {comments.map(comment => (
        <Comment key={comment?._id} comment={comment} />
      ))}
    </Container>
  )
}

export default Comments