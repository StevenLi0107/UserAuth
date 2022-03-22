export const  LoginAction =()=>{
    // console.log("action caled surendra ")
    return {
        type:"AUTH"
    }
}

export const  LoggedinAction =()=>{
    // console.log("auth done action called")
    return {
        type:"AUTHDONE"
    }
}
export const  LogoutAction =()=>{
    return {
        type:"LOGOUT",
    
    }
}