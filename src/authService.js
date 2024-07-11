import {jwtDecode} from 'jwt-decode';

const getUserRole = () => {
   const token = localStorage.getItem('access');
   if (token){
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
     const role=decodedToken.role

   return role !== undefined && role !== null ? role : null;
   }
   return null;
}


 
 const getToken = () => {
    const token = getToken();
    if(token){
        const payLoad = jwtDecode(token.access);
        return payLoad?.role;
    }
    return null;
 }

 const isLoggedIn = () => {
    const token = getToken();
    if(token){
        const payLoad = jwtDecode(token);
        const isLogin = Date.now() < payLoad.exp * 1000;
        return isLogin;

    }
 }

 const logOut = ()=> {
    localStorage.clear();
 }


 export  const authService = { logOut, getToken, getUserRole, isLoggedIn};