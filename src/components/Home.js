import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import "./Home.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {


    const getUserRole=()=>{
        const token = localStorage.getItem('token');
        console.log(token);
        
        if(!token){
            return null
        }
        const decodeToken = jwtDecode(token);
        const role = decodeToken.userRoles[0];
        console.log(role);
        
        return role;
    }

    const[roomsCount,setRoomsCount] = useState(0);
    const[actualRoomCount,setActualRoomCount] = useState(null);

    const[roomTypesCount,setRoomTypesCount] = useState(0);
    const[actualRoomTypesCount,setActualRoomTypesCount] = useState(null);

    const getCountOfRooms=()=>{
        axios.get('http://localhost:9090/api/v1/rooms/count').then((res)=>{
            setActualRoomCount(res.data)  
        }).catch((e)=>{
            console.log(e);
        })
    }
    const getCountOfRoomTypes=()=>{
        axios.get('http://localhost:9090/api/v1/rooms/roomtypes/count').then((res)=>{
            setActualRoomTypesCount(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(()=>{
        getCountOfRooms(); 
        getCountOfRoomTypes();
    },[])

    useEffect(()=>{

        if (actualRoomCount !== null) {
            const interval = setInterval(()=>{
                setRoomsCount((prevCount)=>{
                    if (prevCount<actualRoomCount) {
                        return prevCount+1;
                    }else{
                        clearInterval(interval);
                        return prevCount;
                    }
                })
            },60)
        }
    },[actualRoomCount])

    useEffect(()=>{
        if (actualRoomTypesCount !== null) {
            const interval = setInterval(()=>{
                setRoomTypesCount((prevCount)=>{
                    if (prevCount<actualRoomTypesCount) {
                        return prevCount+1;
                    }else{
                        clearInterval(interval);
                        return prevCount;
                    }
                })
            },250)
        }
    },[actualRoomTypesCount])
    return(
        <div className="home-main">
                <div className="header">
                    <Header/>
                </div>
                {/* <button onClick={getUserRole}>Click Me</button> */}
                
                <div className="main-content">
                    <p className="cOne" >The World</p>
                    <p className="cTwo" >Finest Hotel</p>
                    <p className="cThree"> Lorem ipsum odor amet, consectetuer adipiscing elit. Sit adipiscing interdum tellus erat tincidunt rutrum quisque. Molestie justo ex hendrerit accumsan elementum at. Sodales finibus lacus; aenean nullam morbi porta. </p>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div className="details-card">
                        <div className="contents-grid"> 
                            <span>
                                <img style={{width:'35px',height:'40px',padding:'15px'}} src="bed.png" alt=""></img>
                            </span>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <span style={{fontSize:'28px'}}> {roomsCount} </span>
                                <span style={{fontSize:'23px',marginTop:'-13px'}}>Rooms</span> 
                            </div>
                        </div>
                        <div className="contents-grid">   
                            <span>
                                <img style={{width:'35px',height:'40px',padding:'15px'}} src="room-key.png" alt="" ></img>
                            </span>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <span style={{fontSize:'28px'}}> {roomTypesCount} </span>
                                <span style={{fontSize:'23px',marginTop:'-13px'}}>Room Types</span> 
                            </div>
                        </div>
                        <div className="contents-grid">                        
                        <span>
                                <img style={{width:'30px',height:'30px',padding:'15px'}} src="feedback.png" alt=""></img>
                            </span>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <span style={{fontSize:'28px'}}>3.5K+</span>
                                <span style={{fontSize:'23px',marginTop:'-13px'}}>Reviews</span> 
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Home;