import { useDeleteProductMutation } from "./productApiSlice"
import { useGetAllProductsQuery, useUpdateProductMutation, useAddProductMutation } from "./productApiSlice";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from "primereact/inputnumber";

export default function DeleteProducte() {
    const { data: products = [], isLoading, isError, error, refetch } = useGetAllProductsQuery();
    const [deleteProduct, { isLoading: deleteLoading, isError: deleteError, error: deleteErrorData }] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [layout, setLayout] = useState('grid');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [addProduct, { isError: addError, error: addErrorData, isSuccess: isAddSuccess, isLoading: isAddLoading }] = useAddProductMutation()
    const [isEditAddOpen, setIsEditAddOpen] = useState(false);
    const [localProducts, setLocalProducts] = useState([])
    const navigate = useNavigate()
    const deletItem = (e) => {//מחיקת מוצר
        deleteProduct(e)
        refetch()
        alert("המוצר נמחק בהצלחה!")
    }
    //---------------------------------------------------עדכון מוצר-------------------------------------------------------------
    const [formData, setFormData] = useState({//לעידכון מוצר
        name: "",
        description: "",
        category: "",
        price: 0,
        imageUrl: "",
        inventoryStatus: "",
        rating: 0,
    });
    const openEditModalUpdate = (product) => {//פתיחת מודל עידכון מוצר
        console.log(product)
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl,
            inventoryStatus: product.inventoryStatus,
            rating: product.rating,
        });
        setIsEditOpen(true);
    };
    const handleEditChange = (e) => {// שינויים ב INPUTTEXT
        console.log(e);
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData);
    };
    const handleEditSubmit = () => {//שמירת השינוים וסגירת המודל
        updateProduct({ ...formData, _id: selectedProduct._id });
        setIsEditOpen(false);
        refetch()
    };
    const handleEditChangeCustom = (value, field) => {// שינויים ב INPUTNUMBER
        setFormData((prev) => ({ ...prev, [field]: value.value }));
    };
    const [formDataAdd, setFormDataAdd] = useState({//הוספת  מוצר
        name: "",
        description: "",
        category: "",
        price: 0,
        imageUrl: "",
        inventoryStatus: "",
        rating: 0,
    });
    const openEditModalAdd = () => {//פתיחת מודל הוספת  מוצר
        setIsEditAddOpen(true);
    };
    const handleEditChangeAdd = (e) => {// שינויים ב INPUTTEXT
        const { name, value } = e.target;
        setFormDataAdd((prev) => ({ ...prev, [name]: value }));
    };
    const handleEditSubmitAdd = () => {//שמירת השינוים וסגירת המודל
        addProduct({ ...formDataAdd, name: formDataAdd.name });
        {
            addError && (
                <div className="error-message">
                    {addErrorData?.data || "An unexpected error occurred"}
                </div>
            )
        }
        setIsEditAddOpen(false);
        refetch()
    };
    const handleEditChangeCustomAdd = (value, field) => {// שינויים ב INPUTNUMBER
        setFormDataAdd((prev) => ({ ...prev, [field]: value.value }));
    };
    useEffect(() => {
        if (isAddSuccess) {
            setIsEditAddOpen(false);
            setFormDataAdd({}); // אפס את הטופס
        }
    }, [isAddSuccess]);
    useEffect(() => {
        if (products && products.length > 0 && localProducts.length === 0) {
            setLocalProducts(products);
        }
    }, [products]);
    if (localStorage.getItem("roles") == "Admin") {
        if (isLoading) return <h2>loading...</h2>
        if (isError) return <h2>{JSON.stringify(error)}</h2>
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
        const listItem = (product, index) => {
            return (<>
                <div className="col-12" key={product.id}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.imageUrl} alt={product.name} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.name}</div>
                                <Rating value={product.rating} readOnly cancel={false}></Rating>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.category}</span>
                                    </span>
                                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">₪{product.price}</span>
                                <Button icon="pi pi-trash" style={{
                                    borderRadius: '50%', width: '50px', height: '50px', padding: 0, backgroundColor: "black"
                                }} className="p-button-rounded p-button-danger" onClick={() => deletItem(product)} />
                                <Button icon="pi pi-pencil" style={{
                                    borderRadius: '50%', width: '50px', height: '50px', padding: 0, backgroundColor: "black"
                                }} className="p-button-rounded p-button-info" onClick={() => openEditModalUpdate(product)} />
                            </div>
                        </div>
                    </div>
                </div>
            </>);
        };
        const gridItem = (product) => {
            return (<>
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
                                onClick={() => navigate(`/getTheProduct/${product._id}`)}
                            />
                            <div className="text-xl font-bold">{product.name}</div>
                            <span className="text-xl font-semibold">₪{product.price}</span>
                        </div>
                        <Button icon="pi pi-trash" style={{
                            borderRadius: '50%', width: '50px', height: '50px', padding: 0,marginRight:"3px", backgroundColor: "black"
                        }} className="p-button-rounded p-button-danger" onClick={() => deletItem(product)} />
                        <Button icon="pi pi-pencil" style={{
                            borderRadius: '50%', width: '50px', height: '50px', padding: 0, backgroundColor: "black"
                        }} className="p-button-rounded p-button-info" onClick={() => openEditModalUpdate(product)} />
                    </div>
                </div>
            </>);
        };
        const itemTemplate = (product, layout, index) => {
            if (!product) {
                return;
            }
            if (layout === 'list') return listItem(product, index);
            else if (layout === 'grid') return gridItem(product);
        };
        const listTemplate = (products, layout) => {
            return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
        };
        const header = () => {
            return (
                <div className="flex justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            );
        };
        return (
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
                <Button icon="pi pi-plus" style={{
                    width: '110px', height: '50px', padding: 0,backgroundColor:"black"
                }} label="הוסף מוצר" className="p-button.p-button-secondary" onClick={openEditModalAdd} />
                <Dialog
                    header="עריכת מוצר"
                    visible={isEditOpen}
                    style={{ width: '30vw' }}
                    onHide={() => setIsEditOpen(false)}
                    modal
                >
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12">
                            <label>name</label>
                            <InputText name="name" value={formData.name} onChange={handleEditChange} />
                        </div>
                        <div className="field col-12">
                            <label>description</label>
                            <InputText name="description" value={formData.description} onChange={handleEditChange} />
                        </div>
                        <div className="field col-12">
                            <label>category</label>
                            <InputText name="category" value={formData.category} onChange={handleEditChange} />
                        </div>
                        <div className="field col-12">
                            <label>price</label>
                            <InputNumber name="price" value={formData.price} onChange={(e) => handleEditChangeCustom(e, "price")} />
                        </div>
                        <div className="field col-12">
                            <label>imageUrl</label>
                            <InputText name="imageUrl" value={formData.imageUrl} onChange={handleEditChange} />
                        </div>
                        <div className="field col-12">
                            <label>inventoryStatus</label>
                            <InputText name="inventoryStatus" value={formData.inventoryStatus} onChange={handleEditChange} />
                        </div> <div className="field col-12">
                            <label>rating</label>
                            <InputNumber name="rating" value={formData.rating} onChange={(e) => handleEditChangeCustom(e, "rating")} />
                        </div>
                        <Button label="שמור שינויים" icon="pi pi-check"style={{backgroundColor:"black"}} onClick={handleEditSubmit} />
                    </div>
                </Dialog>
                <Dialog
                    header=" הוספת מוצר"
                    visible={isEditAddOpen}
                    style={{ width: '30vw' }}
                    onHide={() => setIsEditAddOpen(false)}
                    modal
                >
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12">
                            <label>name</label>
                            <InputText name="name" value={formDataAdd.name} onChange={handleEditChangeAdd} />
                        </div>
                        <div className="field col-12">
                            <label>description</label>
                            <InputText name="description" value={formDataAdd.description} onChange={handleEditChangeAdd} />
                        </div>
                        <div className="field col-12">
                            <label>category</label>
                            <InputText name="category" value={formDataAdd.category} onChange={handleEditChangeAdd} />
                        </div>
                        <div className="field col-12">
                            <label>price</label>
                            <InputNumber value={formDataAdd.price} onChange={(e) => handleEditChangeCustomAdd(e, "price")} />
                        </div>
                        <div className="field col-12">
                            <label>imageUrl</label>
                            <InputText name="imageUrl" value={formDataAdd.imageUrl} onChange={handleEditChangeAdd} />
                        </div>
                        <div className="field col-12">
                            <label>inventoryStatus</label>
                            <InputText name="inventoryStatus" value={formDataAdd.inventoryStatus} onChange={handleEditChangeAdd} />
                        </div>
                        <div className="field col-12">
                            <label>rating</label>
                            <InputNumber value={formDataAdd.rating} onChange={(e) => handleEditChangeCustomAdd(e, "rating")} />
                        </div>
                        <Button icon="pi pi-plus" label="הוסף מוצר" className="p-button-success" style={{backgroundColor:"black"}} onClick={handleEditSubmitAdd} />

                    </div>
                </Dialog>

            </div>
        )
    }
    else
        return (
            <img src="/אזהרה.gif" ></img>
        )

}
