import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';



function LikeList() {
    const dispatch = useDispatch();

    const fetchLikes = useSelector(store => store.fetchLikes);

    useEffect(() => {
        // Yell at Sagas to run a function that'll GET like
        // data from our server/db:
        dispatch({
          type: 'SET_LIKES'
        })
    }, []); 

    return (
        <div>
            <h3>This is the image list</h3>
            <ul>
              {fetchLikes.map((likes) => {
                return <li key={likes.id}>{likes.name}</li>
              })}
            </ul>
        </div>
    );
}

export default LikeList;
