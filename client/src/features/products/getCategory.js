// import { useGetCategoryQuery } from "./productApiSlice"
// import { useState } from 'react';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
// import { classNames } from 'primereact/utils';
// import { useNavigate, useParams } from "react-router-dom";
// import 'primereact/resources/themes/lara-light-indigo/theme.css';  
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// const GetCategory = () => {
//     const {category}=useParams()
//     const { data: products = [], isError, error, isSuccess, isLoading } = useGetCategoryQuery(category)
//     console.log(category);
    
//     const navigate = useNavigate()
//     console.log("products from server:", products);
//     const [layout, setLayout] = useState('grid');

//     if (isLoading)
//         return <h1>isLoading...</h1>
//     if (isError)
//         return <h1>{error}</h1>
//     const getSeverity = (product) => {
//         switch (product.inventoryStatus) {
//             case 'INSTOCK':
//                 return 'success';

//             case 'LOWSTOCK':
//                 return 'warning';

//             case 'OUTOFSTOCK':
//                 return 'danger';

//             default:
//                 return null;
//         }
//     };
//     const listItem = (product, index) => {
//         return (
//             <div className="col-12" key={product._id} onClick={() => { navigate(`/getTheProduct/${product._id}`) }}>
//                 <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
//                     <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.imageUrl} alt={product.name} />
//                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                             <div className="text-2xl font-bold text-900">{product.name}</div>
//                             <Rating value={product.rating} readOnly cancel={false}></Rating>
//                             <div className="flex align-items-center gap-3">
//                                 <span className="flex align-items-center gap-2">
//                                     <i className="pi pi-tag"></i>
//                                     <span className="font-semibold">{product.category}</span>
//                                 </span>
//                                 <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
//                             </div>
//                         </div>
//                         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                             <span className="text-2xl font-semibold">₪{product.price}</span>
//                             <Button icon="pi pi-shopping-cart"style={{
//                             borderRadius: '50%', width: '50px', height: '50px', padding: 0,
//                         }} className="p-button-rounded " disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                           
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const gridItem = (product) => {
//         return (
//             <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id} onClick={() => { navigate(`/getTheProduct/${product._id}`) }}>
//                 <div className="p-4 border-1 surface-border surface-card border-round">
//                     <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                         <div className="flex align-items-center gap-2">
//                             <i className="pi pi-tag"></i>
//                             <span className="font-semibold">{product.category}</span>
//                         </div>
//                         <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
//                     </div>
//                     <div className="flex flex-column align-items-center gap-3 py-5">
//                         <img className="w-9 shadow-2 border-round" src={product.imageUrl} alt={product.name} />
//                         <div className="text-2xl font-bold">{product.name}</div>
//                         <Rating value={product.rating} readOnly cancel={false}></Rating>
//                     </div>
//                     <div className="flex align-items-center justify-content-between">
//                         <span className="text-2xl font-semibold">₪{product.price}</span>
//                         <Button icon="pi pi-shopping-cart" style={{
//                             borderRadius: '50%', width: '50px', height: '50px', padding: 0,
//                         }} className="p-button-rounded " disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (product, layout, index) => {
//         if (!product) {
//             return;
//         }

//         if (layout === 'list') return listItem(product, index);
//         else if (layout === 'grid') return gridItem(product);
//     };

//     const listTemplate = (products, layout) => {
//         return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
//     };

//     const header = () => {
//         return (
//             <div className="flex justify-content-end">
//                 <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
//         </div>

//     )


// }
// export default GetCategory


 import { useGetAllProductsQuery } from "./productApiSlice";
import { useGetCategoryQuery } from "./productApiSlice"
import { useAddToBasketMutation } from "../basket/basketApiSlice"
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from "react-router-dom";

const GetCategory = () => {
 const {category}=useParams()


    const { data: products = [], isLoading, isError, error } = useGetCategoryQuery(category);
    const [addItem, { error: basketError, isError: isBasketError, isSuccess: isBasketSuccess, isLoading: isBasketLoading }] = useAddToBasketMutation()
    const navigate = useNavigate();


    const addToBasket = (product) => {
        addItem({ id: product, quantity: 1 })
       //alert("המוצר נוסף בהצלחה!")
    }

    if (isLoading) return <h2>loading...</h2>;
    if (isError) return <h2>{JSON.stringify(error)}</h2>;

    if (isBasketLoading) return <h2>loading...</h2>;
    if (isBasketError) return <h2>{JSON.stringify(basketError)}</h2>;

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const gridItem = (product) => {
        return (
            <div
                key={product._id}
                style={{ width: '20%', padding: '0.5rem', boxSizing: 'border-box' }}
            >
                <div className="surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img
                            className="w-12 shadow-2 border-round"
                            src={product.imageUrl}
                            alt={product.name}
                            onClick={() => navigate(`/getTheProduct/${product._id}`) }
                        />
                        <div className="text-xl font-bold">{product.name}</div>
                        <span className="text-xl font-semibold">₪{product.price}</span>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button
                            label="קניה מהירה"
                            className="p-button-sm"
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                border: 'none',
                                width: "100%"
                            }}
                            disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            onClick={() => { addToBasket(product._id) }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const gridTemplate = (products) => {
        return (
            <div className="grid grid-nogutter flex flex-wrap">
                {products.map((product) => gridItem(product))}
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} layout="grid" listTemplate={gridTemplate} />
        </div>
    );
}

export default GetCategory