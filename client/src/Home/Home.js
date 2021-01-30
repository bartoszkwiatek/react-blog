import React from 'react';
import PostsList from '../PostsList/PostsList';

const Home = (props) => {
  console.log('test');
  return (
    <PostsList match={props.match}></PostsList>
  )
};

export default Home;