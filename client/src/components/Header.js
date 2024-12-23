import { Avatar } from '@mui/material';
import React,{useContext,} from 'react';
import "./header.css";
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';

const Header = () => {
  const {logindata,setLoginData} = useContext(LoginContext);
  // console.log(logindata);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const logout = async() =>{
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("http://localhost:8009/logout", {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "Authorization":token,
        Accept:"application/json"
      }
    });
    

     const data = await res.json();
     console.log(data);

    if(data.status === 201 ){
           console.log("user logout");
           let token = localStorage.removeItem("usersdatatoken");
           setLoginData(false);
           history("/");
    }else{
      console.log("error");
    }


}

  const goDash = () =>{
    history("/dash");
  }

  const goError = () =>{
       history("*");
  }
      



  return (
    <div>
      <header>
        <nav><h1>Explore Products</h1>
        <div className='left'>{logindata}</div>
        <div className='avtar'>
          {
            logindata ? <Avatar style={{background:"salmon",fontWeight:"bold",textTransform:"capitalize"}} onClick={handleClick}>{logindata[0].toUpperCase()}</Avatar> : 
            <Avatar style={{background:"blue"}} onClick={handleClick}/>
          }
  
        </div>
        
            <Menu  id="basic-menu"
                    anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     MenuListProps={{
                            'aria-labelledby': 'basic-button',
                      }}
                    >
        {
 
             logindata ? (
              <>
        <MenuItem onClick={()=>{
          logout()
          handleClose() 
          }}>Logout</MenuItem> 
              </>
             ) : (
              <>
                  <MenuItem onClick={()=>{
                    goError()
                    handleClose()}}>Profile</MenuItem>
              </>
             )

        }

      </Menu>
        
        
        </nav>
      </header>
    </div>
  )
}

export default Header
