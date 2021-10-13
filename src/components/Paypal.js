import React, {useRef, useState, useEffect} from 'react';

export default function Paypal() {

    
    const paypal= useRef();

    useEffect(() => {
      Window.React.Buttons({
          createOrder:(data,actions,err)=>{
              return actions.order.create({ 
                  intent :"CAPTURE",
                  purachase_units:[
                    {
                        description:"cool looking table",
                        amount:{
                            
                        }

                    }

                  ]
               })
          },onApprove:async(data,actions)=>{
              const order = await actions.order.capture();
              console.log("sucess");
          },
          onerror:(err)=>{
            console.log(err);
          }
      }).render(paypal.current)
    }, [])




    return (
        <div>
            <div ref={paypal}></div>
 
        </div>
    )
}
