import apiSlice from "../../app/apiSlice"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        registerFunc: build.mutation({
            query: (registerUser) => ({
                url: "api/auth/register",
                method: "POST",
                body: registerUser
            })
        }),

        loginFunc: build.mutation({
            query: (loginUser) => ({
                url: "api/auth/login",
                method: "POST",
                body: loginUser
            })
        })
    })
})
export const { useRegisterFuncMutation, useLoginFuncMutation } = authApiSlice