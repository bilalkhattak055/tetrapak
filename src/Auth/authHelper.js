// import { errorToast, successToast } from "../_helper/helper";
// import AreaService from "../api/areaService";

// export const isAuthenticateUser=async(email, password, setRole)=> {
//     let role = '';
//     let isAuthenticated = false;
//     let name= '';

//     console.log('em ',email )
//     console.log('em ',password )
    

//     if (email === "bilal@gmail.com" && password === "test") {
//         role = 'super-admin';
//         isAuthenticated = true;
//         name = 'Super Admin'
//       } else if (email === "Hasan.Aurangzeb@unilever.com"  && password === "test") {
//         role = 'it-officer';
//         isAuthenticated = true;
//         name = 'Hasan'
//       } else if (email === "Ameer.Hamza@unilever.com" && password === "test") {
//         role = 'factory';
//         isAuthenticated = true;
//         name = 'Hamza'
//       }else if (email === "Usman.tahir@unilever.com" && password === "test") {
//         role = 'factory';
//         isAuthenticated = true;
//         name = 'Usman'
//       }
//        else if (email === "factory@gmail.com" && password === "test") {
//         role = 'company';
//         isAuthenticated = true;
//         name = 'Factory'
//       } else if (email === "Meraj@unilever.com" && password === "test") {
//         role = 'area';
//         name = 'Meraj'
//         isAuthenticated = true;
//       }else if (email === "abdullah@unilever.com" && password === "test"){
//         role = 'qa';
//         isAuthenticated = true;
//         name = 'Tech QA'
//     }
//     else{
//       const payload={
//         email:email,
//         password:password
//       } 
//       try {
//         const res = await AreaService.AuthLogin(payload);  
//       if(res.status==200){
//        const roleID= res.data.data.role_id
//         role= roleID==9?'it-officer':
//         roleID==8?'area':
//         roleID==10?'factory':
//         roleID==11?'company':
//         roleID==12?'qa':null
//         isAuthenticated = true;
//           name = res.data.data.name
//           localStorage.setItem('userData',JSON.stringify(res.data.data)) 
//         successToast('Login successfully')
//       } 
 
//       } catch (error) {
//         console.log(error)
//       }
      
//     }

//       if(isAuthenticated){
//         console.log(JSON.parse(localStorage.getItem('userData')))
//         localStorage.setItem("login", JSON.stringify(true));
//         localStorage.setItem("role", JSON.stringify(role));
//         localStorage.setItem("name", JSON.stringify(name))
//         if (typeof setRole === 'function') {
//           setRole(role);
//       }
//         return true
//       }else {
//         return false
//       }
// Ameer.Hamza1@unilever.com
// FactoryOffcier@12
// Ameer.Hamza2@unilever.com
// Unilever@12


import { errorToast, successToast } from "../_helper/helper";
import AreaService from "../api/areaService";
import Cookies from 'js-cookie';

export const isAuthenticateUser=async(email, password, setRole)=> {
    let role = '';
    let isAuthenticated = false;
    let name= '';

  
localStorage.clear();


Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
 
    
    const payload={
      email:email,
      password:password
    } 

    try {
      const res = await AreaService.AuthLogin(payload);  
      console.log('resdfgsdf', res)
    if(res.status==200){
     const roleID= res.data.data.role_id
      role= roleID==9?'it-officer':
      roleID==8?'area':
      roleID==10?'global':
      roleID==11?'factory':
      // roleID==11?'company':
      roleID==12?'qa':null
      isAuthenticated = true;
        name = res.data.data.name
        localStorage.setItem('userData',JSON.stringify(res.data.data)) 
      successToast('Login successfully')
    } 

    } catch (error) {
      console.log(error)
    }
    // if (email === "bilal@gmail.com" && password === "test") {
    //     role = 'super-admin';
    //     isAuthenticated = true;
    //     name = 'Super Admin'
    //   } else if (email === "Hasan.Aurangzeb@unilever.com"  && password === "test") {
    //     role = 'it-officer';
    //     isAuthenticated = true;
    //     name = 'Hasan'
    //   } else if (email === "Ameer.Hamza@unilever.com" && password === "test") {
    //     role = 'factory';
    //     isAuthenticated = true;
    //     name = 'Hamza'
    //   }else if (email === "Usman.tahir@unilever.com" && password === "test") {
    //     role = 'factory';
    //     isAuthenticated = true;
    //     name = 'Usman'
    //   }
    //    else if (email === "factory@gmail.com" && password === "test") {
    //     role = 'company';
    //     isAuthenticated = true;
    //     name = 'Factory'
    //   } else if (email === "Meraj@unilever.com" && password === "test") {
    //     role = 'area';
    //     name = 'Meraj'
    //     isAuthenticated = true;
    //   }else if (email === "abdullah@unilever.com" && password === "test"){
    //     role = 'qa';
    //     isAuthenticated = true;
    //     name = 'Tech QA'
    // }
    // else{
    //   const payload={
    //     email:email,
    //     password:password
    //   } 
    //   try {
    //     const res = await AreaService.AuthLogin(payload);  
    //   if(res.status==200){
    //    const roleID= res.data.data.role_id
    //     role= roleID==9?'it-officer':
    //     roleID==8?'area':
    //     roleID==10?'factory':
    //     roleID==11?'factory':
    //     // roleID==11?'company':
    //     roleID==12?'qa':null
    //     isAuthenticated = true;
    //       name = res.data.data.name
    //       localStorage.setItem('userData',JSON.stringify(res.data.data)) 
    //     successToast('Login successfully')
    //   } 
 
    //   } catch (error) {
    //     console.log(error)
    //   }
      
    // }

      if(isAuthenticated){
        console.log(JSON.parse(localStorage.getItem('userData')))
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("role", JSON.stringify(role));
        localStorage.setItem("name", JSON.stringify(name))
        if (typeof setRole === 'function') {
          setRole(role);
      }
        return true
      }else {
        return false
      }
}
