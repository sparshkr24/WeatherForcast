import React from 'react'
import {useState,useRef} from "react"
import Card from '../components/Card'
import FetchAPI from '../API/FetchAPI';
import weathersvg from "../images/weather.svg"
import notFoundsvg from "../images/notFound.svg"

function Home() {
    let [data ,setData ] = useState(false)
    let [Loading ,setLoading ] = useState(false)
    let [isSubmitted ,setIsSubmitted ] = useState(false)
    let [Error ,setError ] = useState(false)
    let textinput = useRef(null)
    var dataAvailable=false;
    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(false);
        setIsSubmitted(true)
        setLoading(true);
        // console.log("this is ref", textinput.current.value)
        await FetchAPI(textinput.current.value)
            .then((response) => {
            setData(response)
            setLoading(false);
            })
            .catch((error) => {
            // if a promise is rejected means city has found if the cod is 404
            setLoading(false)
            setError(true);
            // console.log(error);
            // console.log(error.message)
            })
    }
    return (
        
        <>
        {/* Search Box */}
        <form onSubmit={handleSubmit}>
        <div className="bg-white p-3 bg-opacity-80 rounded-3xl flex flex-row h-16 items-center shadow-md w-fit mx-auto">
            <input type="search" ref={textinput} name="serch" placeholder="Enter Your City Name" className="h-full text-center flex flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"/>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="flex mx-3 hover:cursor-pointer" onClick={handleSubmit}>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
            </svg>
            
        </div>
        </form>
        
        {
            ((!isSubmitted) && 
            <div className="px-5 py-5">
                <div className="bg-white p-10 mt-5 bg-opacity-70 rounded-3xl flex flex-col justify-evenly items-center shadow-md w-fit mx-auto">
                    <div className="mb-8 p-0 font-medium sm:text-lg text-sm text-center text-red-800 hover:text-red-600" >Enter City Name to check weather forecast for next five days</div>
                    <img src={weathersvg} alt="Enter The City Name"/>
                </div>            
            </div>    
            )
        }

        {
            ((Error  && isSubmitted ) && 
            <div className="px-5 py-5">
                <div className="bg-white p-10 mt-5 bg-opacity-70 rounded-3xl flex flex-col justify-evenly items-center shadow-md w-fit mx-auto">
                    <div className="mb-0 p-0 font-medium sm:text-lg text-sm text-center text-red-800 hover:text-red-600" >City Not Found </div>
                    <div className="mb-8 p-0 font-medium sm:text-lg text-sm text-center text-red-800 hover:text-red-600" >Please Check that You Have Spelled the City Name Correctly </div>
                    <img src={notFoundsvg} alt="City Not Found"/>
                </div>            
            </div>            
            )
        }
        
        {
            (Loading && 
                    <div className="bg-white md:px-20 md:py-32 py-20 px-10 mt-8 bg-opacity-50 rounded-3xl flex flex-col justify-evenly h-16 items-center shadow-md w-fit mx-auto">
                        <div className="loader justify-center">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
            )
        }
        
        {
            ( ( (!Loading) && isSubmitted && (!Error)) &&

                <div className="p-3 h-full align-centre lg:flex sm:grid-cols-3 sm:gap-3 sm:grid items-center justify-evenly align-centre">
                    {/* {data && <Card data={data.daily[0]} lon={data.lon} lat={data.lat} city={textinput.current.value} /> } */}
                    {
                        // (Loading && )

                    }
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
                        <Card key={dailyData.dt} data={dailyData} lon={data.lon} lat={data.lat} city={textinput.current.value} dataAvailable={dataAvailable} /> 
                        )
                    }):null
                    }
                </div>
            )
        }

        </>

    )
}

export default Home
