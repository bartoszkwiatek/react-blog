import React from 'react';
import PostsList from '../PostsList/PostsList';

const Home = (props) => (
  <PostsList match={props.match}></PostsList>
);

export default Home;