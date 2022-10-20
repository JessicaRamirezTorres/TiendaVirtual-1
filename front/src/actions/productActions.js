import axios from 'axios';

import{
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCES,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstans';

export const getProducts =()=> async(dispatch)=>{
    try{
        dispatch({type: ALL_PRODUCTS_REQUEST})

        const{data}=await axios.get('api/productos')

        dispatch({
            type: ALL_PRODUCTS_SUCCES,
            payload:data
        })

    }catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}

//clear error
export const clearErrors=()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}