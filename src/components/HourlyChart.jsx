import React,{useState,useEffect} from 'react'
import { useParams ,Link} from "react-router-dom";
import { useLocation } from "react-router-dom"
import FetchAPI from '../API/FetchAPI';
import { AreaChart, XAxis , YAxis, CartesianGrid , Tooltip ,Area } from 'recharts'


const HourlyChart = ()=> {
    let searchParams = useParams();
    let [data ,setData ] = useState(false)
    let [date ,setDate ] = useState("Date")
    let [datasets ,setDatasets ] = useState(false)
    

    useEffect(()=>{
        FetchAPI(searchParams.city)
                .then((response) => {
                setData(response.hourly)
                console.log("data",response.hourly);
                })
                .catch((error) => {
                // console.log(" asdlkj") 
                // if a promise is rejected means city has found if the cod is 404
                console.log(error)
                // console.log(error.message)
                })
        


    },[])

    useEffect(()=>{
        var dataArr=[];
        var dateiso ;
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const formatDate = (dateString) => {
            const options = { year: "numeric", month: "long", day: "numeric" }
            return new Date(dateString).toLocaleDateString(undefined, options)
        }
        // const datenow = 
        if(data){
            data.map((set,index)=>{
                dateiso = new Date(set.dt*1000).toISOString();
                var d = new Date(dateiso);
                var dayName = days[d.getDay()];
                const hourRepresented = new Date(dateiso).toLocaleTimeString('en',
                 { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

                if(searchParams.day=== dayName){
                    // console.log("Yeah ")
                    setDate(formatDate(dateiso))
                    dataArr.push({name:hourRepresented,temp:set.temp})

                }

            // console.log("alksjdh",new Date(dateiso).getDay() ,dayName,hourRepresented )
            })
            console.log(dataArr,date)
            setDatasets(dataArr)

        }
    },[data])

    return (
        <>
        <div>
            <div className="">
                

                <div className="flex justify-center mt-10 ">
                    <div className="bg-white bg-opacity-80 rounded-3xl py-8 px-4">
                        {/* back Button */}
                        <div class="flex items-center md:flex">
                            <Link to="/" class="relative p-1 rounded-full text-white focus:outline-none hover:text-red-800 "> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class=" fill-red-400 text-xl transition-colors duration-200 hover:fill-red-600" viewBox="0 0 1792 1792">
                                    <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                                    </path>
                                </svg>
                            </Link>
                        </div>
                        <div className="flex justify-center pb-5 text-lg font-semibold text-red-500 hover:text-red-600">
                            {date}
                        </div>

                        <AreaChart width={730} height={250} className="h-10 w-10" data={datasets}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                        </AreaChart>
                    </div>

                </div>

            </div>

        </div>
        
        </>
    )
}

export default HourlyChart
