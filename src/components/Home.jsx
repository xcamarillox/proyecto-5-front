import { useState, useEffect } from "react";
import { Input, Carousel, Card, Button } from 'antd';

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";
import logo from "../../assets/flixbuster_logo.png"
import text from "../../assets/flixbuster_text.png"
import MovieCardItem from "./MovieCardItem";
import SelectInputSearch from "./SelectInputSearch";

const Home = (props) => {
    const { 
        _trendMovies:[trendMovies, setTrendMovies],
    } = getContextType('MoviesContext');
    const getTrendMovies = async () =>{
        try{
            let response;
            if (trendMovies.length!=0) response = trendMovies;
            else{
                response = await getAPIdata({
                    type: ACTIONS_LIST.SEARCH_TRENDS
                })
                //console.log('API',response);
                if (!(response && response.success!==false)) {
                    throw new Error('Error del servidor');
                }
                setTrendMovies(response.results);
            }
            //console.log(response)
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        getTrendMovies()
    },[])

    return (
        <>  
            <div style={{ display: 'flex', justifyContent:'center', width:'100%', padding:30 }}>
                <Card cover={
                    <Carousel autoplay>
                        <div><img src={ logo } style={{ maxWidth:829, width:'100%' }} /></div>
                        <div><img src={ text } style={{ maxWidth:829, width:'100%' }} /></div>
                    </Carousel>
                } 
                style={{ maxWidth:829, width:'100%', backgroundColor:'#2E3696' }} 
                bordered={false}>
                    <SelectInputSearch handleSearch={props.handleSearch} isJumbotronItem={true}/>
                </Card>
            </div>
            <h1 style={{ textAlign:'center', marginTop: 30, color:'#2E3696' }}>Trending Movies</h1>
            <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', gap:'20px', padding: 30 }}>
                { trendMovies.map((movie, index) => <MovieCardItem movie={movie} key={ index } />) }
            </div>
        </>
    )
}

export default Home;