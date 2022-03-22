
const initialState ={
    isLogin:Boolean
}

const LoginReducer=(state=initialState, action)=>{
    // console.log("reducer called  ")
    if(action.type ==="AUTH"){

        return {...state, isLogin:false,
       }; 
    }
    else if( action.type ==="AUTHDONE") {
        // console.log("auth done called reducer ", action);
        return {...state, isLogin:true}; 
    }

    else if( action.type ==="LOGOUT") {
        return {...state, isLogin:false}; 
    }
    else{
        return state;
    }

}

export default LoginReducer;