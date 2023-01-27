import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './App.css'

function CategoryList (){
    const dispatch = useDispatch();
    const categories = useSelector(store.CategoryList)
    useEffect(() => {
        getCategoryList();
      }, []);

const getCategoryList = () =>{
    dispatch({
        type: "SET_CATEGORY"
    })
}

return (
    <div>
    <h3>This is the Category list</h3>
    <ul>
      {categories.map((category) => {
        return <li key={category.id}>{category.name}</li>
      })}
    </ul>
</div>
);
}
export default CategoryList; 