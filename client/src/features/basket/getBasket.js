import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { jwtDecode } from "jwt-decode";
import { useDeleteItemMutation, useGetTheBasketQuery, useReduceItemMutation, useIncreaseItemMutation } from "./basketApiSlice";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function GetBasket() {
    const token = localStorage.getItem("token")
    const decoded = token ? jwtDecode(token) : null
    const [products, setProducts] = useState([]);
    const id = decoded?._id

    const { data, isError, error, isSuccess, isLoading, refetch } = useGetTheBasketQuery(id,{skip:!id})
    const [minus, { isError: isErrorM, error: errorM, isSuccess: isSuccessM, isLoading: isLoadingM }] = useReduceItemMutation()
    const [plus, { isError: isErrorP, error: errorP, isSuccess: isSuccessP, isLoading: isLoadingP }] = useIncreaseItemMutation()
    const [deleteItem, { isError: isErrorD, error: errorD, isSuccess: isSuccessD, isLoading: isLoadingD }] = useDeleteItemMutation()

    console.log("d", data)

    //   useEffect(() => {

    // }, []);
    const increase = async (_id) => {
        await plus({ _id })
        refetch()
    }
    const decrease = async (_id) => {
        await minus({ _id })
        refetch()

    }
    const deleteProduct = async (id) => {
        await deleteItem({ id })
        refetch()

    }
    useEffect(() => {
        if (data && data.items) {
            setProducts(data.items)
            refetch()
            console.log("p", data.items)
        }
    }, [data])
    
    if (!token) {
        return <div className="error-message">עליך להתחבר כדי לגשת לסל הקניות</div>;
    }
if (!data) {
        return "לא נמצא סל"
    }
    if (isLoading) return <p>טוען...</p>;
    if (isError) return <p>שגיאה: {JSON.stringify(error)}</p>;
    if (!data || !data.items || data.items.length === 0) return <p>לא נמצא מוצר בסל</p>;

    // if (!data) {
    //     return "לא נמצאו תוצאות"
    // }
    // if (data)
    //     setProducts(data.items)
    // else
    //     return "vxk rhe"


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


    const itemTemplate = (product, index) => {
        const p = product.products
        console.log("pp", p);
        if (!p) {
            return (
                <div className="col-12" key={index}>
                    <div className="p-4">
                        <p>⚠️ מוצר זה הוסר מהמלאי ואינו זמין יותר.</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={p.imageUrl} alt={p.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{p.name}</div>
                            <Rating value={p.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{p.category}</span>
                                </span>
                                <Tag value={p.inventoryStatus} severity={getSeverity(product)}></Tag>
                                <span className="text-2xl font-semibold">₪{p.price}</span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{p.price * product.quantity}</span>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 6px',
                                background: 'transparent', userSelect: 'none', gap: '6px', minWidth: '80px', justifyContent: 'center', fontSize: '1rem', color: 'black'
                            }}>

                                <Button icon="pi pi-plus" onClick={() => { increase(p._id) }} className="p-button-text p-button-sm" aria-label="Increase quantity" style={{ color: 'black' }} />
                                <span style={{ minWidth: '20px', textAlign: 'center' }}>{product.quantity}</span>
                                <Button icon="pi pi-minus" onClick={() => { decrease(p._id) }} className="p-button-text p-button-sm" aria-label="Decrease quantity" style={{ color: 'black' }} />
                            </div>
                            <Button icon="pi pi-trash" className="p-button-text p-button-sm" style={{
                                color: 'black', backgroundColor: 'white', border: '1px solid #ccc',
                                borderRadius: '4px'
                            }} aria-label="Remove item" onClick={() => { deleteProduct(p._id) }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <p>The basket of {localStorage.getItem("userName")}</p>
            <DataView value={products} listTemplate={listTemplate} />
        </div>
    )
}
