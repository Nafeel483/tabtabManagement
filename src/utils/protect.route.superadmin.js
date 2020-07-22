
import React from 'react';
import {Route} from 'react-router-dom'

export const ProtectSupAdminRoute = ({ component: Component, ...rest }) => {
   console.log("hey")
    return (
        <Route
            {...rest}
            render = { (props) => {
                return  <Component {...props} />
                
            }}
        />
    )
}   
    
export default ProtectSupAdminRoute
