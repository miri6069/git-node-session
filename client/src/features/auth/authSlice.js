import { createSlice } from "@reduxjs/toolkit"

const authInitState = {
    token: localStorage.getItem("token") || "",
    isUserLoggedIn: localStorage.getItem({token:"token",roles:"roles"}) ? true : false,
    userName: "",
}
const authSlice = createSlice({
    name: "auth",
    initialState: authInitState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.token
            const roles = action.payload.user.roles
            const name=action.payload.user.userName
            state.token = token
            state.isUserLoggedIn = true
            localStorage.setItem("token", token)
            localStorage.setItem("roles", roles)
            localStorage.setItem("userName", name)

        },
        clearToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
        }
    }
})
export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer