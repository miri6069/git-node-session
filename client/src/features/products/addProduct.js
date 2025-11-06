import { useEffect, useState } from "react"
import { useAddProductMutation } from "./productApiSlice"


const AddProduct = () => {
    const [addProduct, { isError, error, isSuccess, isLoading }] = useAddProductMutation()
    const [values, setValues] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        imageUrl: "",
        inventoryStatus: "",
        rating: 0
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        addProduct(values)
        console.log("המוצר נוסף בהצלחה!")

    }
    // useEffect(()=>{
    //     if(isSuccess)
    //         alert("המוצר נוסף בהצלחה!")
    // },[isSuccess])
    const changeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (<div className="app">
        <form onSubmit={handleSubmit}>
            <h2>הכנס מוצר</h2>
            {/* {isError && JSON.stringify(error)} */}
            {isError && error && (
                <div className="error-message">
                    {typeof error.data === "string"
                        ? error.data
                        : error.data?.message || "שגיאה לא ידועה"}
                </div>
            )}
            <div className="form-input">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="description">Description</label>
                <input id="description" name="description" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="category">Category</label>
                <input id="category" name="category" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="price">Price</label>
                <input id="price" name="price" type="number" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="imageUrl">ImageUrl</label>
                <input id="imageUrl" name="imageUrl" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="inventoryStatus">InventoryStatus</label>
                <input id="inventoryStatus" name="inventoryStatus" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="rating">Rating</label>
                <input id="rating" name="rating" type="number" required onChange={changeInput} />
            </div>
            <button type="submit">Send</button>
            <div>
                <h5><a href="/login">להתחברות</a></h5>
            </div>
        </form>
    </div>

    )
}
export default AddProduct