import React, { useEffect, useState } from "react"
import "./Register.css"
import { useRegisterFuncMutation } from "./authApiSlice"
import apiSlice from "../../app/apiSlice"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [register, { isError, error, isSuccess, isLoading }] = useRegisterFuncMutation()

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        register(values)
        console.log("submitted clicked")
        console.log(values)

    }
    const [values, setValues] = useState({
        name: "",
        userName: "",
        password: "",
        email: ""
    })
    useEffect(() => {
        if (isSuccess)
            navigate("/login")
    }, [isSuccess])
    const changeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return <div className="app">
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
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
                <label for="userName">UserName</label>
                <input id="userName" name="userName" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required onChange={changeInput} />
            </div>
            <button type="submit">Send</button>
            <div>
                <h5><a href="/login">להתחברות לחצו</a></h5>
 
                <p>this p added by racheli</p>
            </div>
        </form>
    </div>
}
export default Register