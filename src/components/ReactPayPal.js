import React from "react";

export default function ReactPayPal() {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef();
  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "MXN",
                  value: 0.00,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
        },
        onError: (err) => {
        //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paid) {
    return <div>Payment successful.!</div>;
  }
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }
  return (
    <div>
      <div ref={paypalRef} />
    </div>
  );
}