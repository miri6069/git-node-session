import apiSlice from "../../app/apiSlice"

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: "api/products",
                method: "GET"
            })
        }),
        addProduct: build.mutation({
            query: (productsValue) => ({
                url: "api/products",
                method: "POST",
                body: productsValue
            })
        }),
        deleteProduct: build.mutation({
            query: (idProduct) => ({
                url: "api/products",
                method: "DELETE",
                body: idProduct
            })
        }),
        updateProduct: build.mutation({
            query: (values)=>({
                url: `api/products/${values._id}`,
                method: "PUT",
                body: values
            })
        }),
        getTheProduct:build.query({
            query:(id)=>({
              url: `/api/products/getTheProduct/${id}`,
              method:"GET"
            })
        }),
        getCategory:build.query({
            query:(category)=>({
                url:`api/products/${category}`,
                method:"GET",
                
            })
        })

    })
})
export const { useGetAllProductsQuery, useAddProductMutation, useDeleteProductMutation,useUpdateProductMutation,useGetTheProductQuery,useGetCategoryQuery } = productApiSlice