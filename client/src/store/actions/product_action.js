import axios from 'axios';

import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_TO_SHOP,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_WOOD,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL

} from './types';

import { PRODUCT_SERVER } from '../../Components/utils/misc';


export function getProductDetail(id){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
                    .then(res=>{
                        return res.data[0]
                    })
    return {
        type:GET_PRODUCT_DETAIL,
        payload:request
    }
}
export function clearProductDetail(){
    // const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    //                 .then(res=>{
    //                     return res.data[0]
    //                 })
    return { 
        type:CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}

export function getProductsBySell(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(res=>res.data);
    return {
        type:GET_PRODUCTS_BY_SELL,
        payload:request
    }
}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
                    .then(res=>res.data);
    return {
        type:GET_PRODUCTS_BY_ARRIVAL,
        payload:request
    }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                    .then(response=>{
                        let newState = [
                            ...previousState,
                            ...response.data.articles
                        ];

                        return {
                            size:response.data.size,
                            articles:newState
                        }
                    })
    return{
        type:GET_PRODUCTS_TO_SHOP,
        payload:request
    }

}


export function addProduct(dataToSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
                    .then(res=>res.data)

    return {
            type:ADD_PRODUCT,
            payload:request
        }
    }

export function clearProduct(){
    return{
        type:CLEAR_PRODUCT,
        payload:''
    }
}
/////////////////////////////
///////  CATEGORIES
////////////////////////////

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                    .then(res=>res.data);
    return {
        type:GET_BRANDS,
        payload:request
    }
}
export function addBrand(dataToSubmit, existingBrands){

    const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
                    .then(res=>{
                        let brands =[
                            ...existingBrands,
                            res.data.brand
                        ]

                        return {
                            success:res.data.success,
                            brands
                        }

                    });
    return {
        type:ADD_BRAND,
        payload:request
    }
}


export function getWoods(){
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
                    .then(res=>res.data);
    return {
        type:GET_WOODS,
        payload:request
    }
}

export function addWood(dataToSubmit, existingWoods){

    const request = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
                    .then(res=>{
                        let woods =[
                            ...existingWoods,
                            res.data.wood
                        ]

                        return {
                            success:res.data.success,
                            woods
                        }

                    });
    return {
        type:ADD_WOOD,
        payload:request
    }
}