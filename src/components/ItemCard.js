import React from 'react'
import firebase from '../firebase/firebaseConfig';


const Itemcard = (props) => {
    return (
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div className="card p-0 overflow-hidden h-100 shadow" >
                <img src={props.img} className="card-img-top"/>
                <div className="card-body text-center">
                    <h5 className="card-title">{props.title}</h5>
                    <h5 className="card-title">${props.price}</h5>
                    <p className="card-text">{props.desc}</p>
                    <button className="btn btn-success items-end"  onClick={() => addCard(props.item, props.id, props.user)}>Añadir a carrito</button>
                </div>
            </div>
        </div>
    )
}

const addCard = (item, id, user) =>{
    const db = firebase.database().ref();
    const uid = user.uid;
  
    db.child(`carrito`).child(uid).child(id).once("value", snapshot => {
         console.log(snapshot.exists());
        if (snapshot.exists()){
            console.log("Existe!");    
            let quantility = parseInt(snapshot.child("quantility").val())+1;
            console.log(quantility); 
            db.child(`carrito`).child(id).child("quantility").set(quantility)
        }else{
            console.log("No Existe!");
            db.child(`carrito`).child(uid).child(id).set({
                "title":item.title,
                "desc":item.desc,
                "img":item.img,
                "price":item.price,
                "quantility":1
              });
        }
     });
 
}

export default Itemcard;
