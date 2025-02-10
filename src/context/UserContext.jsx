import { createContext, useEffect, useState } from "react";


export let UserContext = createContext(); 

export function UserContextProvider({ children }) { 
  const [userToken, setUserToken] = useState(null); 

  useEffect(() => { 
    let token = localStorage.getItem("userToken"); 
    if (token) { 
      setUserToken(token); 
    } 
  }, []);


  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children} 
    </UserContext.Provider>
  );
}
