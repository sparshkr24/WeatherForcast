import React,{useState,useEffect} from 'react'
import { useParams ,Link} from "react-router-dom";
import { useLocation } from "react-router-dom"
import FetchAPI from '../API/FetchAPI';
import { AreaChart, XAxis , YAxis, CartesianGrid , Tooltip ,Area ,ResponsiveContainer } from 'recharts'


const HourlyChart = ()=> {
    let searchParams = useParams();
    let [data ,setData ] = useState(false)
    let [date ,setDate ] = useState("Date")
    let [datasets ,setDatasets ] = useState(false)
    

    useEffect(()=>{
        FetchAPI(searchParams.city)
                .then((response) => {
                setData(response.hourly)
                // console.log("data",response.hourly);
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
            // console.log(dataArr,date)
            setDatasets(dataArr)

        }
    },[data])

    return (
        <>
        <div>
            <div className="">
                <div className="flex justify-center mt-10 ">
                    <div className="bg-white bg-opacity-80 rounded-3xl w-[80%] py-8 px-4">
                        {/* back Button */}
                        <div className="flex items-center md:flex">
                            <Link to="/" className="relative p-1 rounded-full text-white focus:outline-none hover:text-red-800 ">                             
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/></svg>
                            </Link>
                        </div>
                        <div className="flex justify-center pb-5 text-lg font-semibold text-red-500 hover:text-red-600">
                            {date}
                        </div>
                        <ResponsiveContainer className="w-64" height="60%">
   
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
                        
                        </ResponsiveContainer>
                        <div className="flex justify-center pt-5 text-lg font-semibold text-red-500 hover:text-red-600">
                            Hourly temperature Chart
                        </div>

                    </div>

                </div>

            </div>

        </div>
        
        </>
    )
}

export default HourlyChart
