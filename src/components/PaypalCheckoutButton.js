import React from "react";
import { ReactDOM } from "react";
import { paypal } from "paypal-checkout/dist/checkout.lib";

const PaypalCheckoutButton = ({order})=>{
    const paypalconf={
        currency :'MXM',
        env:'sandbox',
        client: {
        },
        style:{
            label:'pay',
            size:'medium',
            shape:'rect',
            color:'gold'

        }

    };
    const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
}
export default PaypalCheckoutButton;