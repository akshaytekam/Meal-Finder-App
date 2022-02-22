import React from 'react'
import '../Home.css'
import '../App.css'
import { useState, useRef } from 'react';
import SearchResult from './SearchResult';
import Dish from './Dish';
import logo from '../images/eatingme.jpg';
import logo2 from '../images/eatingme2.jpg';


export default function Home() {
    const [keyword, setKeyword] = useState('')
    const [meals, setMeals] = useState([]);
    const [currentDish, setCurrentDish] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [showDish, setShowDish] = useState(false)
    const resultHeading = useRef()
    const search = async (e) => {
        e.preventDefault();
        if (keyword == '') {
            alert('Please enter a dish name.');
            return;
        }
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + keyword)
            const data = await response.json();
            if (data.meals === null) {
                resultHeading.current.textContent = `No such search item please Try again!`;
                return;
            }
            setMeals(data.meals);
            setShowResult(true)
            setShowDish(false)
            setKeyword('')
            resultHeading.current.textContent = `Search result for '${keyword}':`;
        } catch (error) {
            console.log(error);
        }
    }


    const random = async () => {
        try {
            setMeals([])
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php' + keyword)
            const data = await response.json();
            setCurrentDish(data.meals[0]);
            setShowDish(true)
            setShowResult(false)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container">
            
            <h1>Meal Finder</h1>
            <div style={{backgroundColor: 'white', width: 1370}}>
            <img src={logo} alt="Logo" style={{ resizeMode: "contain",
            height: 100,
            width: 120
          }} />
          <img src={logo2} alt="Logo" style={{ resizeMode: "contain",
            height: 100,
            width: 120
          }} />
          </div>
          <br/>
            <div className="flex">
            
                <form className="flex" id="submit" onSubmit={search}>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search for meals or keywords" />

                    <button className="search-btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </form>
                <button className="random-btn" id="random" onClick={random}>
                    <i className="fa fa-random" aria-hidden="true"></i>
                </button>
            </div>

            {
                showResult ? <><div id="result-heading"><h2 ref={resultHeading}></h2></div><SearchResult meals={meals} /></> : null
            }
            {
                showDish ? <Dish meal={currentDish} /> : null
            }
        </div>
    )
}