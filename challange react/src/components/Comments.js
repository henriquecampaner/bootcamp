import React from 'react';

import './Comments.css'

function Comments ({com}) {
  return(
    <div key={com.id} className="comments">

      <div className="comments-header">

        <div className="comments-header-img">
         <img src={com.author.avatar} />
        </div>

        <div className="comments-header-details">
          <h4>{com.author.name}</h4>
          <p>{com.date}</p>
        </div>

      </div>

      <div className="comments-details">
        <p>{com.content}</p>
      </div>
    </div>
  )
}

export default Comments;