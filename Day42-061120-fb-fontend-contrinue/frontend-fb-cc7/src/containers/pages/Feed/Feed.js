import React, { useEffect, useState } from 'react';
import PostList from '../../../components/PostList/PostList';
import axios from '../../../config/axios';

function Feed() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios.get("/posts/feed")
      .then(res => {
        setPostList(res.data);
      });
  }, []);

  return (
    <div>
      <PostList postList={postList} />
    </div>
  );
}

export default Feed;
