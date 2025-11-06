import React, { useEffect, useState } from "react"
import { useLoginFuncMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"
import { setToken } from "./authSlice"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [login, { isError, error, isSuccess, isLoading, data }] = useLoginFuncMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitting login with values:", values)
        login(values)
        //alert("submitted clicked")
    }
    const [values, setValues] = useState({
        userName: "",
        password: ""
    })
    useEffect(() => {
        if (isSuccess) {
            console.log("token", data)
            dispatch(setToken(data))
            navigate("/")
        }
    }, [isSuccess])
    const changeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }
    return <div className="app">
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {/* {isError && JSON.stringify(error)}  */}
            {isError && error && (
                <div className="error-message">
                    {typeof error.data === "string"
                        ? error.data
                        : error.data?.message || "שגיאה לא ידועה"}
                </div>
            )}
            <div className="form-input">
                <label for="userName">UserName</label>
                <input id="userName" name="userName" type="text" required onChange={changeInput} />
            </div>
            <div className="form-input">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required onChange={changeInput} />
            </div>
            <button type="submit">Send</button>
            <div>
                <h5>עדיין לא נרשמת? <a href="/register">להרשמה</a> </h5>

            </div>
        </form>
    </div>
}
export default Login
