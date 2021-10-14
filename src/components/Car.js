import React, { useState, useEffect} from 'react';
import firebase  from '../firebase/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import ReactPayPal from './ReactPayPal';

function Car({user}){
    const [checkout, setCheckout] = React.useState(false);
    const [listCarrito, seltListCarrito] = new useState(null);
    const [modalDetalle,setmodalDetalle] = useState(false);

    
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
                {(checkout === true) ? <div className="payment-div"></div> 
                    :<div>
                        <button  onClick={() => {setmodalDetalle(true)}} className="btn btn-success ms-2">Pagar</button>
                        </div>
                    }
                    <Modal isOpen={modalDetalle}>
                    <ModalHeader>
                        <h3>Detalle de venta <button  onClick={() => {setmodalDetalle(false)}} className="btn btn-success ms-2">X</button></h3>
                        
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Usuario:</label>
                            {user.email}
                        </div>
                        <div>
                        <label>Total a pagar: $</label>
                            {total}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                    <ReactPayPal/>
                    </ModalFooter>

                </Modal>
                </div>
            </div>
        </section>
    )
}

export default Car;
