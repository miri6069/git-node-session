

import apiSlice from "../../app/apiSlice";

const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTheBasket: build.query({
            query: (id) => ({
                url: "api/basket",
                method: "GET"
            })
        }),
        addToBasket: build.mutation({
            query: ({ id, quantity }) => ({
                url: "api/basket",
                method: "POST",
                body: { id, quantity }
            })
        }),
        reduceItem: build.mutation({
            query: (_id)=>({
                url: "api/basket/reduce",
                method: "PUT",
                body: _id
            })
        }),
        increaseItem: build.mutation({
            query: (_id)=>({
                url: "api/basket/increase",
                method: "PUT",
                body: _id
            })
        }),
        deleteItem:build.mutation({
            query:(id)=>({
                url:"api/basket",
                method:"DELETE",
                body:id
            })
        })
    })
})
export const { useGetTheBasketQuery, useAddToBasketMutation,useReduceItemMutation,useIncreaseItemMutation,useDeleteItemMutation } = basketApiSlice