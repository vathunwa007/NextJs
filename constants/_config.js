import axios from "axios";

export default axios.create({
    baseURL: "https://www.itgenius.co.th/sandbox_api/cpallstockapi/public/api",
    headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "proxy": "https://localhost:3000",
        // "Access-Control-Allow-Methods": "PUT, DELETE,POST,GET"


    },
})