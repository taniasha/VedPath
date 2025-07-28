import React, { createContext, useEffect, useState } from 'react'
 
   const ThemeContext = createContext();
  
   export const ThemeProvider=({children})=>{
    const[theme, setTheme] = useState('light');

    useEffect(()=>{
       document.body.style.backgroundColor = theme=="dark" ? "#121212" : "#ffffff";
       document.body.style.color = theme ==="dark" ? "#ffffff" : "#000000";
    },[theme])

     return(
         <>
            <ThemeContext.Provider value={{theme, setTheme}}>
                {children}
            </ThemeContext.Provider>
         </>
     );
   }
export default ThemeContext;
