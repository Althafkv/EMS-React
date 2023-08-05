import { base_url } from "./base_url"
import { commonRequest } from "./commonHTTPRequest"


// register api
export const register = async (body, header) => {
    return await commonRequest("POST", `${base_url}/register`, body, header)
}

// get all employees
export const allemployees = async (search) => {
    return await commonRequest("GET", `${base_url}/all-employees?search=${search}`, "")
}

// view employee
export const viewemployee = async (id) => {
    return await commonRequest("GET", `${base_url}/view-user/${id}`, "")
}

// remove employee
export const deleteEmployee = async (id) => {
    return await commonRequest("DELETE", `${base_url}/delete-user/${id}`, {})
}

// edit employee
export const editEmployee = async (id, body, header) => {
    return await commonRequest("PUT", `${base_url}/edit-user/${id}`, body, header)
}