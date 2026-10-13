import{createContext,useContext,useState}from'react';const C=createContext();
export function AppProvider({children}){const[notice,setNotice]=useState('');return <C.Provider value={{notice,setNotice}}>{children}</C.Provider>}
export const useApp=()=>useContext(C);