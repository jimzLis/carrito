import React, { useState, useEffect} from 'react';
import firebase  from '../firebase/firebaseConfig';
import ReactDOM from "react-dom";
import Paypal from './Paypal';

function Car({user}){
    const [checkout,setCheckOut]=useState(false);
    const [listCarrito, seltListCarrito] = new useState(null)
    let total = 0;

    const peticionesGet = () => {
        const uid = user.uid;
        const db = firebase.database().ref();
        db.child('carrito').child(uid).on('value', carrito => {
            seltListCarrito(carrito.val());
            console.log(listCarrito);
        })
    }

    useEffect(() => {
        peticionesGet();
    },[])

    const addQuantility = (id) =>{
        const uid = user.uid;
        const db = firebase.database().ref();
        db.child(`carrito`).child(uid).child(id).once("value", snapshot => {
             console.log(snapshot.exists());
            if (snapshot.exists()){
                console.log("Existe!");    
                let quantility = parseInt(snapshot.child("quantility").val())+1;
                console.log(quantility); 
                db.child(`carrito`).child(uid).child(id).child("quantility").set(quantility)
            }
         });
     
    }

    const removeQuantility = (id) =>{
        const uid = user.uid;
        const db = firebase.database().ref();
        db.child(`carrito`).child(uid).child(id).once("value", snapshot => {
             console.log(snapshot.exists());
            if (snapshot.exists()){
                console.log("Existe!");    
                let quantility = parseInt(snapshot.child("quantility").val())-1;
                console.log(quantility); 
               if(quantility > 0){
                
                db.child(`carrito`).child(uid).child(id).child("quantility").set(quantility)
               }else{
                    removeProduct(id);
               }
            }
         });
     
    }
    
    const removeProduct = (id) =>{
        const uid = user.uid;
        const db = firebase.database().ref();
        db.child(`carrito`).child(uid).child(id).remove(
            error => {
              if(error)console.log(error);
            }
          );
    }

    const calTotal = (price, quantility) =>{
        console.log(quantility+ " "+price+ " "+ total);
       total = (price * quantility) + total;
      
    }

 

     if(listCarrito == null) return(
         <h1 className="text-center">Tu carrito esta vacio</h1>
     )
     














     
    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h3>Carrito</h3>
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {Object.keys(listCarrito).map((i) => {
                                return(
                                    <tr key={i}>
                                        {calTotal(listCarrito[i].price,listCarrito[i].quantility )}
                                        <td>
                                            <img src={listCarrito[i].img} style={{height : '6rem'}}/>
                                        </td>
                                        <td>{listCarrito[i].title}</td>
                                        <td>${(listCarrito[i].price * listCarrito[i].quantility)}</td>
                                        <td>Cantidad ({listCarrito[i].quantility})</td>
                                        <td>
                                            <button className="btn btn-info ms-2"
                                             onClick={() => removeQuantility(i)}>-</button>
                                            <button className="btn btn-info ms-2" 
                                            onClick={() => addQuantility(i)}>+</button>
                                            <button className="btn btn-danger ms-2"
                                            onClick={() => removeProduct(i)}>Eliminar Articulo</button>
                                        </td>
                                    </tr>
                                )
                            })} 
                        </tbody>
                    </table>
                </div>
                <div className="col-auto ms-auto m-2">
                    <h2>Precio total: ${total}</h2>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary m-2">Pagar ahora</button>
                    { checkout ? (<Paypal/>):
                     <button onClick={()=>{setCheckOut(true)}}></button>
                    }

                </div>
            </div>
        </section>
    )
}

export default Car;
