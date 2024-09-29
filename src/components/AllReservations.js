import Header from "./Header";
import './AllReservations.css'
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

function AllReservations() {
    const [resvArr,setResvArr] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:9090/api/v1/reservations/allreservations').then((response)=>{
            setResvArr(response.data.data);

        })
    },[])

    const deleteReservation=(reservationId)=>{
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure?")){
            axios
            .delete(`http://localhost:9090/api/v1/reservations/deletemyreservation/${reservationId}`)
            .then(() => {
                alert("Reservation deleted successfully!")
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error deleting reservation:", error);
            });
        }
    }

    return(
        <div   className="allResercation-main">
        <div>
            <Header/>
        </div>
        <div style={{padding:'20px'}} >
            <Paper sx={{ width: '100%', overflow:'hidden' }}>
                <TableContainer sx={{ maxHeight: 550, scrollbarWidth:'none'}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow style={{fontWeight:'bold'}}>
                                <TableCell style={{fontWeight:'bold'}}>Reservation Id</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Fullname</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Room Number</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Check In</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Check Out</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Contact Number</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Total Price</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resvArr.map((resvDetails,index)=>(
                            <TableRow hover role="checkbox" key={index} >
                                <TableCell> {resvDetails.reservationId} </TableCell>
                                <TableCell> {resvDetails.fullname} </TableCell>
                                <TableCell> {resvDetails.roomNumber} </TableCell>
                                <TableCell> {resvDetails.checkIn} </TableCell>
                                <TableCell> {resvDetails.checkOut} </TableCell>
                                <TableCell> {resvDetails.contactNumber} </TableCell>
                                <TableCell> Rs. {resvDetails.totalPrice} </TableCell>
                                <TableCell> <Button onClick={()=>deleteReservation(resvDetails.reservationId)} variant="outlined" color="error">Delete</Button></TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>

    </div>
    )
}

export default AllReservations;