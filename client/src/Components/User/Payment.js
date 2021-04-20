import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { USER_SERVER } from '../utils/misc';
import axios from 'axios'
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure();


const Payment = ({products,price,onSuccess}) => {

    console.log(products)
    async function handleToken(token, addresses,totalAmount){
      const response= await axios.post(`${USER_SERVER}/checkout`,{token,
            products, price
        })
        const {status,chargeData}= response.data;
        if(status==="success"){
            toast("Success! check email for details",{
                type:'success'
            });
            onSuccess(chargeData)

        }
        else{
            toast("something went wrong",{
                type:'error'
            })  

        } 
    }
    return (
        <div>
            <StripeCheckout 
                stripeKey="pk_test_51Ih9kyLsmbl91PPamFvh5OTJVFZfR6pKKcUTQssDBhJPEkSKczLk6mzhKlWcX8LaBKk4Ukh0KIoVOgdzmy85NpHP00sowFaDmZ"
                token={handleToken}
                // billingAddress
                // shippingAddress
                amount={price * 100}
                products={
                    products
                }
            />
        </div>
    );
};

export default Payment;