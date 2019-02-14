import React from 'react'

const Navigation = ({onRouteChange, isSignedIn}) =>{
        if(isSignedIn){
            return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={()=>onRouteChange('signin')} className='f6 link pointer pa3 link dim black underline'> Sign Out!</p>
            </nav>
            );
        }
        else{
            return(
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={()=>onRouteChange('signin')} className='f6 link pointer pa3 link dim black underline'> 
                        Sign In!
                    </p>
                    <p onClick={()=>onRouteChange('register')} className='f6 link pointer pa3 link dim black underline'> 
                        Register!
                    </p>
                </nav>
            );
        }
}

export default Navigation;