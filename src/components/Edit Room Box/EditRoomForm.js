import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function EditRoomForm({roomId,roomNumber,roomDescription,roomType,roomCapacity,roomPrice}){
    const [formDetails,setFormDetails] = useState({
        roomId:'',
        roomNumber:'',
        roomDescription:'',
        roomType:'',
        roomCapacity:'',
        roomPrice:''
    })
    useEffect(()=>{
        setFormDetails((prev)=>({
            ...prev,
            roomId:roomId,
            roomNumber:roomNumber,
            roomDescription:roomDescription,
            roomType:roomType,
            roomCapacity:roomCapacity,
            roomPrice:roomPrice

        }))
    },[roomId, roomNumber, roomDescription, roomType, roomCapacity, roomPrice])

    const valueChange=(e)=>{
        setFormDetails({
            ...formDetails,
            [e.target.name]:e.target.value
        })
    }

    const updateRoom =()=>{
        console.log(formDetails);
        
        axios.put('http://localhost:9090/api/v1/rooms/updateroom',formDetails).then(()=>{
            alert("Room Updated!");
            window.location.reload();
        }).catch((e)=>{
            alert(" Something Error : "+e);
        })

}
    return(
        <div style={{margin:'15px 5px',width:'600px',backgroundColor:'white',display:'flex',flexDirection:'column',gap:'15px'}}>
            <TextField value={roomId || ''} name="roomId" onChange={valueChange} id="outlined-basic" label="Room Id" variant="outlined" />
            <TextField value={formDetails.roomNumber || ''} name="roomNumber" onChange={valueChange} id="outlined-basic" label="Room Number" variant="outlined" />
            <TextField value={formDetails.roomDescription || ''} name="roomDescription" onChange={valueChange} id="outlined-basic" label="Room Description" variant="outlined" />
            <TextField value={formDetails.roomType || ''} name="roomType" onChange={valueChange} id="outlined-basic" label="Room Type" variant="outlined" />
            <TextField value={roomCapacity || ''} name="roomCapacity" onChange={valueChange} id="outlined-basic" label="Room Capacity" variant="outlined" />
            <TextField value={roomPrice || ''} name="roomPrice" onChange={valueChange} id="outlined-basic" label="Room Price" variant="outlined" />
            <Button onClick={updateRoom}>Save</Button>
        </div>
    )
}

export default EditRoomForm;