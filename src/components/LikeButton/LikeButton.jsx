import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LikeButton (props) {

  const gif = props.gif

  console.log(gif);

  const dispatch = useDispatch();

  const addToLikes = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SAGA/ADD_TO_LIKES',
      payload: gif
    })
  } 

  return (
    <button
    onClick = {addToLikes}>
      Add to Likes
    </button>
  )
}

export default LikeButton;