import './SignUp.css'
import Header from '../Header/Header'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp(){

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
    const signUpBtnStyle = {
        width:'120px',
        height:'50px',
        color:'white',
        backgroundColor:'#2f2f2f',
        borderRadius:'20px'
    }

    const [formData,setFormData] = useState({
        fullname:'',
        email:'',
        password:''
    });

    const handleFormData=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();

    const register=()=>{
        axios.post("http://localhost:9090/api/v1/users/register",formData).then((res)=>{
            const token = res.data.token;
            console.log(token);
            alert("Register Success!")
            navigate('/signin')
        }).catch((e)=>{
            console.log(e);
            alert("Something Went wrong!please try again later")
        })
        console.log(formData);
    }

    return(
        <div  className="signUp-main">
        <div> <Header/> </div>
        <div className='signUp-form-body'>
            <div style={{paddingTop:'15px'}}>
                <h1>Sign Up</h1>
            </div>
            <Box className='form-box'
                component="form"
                sx={boxStyle}
                noValidate>
                <TextField value={formData.fullname} name='fullname' onChange={handleFormData} className='form-inputs'style={textFieldStyle} id="standard-basic" label="Full Name" variant="standard" />
                <TextField value={formData.email} name='email' onChange={handleFormData} className='form-inputs' style={textFieldStyle} id="standard-basic" label="Email" variant="standard" />
                <TextField value={formData.password} name='password' onChange={handleFormData} className='form-inputs'style={textFieldStyle} id="standard-basic" label="Password" variant="standard" />
                <Button onClick={register} style={signUpBtnStyle} type='button' >Submit</Button>
            </Box>
        </div>
    </div>
    )
}

export default SignUp;