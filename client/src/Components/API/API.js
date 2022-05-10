import axios from "axios"

const userApiURL = window.location.hostname === "localhost" 
? 
"http://localhost:8080/api/v1/users" 
:
"https://better-bank-account-api.herokuapp.com/api/v1/users"

const accountApiURL = window.location.hostname === "localhost"
?
"http://localhost:8080/api/v1/accounts" 
:
"https://better-bank-account-api.herokuapp.com/api/v1/accounts"

export const userApi = axios.create({
    baseURL: userApiURL,
    withCredentials: true,
});

export const accountApi = axios.create({
    baseURL: accountApiURL,
    withCredentials: true,
})