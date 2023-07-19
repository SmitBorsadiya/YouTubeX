import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import Card from './Card';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search

    useEffect(() => {
        const fetchVideos = async () => {
            const resp = await axios.get(`http://localhost:4000/api/videos/search${query}`);
            console.log(query);
            setVideos(resp.data);
        };
    }, [query]);
    return (
        <Container>
            {videos.map(video => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Search