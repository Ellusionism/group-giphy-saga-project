import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import LikeButton from '../../LikeButton/LikeButton.jsx';

function Search () {
    //declare react useState
    const [newSearch, setSearch] = useState('');

    //declare dispatch
    const dispatch = useDispatch();

    //suscribe to searchResults reducer
    const searchResults = useSelector(store => store.searchResults);
    const searchTerm = useSelector(store => store.searchTerm);
    
    const captureSearch = () => {
        console.log('someone is typing')
        setSearch(event.target.value);
    }

    const submitSearch = () => {
        event.preventDefault();
        console.log(newSearch);
        //dispatch to redux searchTerm
        dispatch({
            type: 'SET_TERM',
            payload: newSearch
        })
        //dispatch to saga searchResults
        dispatch({
            type: 'SAGA/FETCH_RESULTS',
            payload: newSearch
        })
    }

    return (

        <>
            <h3>Search for GIFs!</h3>
            <form onSubmit={submitSearch}>
                <input 
                    type='text'
                    placeholder='search term'
                    value={newSearch}
                    onChange={captureSearch}
                    />
                <button type= "submit">Search</button> 
                <div>
                    <h4>You searched for {searchTerm}</h4>
                    {searchResults.map((gif) => {
                        return (
                            <>
                            <img key={gif.id} src={gif.images.fixed_height.url}/>
                            <LikeButton gif={gif} />
                            </>
                        )
                    })}    
                </div>   
            </form>
        </>
    )
}

export default Search;
