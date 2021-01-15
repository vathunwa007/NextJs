import axios from "../constants/_config";

//method get read all product
const getAllProduct =()=>{
    return axios.get("/products");
}
//method getbyid read all product
const getByIdProduct =(id)=>{
    return axios.get(`/products/${id}`);
}
//method Post put product
const PostProduct =(json)=>{
    return axios.post(`/products`,json);
}
//method  putupdate product
const PutProduct =(id,data)=>{
    return axios.put(`/products/${id}`,data);
}
//method Delete put product
const DeleteProduct =(id)=>{
    return axios.delete(`/products/${id}`);
}


export {getAllProduct,getByIdProduct,PutProduct,DeleteProduct,PostProduct}
