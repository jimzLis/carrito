import React, { useState, useEffect} from 'react';
import ItemCard from './ItemCard'
import firebase from '../firebase/firebaseConfig';



function Home({user}){

    const [listProduct, seltListProduct] = new useState(null)

    const peticionesGet = () => {
        const db = firebase.database().ref();
        db.child('product').on('value', product => {
            seltListProduct(product.val());
        })
    }

    useEffect(() => {
        peticionesGet();
    },[])

     
      

  
    return (
        <div>
            <h1 className="text-center mt-3">Todos los articulos</h1>
            <section className="py-4 container">
            <div className="row justify-content-center">
                {listProduct != null ? (
                     Object.keys(listProduct).map((i) =>{
                        
                        return(
                            <ItemCard 
                            img={listProduct[i].img} 
                            title={listProduct[i].title} 
                            desc={listProduct[i].desc} 
                            price={listProduct[i].price} 
                            item={listProduct[i]} 
                            id={i}
                            user = {user}
                           />
                        )
                        
                    })
                ):(
                    <p>Adios</p>
                )
                }
                
                </div>
            </section>
        </div>
    )
}

export default Home;
