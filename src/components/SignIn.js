import './SignIn.css'
import Header from './Header'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn(){
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
        email:'',
        password:''
    });
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        }
    },[])
    const handleFormData=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    console.log(isLoggedIn);
    const login=()=>{
        axios.post("http://localhost:9090/api/v1/users/login",formData).then((res)=>{
            const token = res.data.token;
            localStorage.setItem('token',token);
            setIsLoggedIn(true);
            alert("Login Success");
            navigate('/')
            
        }).catch((e)=>{
            console.log(e);
            alert("Something went wrong! Please check your credential")
        })
    }

    return(
        <div  className="signIn-main">
        <div> <Header/> </div>

        <div className='signIn-form-body'>
            <div style={{paddingTop:'15px'}}>
                <h1>Sign In</h1>
            </div>
            <Box className='form-box'
                component="form"
                sx={boxStyle}
                noValidate>
                <TextField value={formData.email} name='email' onChange={handleFormData} className='form-inputs' style={textFieldStyle} id="standard-basic" label="Email" variant="standard" />
                <TextField value={formData.password} name='password' onChange={handleFormData} className='form-inputs'style={textFieldStyle} id="standard-basic" label="Password" variant="standard" />
                <Button onClick={login} style={signUpBtnStyle} type='button' >Submit</Button>
            </Box>
        </div>
    </div>
    )
}

export default SignIn;