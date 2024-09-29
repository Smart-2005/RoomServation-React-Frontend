import Header from "../Header/Header";
import './Rooms.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import EditRoomForm from "../Edit Room Box/EditRoomForm";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function Rooms() {
    const [roomArr,setRoomArr] = useState([]);  
    const [open, setOpen] = useState(false);
    const [roomInfos,setRoomInfos] = useState({});

    const handleClickOpen = (roomNumber) => {
      setOpen(true);
      axios.get(`http://localhost:9090/api/v1/rooms/${roomNumber}`).then((response)=>{
        setRoomInfos(response.data);
      })
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        axios.get('http://localhost:9090/api/v1/rooms/allrooms').then((response)=>{
            setRoomArr(response.data.data); 
        })
    },[])


    const deleteRoom=(roomId)=>{
        //eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure?")){
            axios
            .delete(`http://localhost:9090/api/v1/rooms/deleteroom/${roomId}`)
            .then(() => {
                alert("Room deleted successfully!")
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error deleting room:", error);
            });
        }
    }

    return(
        <div  className="rooms-main">
            <div>
            <Header/>
            </div>

            <div style={{padding:'10px'}} >
                <Paper sx={{ width: '100%', overflow:'hidden' }}>
                    <TableContainer sx={{ maxHeight: 550, scrollbarWidth:'none'}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow style={{fontWeight:'bold'}}>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Room Id</TableCell>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Room Number</TableCell>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Room Description</TableCell>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Room Type</TableCell>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Room Capacity</TableCell>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Total Price</TableCell>
                                    <TableCell style={{fontWeight:'bold',textAlign:'center'}}>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roomArr.map((roomDetails,index)=>(
                                <TableRow hover role="checkbox" key={index} >
                                    <TableCell style={{textAlign:'center'}}> {roomDetails.roomId} </TableCell>
                                    <TableCell style={{textAlign:'center'}}> {roomDetails.roomNumber} </TableCell>
                                    <TableCell style={{textAlign:'center'}}> {roomDetails.roomDescription} </TableCell>
                                    <TableCell style={{textAlign:'center'}}> {roomDetails.roomType} </TableCell>
                                    <TableCell style={{textAlign:'center'}}> {roomDetails.roomCapacity} </TableCell>
                                    <TableCell style={{textAlign:'center'}}> Rs. {roomDetails.roomPrice} </TableCell>
                                    <TableCell style={{textAlign:'center'}}>
                                        <Button style={{margin:'5px'}} onClick={()=>deleteRoom(roomDetails.roomId)} variant="outlined" color="error">Delete</Button>
                                        <Button style={{margin:'5px'}} onClick={()=>handleClickOpen(roomDetails.roomNumber)} variant="outlined" color="info">Edit</Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <p style={{color:'white'}}> *You can't change the prices and capacity</p>
            </div>
            <Dialog maxWidth='xl' 
                open={open}
                //TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">

                <DialogTitle fontWeight="bold" align="center">{"Room Editing Form"}</DialogTitle>
                <DialogContent>
                    <EditRoomForm 
                        roomId={roomInfos.roomId}
                        roomType={roomInfos.roomType}
                        roomNumber={roomInfos.roomNumber}
                        roomDescription={roomInfos.roomDescription}
                        roomCapacity={roomInfos.roomCapacity}
                        roomPrice={roomInfos.roomPrice} />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancle</Button>
                    <Button>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Rooms;