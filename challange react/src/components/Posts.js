import React from 'react';

import './Post.css'


import Comments from './Comments'

function Posts ({user}) {
  return(
  <div key={user.id} className="post">
    
    <div className="post-header">
      <img src={user.author.avatar} alt=""/>

      <div className="post-header-details">
        <h3>{user.author.name}</h3>
        <p>{user.date}</p>
      </div>
    </div>

    <p>{user.content}</p>

    <hr />

    {user.comments.map(com => (
     <Comments key={com.id} com={com}/>
    ))}

  </div>
  )
}

export default Posts;