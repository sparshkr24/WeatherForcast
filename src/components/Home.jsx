import React from 'react'
import {useState,useRef} from "react"
import Card from '../components/Card'
import FetchAPI from '../API/FetchAPI';

function Home() {
    let [data ,setData ] = useState(false)
    let textinput = useRef(null)
    var dataAvailable=false;
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("this is ref", textinput.current.value)
        await FetchAPI(textinput.current.value)
            .then((response) => {
                console.log(" asdlkj fetch request has been trigred") 
            setData(response)
            })
            .catch((error) => {
            // if a promise is rejected means city has found if the cod is 404
            console.log(error)
            // console.log(error.message)
            })
    }
    return (
        
        <>
        {/* Search Box */}
        <form onSubmit={handleSubmit}>
        <div class="bg-white p-3 bg-opacity-80 rounded-3xl flex flex-row h-16 items-center shadow-md w-fit mx-auto">
            <input type="search" ref={textinput} name="serch" placeholder="Enter Your City Name" class="h-full text-center flex flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"/>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="flex mx-3 hover:cursor-pointer" onClick={handleSubmit}>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
            </svg>
            
        </div>
        </form>

        <div class="p-3 h-full align-centre lg:flex sm:grid-cols-3 sm:gap-3 sm:grid items-center justify-evenly align-centre">
            {/* {data && <Card data={data.daily[0]} lon={data.lon} lat={data.lat} city={textinput.current.value} /> } */}
            {
            ( data)?
            data.daily.map(function (dailyData,index){
                // console.log(data,data.hasOwnProperty("message") ,  ( data && !(data.hasOwnProperty("message") ) ))
                dataAvailable = false;
                if(index<=2){
                 dataAvailable = true;
                }
                if(index>=5){
                return null
                }
                return (
                <Card data={dailyData} lon={data.lon} lat={data.lat} city={textinput.current.value} dataAvailable={dataAvailable} /> 
                )
            }):null
            }
        </div>
        </>

    )
}

export default Home
