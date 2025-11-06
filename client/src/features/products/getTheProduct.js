// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { useGetTheProductQuery } from "./productApiSlice"
// import { useParams } from 'react-router-dom';
// import { useAddToBasketMutation } from '../basket/basketApiSlice';
// import { InputNumber } from 'primereact/inputnumber';
// import "./GetTheProduct.css"
// const GetTheProduct = () => {
//     const { id } = useParams()
//     const { data, error, isError, isSuccess, isLoading } = useGetTheProductQuery(id)
//     const [addItem, { error: errorBasket, isError: isErrorBasket, isSuccess: isSuccessBasket, isLoading: isLoadingBasket }] = useAddToBasketMutation()
//     const [quantity, setQuantity] = useState(1)
//     console.log("data", data)
//     const addToBasket = (product) => {
//         addItem({ id: product, quantity })
//         alert("המוצר נוסף לסל")
//     }
//     if (isLoading) return <p>טוען...</p>;
//     if (isError) return <p>שגיאה: {JSON.stringify(error)}</p>;
//     if (!data) return <p>לא נמצא מוצר</p>;

//     if (isLoadingBasket) return <p>טוען...</p>;
//     if (isErrorBasket) return <p>שגיאה: {JSON.stringify(errorBasket)}</p>;

//     //console.log(useParams())

//     const header = (
//         <img alt="Card" src={data.imageUrl} />
//     )

//     const footer = (
//         <>
//             <Button icon="pi pi-shopping-cart" style={{
//                 borderRadius: '50%', width: '50px', height: '50px', padding: 0,
//             }} onClick={() => { addToBasket(data._id) }}/>

//         </>
//     );

//     return (
//         <div className="card flex justify-content-center">
//             <Card title={data.name} subTitle={`₪${data.price}`} footer={footer} header={header} className="md:w-25rem">
//                 <p className="m-0">
//                     {data.description}
//                 </p>
//                 <InputNumber value={quantity} onValueChange={(e) => setQuantity(e.value)} min={1} showButtons buttonLayout="horizontal" decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" />
//             </Card>
//         </div>
//     )
// }
// export default GetTheProduct

import React, { useState } from 'react';
import { useGetTheProductQuery } from "./productApiSlice";
import { useParams } from 'react-router-dom';
import { useAddToBasketMutation } from '../basket/basketApiSlice';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import './GetTheProduct.css'; // תוודאי שיש קובץ CSS מותאם

const GetTheProduct = () => {
    const { id } = useParams();
    const { data, error, isError, isLoading } = useGetTheProductQuery(id);
    const [addItem, { isLoading: isLoadingBasket, isError: isErrorBasket, error: errorBasket }] = useAddToBasketMutation();
    const [quantity, setQuantity] = useState(1);

    if (isLoading || isLoadingBasket) return <p>טוען...</p>;
    if (isError || isErrorBasket) return <p>שגיאה: {JSON.stringify(error || errorBasket)}</p>;
    if (!data) return <p>לא נמצא מוצר</p>;

    const addToBasket = () => {
        addItem({ id: data._id, quantity });
        // if(!isErrorBasket)
        // alert("המוצר נוסף לסל");
    };

    return (
        <div className="product-container">
            <div className="product-image">
                <img src={data.imageUrl} alt={data.name} />
            </div>
            <div className="product-details">
                <h2 className="product-title">{data.name}</h2>
                <Rating className='rating' value={data.rating} readOnly cancel={false}></Rating>
                <p className="product-price">₪{data.price}</p>


                {/* <div className="product-quantity">
                    <label>כמות:</label>
                    <InputNumber
                        value={quantity}
                        onValueChange={(e) => setQuantity(e.value)}
                        min={1}
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="p-button-danger"
                        incrementButtonClassName="p-button-success"
                    />
                </div> */}
                <div className="product-quantity">
                    <label htmlFor="quantity">כמות:</label>
                    <InputNumber
                        inputId="quantity"
                        value={quantity}
                        onValueChange={(e) => setQuantity(e.value)}
                        min={1}
                        showButtons
                        buttonLayout="horizontal"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        decrementButtonClassName="p-button-secondary custom-qty-btn"
                        incrementButtonClassName="p-button-secondary custom-qty-btn"
                        inputStyle={{ textAlign: 'center', width: '60px', fontSize: '1.2rem' }}
                    />
                </div>
                <p className="product-description">{data.description}</p>
                <Button
                    label="הוספה לסל"
                    icon="pi pi-shopping-cart"
                    className="add-to-cart-button"
                    disabled={data.inventoryStatus === 'OUTOFSTOCK'}
                    onClick={addToBasket}
                />

            </div>

        </div>
    );
};

export default GetTheProduct;