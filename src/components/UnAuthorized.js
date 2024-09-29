import { Link} from "react-router-dom";

function UnAuthorized(){
    return(
        <div style={{
            width:'100%',
            height:'100vh',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }} >
            <div style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'column'
            }} >
                <h1>You don't have permission</h1>
                <Link to="/" style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    textDecoration:'none',
                    width:'150px',
                    height:'60px',
                    border:'none',
                    color:'white',
                    backgroundColor:'black',
                    borderRadius:'10px'
                }}> Back to Home</Link>
            </div>


        </div>
    )
}

export default UnAuthorized;