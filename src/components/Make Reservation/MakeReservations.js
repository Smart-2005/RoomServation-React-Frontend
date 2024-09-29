
import Header from '../Header/Header'
import './MakeReservation.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function MakeReservations() {

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
        overflow:'none',minWidth:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'
    }
    const submitBtnStyle = {
        width:'120px',
        height:'50px',
        color:'white',
        backgroundColor:'#2f2f2f',
        borderRadius:'20px'
    }
    const roomTypes = useMemo(() => [
        { value: 'SINGLE', label: 'SINGLE (One Person)', price: 2500 },
        { value: 'COUPLE', label: 'COUPLE (Two Persons)', price: 3500 },
        { value: 'FAMILY', label: 'FAMILY (Four Persons)', price: 5500 },
        { value: 'SUITE', label: 'SUITE (Eight Persons)', price: 6500 },
    ], []);
    const [formData,setFromData] = useState({
        fullname:'',
        email:'',
        contactNumber:'',
        roomType:'',
        checkIn:null,
        checkOut:null,
        totalPrice:''
    })

    const handleChange =(e)=>{
        setFromData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleDateChange = (field, newValue) => {
        const formattedDate = newValue ? dayjs(newValue).format( 'YYYY-MM-DD'): null;
        setFromData({
            ...formData,
            [field]: formattedDate
        });
    }

    useEffect(()=>{
        if (formData.roomType && formData.checkIn && formData.checkOut)  {
            const checkInDate = dayjs(formData.checkIn,'YYYY-MM-DD');
            const checkOutDate = dayjs(formData.checkOut,'YYYY-MM-DD');
            const nightsCount = checkOutDate.diff(checkInDate,'day')
            const room = roomTypes.find((room) => room.value === formData.roomType);
            const total = nightsCount * (room?room.price:0);
            setFromData((prev)=>({
                ...prev,
                totalPrice:total
            }))   
        }
        const token = localStorage.getItem('token');
        if(token){
            const decodeToken = jwtDecode(token);
            const userFullname = decodeToken.fullname; 
            const userEmail = decodeToken.email
            setFromData((prev)=>({
                ...prev,
                fullname:userFullname,
                email:userEmail

            }))
        }
    },[formData.roomType, formData.checkIn, formData.checkOut,roomTypes]);

    const makeRservation=()=>{
        console.log(formData);
        axios.post('http://localhost:9090/api/v1/reservations/makereservation',formData).then((res) => {
            const reservationId = res.data.data.reservationDTO.reservationId;
            const roomNumber = res.data.data.reservationDTO.roomNumber;
            alert(`Reservation Success !
                Save your reservation Id : ${reservationId} and Room Number : ${roomNumber}`)
            window.location.reload();
        }).catch( (error) =>{
            alert("Failed to make a reservation");
            console.error("Reservation error:", error);
        }
        )  
    }
    return(
        <div  className="makeRservation-main">
            <div> <Header/> </div>
            <div className='makeRes-form-body'>
                <div style={{paddingTop:'15px'}}>
                    <h1>Book a Reservation</h1>
                </div>
                <Box className='form-box'
                    component="form"
                    sx={boxStyle}
                    noValidate
                    autoComplete="off"
                    onSubmit={e => {
                        e.preventDefault();
                        makeRservation();
                    }}  
                    >
                    <TextField value={formData.fullname}  onChange={handleChange} name='fullname' className='form-inputs' required style={textFieldStyle} id="standard-basic" label="Full Name" variant="standard" /> 
                    <TextField value={formData.email} onChange={handleChange} name='email' className='form-inputs' required style={textFieldStyle} id="standard-basic" label="Email" variant="standard" />
                    <TextField value={formData.contactNumber} onChange={handleChange} name='contactNumber' className='form-inputs' required style={textFieldStyle} id="standard-basic" label="Contact Number" variant="standard" />
                    <TextField value={formData.roomType} onChange={handleChange} name='roomType' className='form-inputs' required style={textFieldStyle}
                        id="standard-select-currency"
                        select
                        label="Room Type"
                        variant="standard" >
                        {roomTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer sx={datePickerStyle} components={['DatePicker']}>
                            <DatePicker value={formData.checkIn ? dayjs(formData.checkIn, 'YYYY-MM-DD') : null} onChange={(newValue)=>handleDateChange('checkIn',newValue)} required label="Check In " />
                            <DatePicker value={formData.checkIn ? dayjs(formData.checkIn, 'YYYY-MM-DD') : null} onChange={(newValue)=>handleDateChange('checkOut',newValue)} required label="Check Out " />
                        </DemoContainer>
                    </LocalizationProvider> 
                    <TextField inputProps={{readOnly:true}} value={formData.totalPrice} onChange={handleChange} name='totalPrice' required style={{paddingBottom:'15px'}} id="standard-basic" label="Total" variant="standard" />
                    <Button style={submitBtnStyle} type='submit' >Submit</Button>
                </Box>
            </div>
        </div>
    )
}
export default MakeReservations;