import Header from '../Header/Header'
import './MyReservation.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';

function MyReservation(){

    const textFieldStyle = {
        paddingBottom:'10px',
        width:'100%',
    }
    const boxStyle = {
        '& > :not(style)': { m: 1, width: '25ch' },
        color:'black',
        width:'85%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    }
    const datePickerStyle = {
        overflow:'none',minWidth:'100%',display:'flex',alignItems:'center',justifyContent:'space-evenly'
    }

    const [reservationId,setReservationId] = useState('');

    const [formData,setFormData] = useState({
        fullname:'',
        email:'',
        contactNumber:'',
        roomType:'',
        checkIn:null,
        checkOut:null,
        totalPrice:''
    })
    const handleReservationId =(e)=>{
        setReservationId(e.target.value)
    }

    const getMyReservation =(e)=> {
        axios.get(`http://localhost:9090/api/v1/reservations/myreservation/${reservationId}`).then((resp)=>{
            const reservationDetails = resp.data.data;
            setFormData({
                fullname:reservationDetails.fullname,
                email:reservationDetails.email,
                contactNumber:reservationDetails.contactNumber,
                roomType:reservationDetails.roomType,
                checkIn:reservationDetails.checkIn,
                checkOut:reservationDetails.checkOut,
                totalPrice:reservationDetails.totalPrice,
            })
        });
    }
    return(
        <div  className="myReservation-main">
            <div> <Header/> </div>
            <div className='myRes-form-body'>
                <div style={{paddingTop:'15px'}}>
                    <h1>Check My Reservation</h1>
                </div>
                <Box className='form-box'
                    component="form"
                    sx={boxStyle}
                    noValidate>
                    <div style={{display:'flex',width:'100%'}}>
                    <TextField onChange={handleReservationId}  name='reservationId' className='form-inputs'style={textFieldStyle} id="standard-basic" label="Reservation Id" variant="standard" /> 
                    <button type='button' onClick={getMyReservation} className='checkBtn'>Check</button>
                    </div>
                    <TextField value={formData.fullname} inputProps={{readOnly:true}}  name='fullname' className='form-inputs'style={textFieldStyle} id="standard-basic" label="Full Name" variant="standard" />
                    <TextField value={formData.email} inputProps={{readOnly:true}}  name='email' className='form-inputs' style={textFieldStyle} id="standard-basic" label="Email" variant="standard" />
                    <TextField value={formData.contactNumber} inputProps={{readOnly:true}}  name='contactNumber' className='form-inputs'style={textFieldStyle} id="standard-basic" label="Contact Number" variant="standard" />
                    <TextField value={formData.roomType} inputProps={{readOnly:true}}  name='roomType' className='form-inputs'style={textFieldStyle}id="standard-select-currency"label="Room Type"variant="standard" >
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer sx={datePickerStyle} components={['DatePicker']}>
                            <DatePicker value={formData.checkIn ? dayjs(formData.checkIn, 'YYYY-MM-DD') : null} readOnly label="Check In "/>
                            <DatePicker  value={formData.checkOut ? dayjs(formData.checkOut, 'YYYY-MM-DD') : null}  readOnly label="Check Out "/>
                        </DemoContainer>
                    </LocalizationProvider> 
                    <TextField value={formData.totalPrice} inputProps={{readOnly:true}} name='totalPrice'style={{paddingBottom:'15px'}} id="standard-basic" label="Total" variant="standard" />
                </Box>
            </div>
        </div>
    )
}

export default MyReservation;