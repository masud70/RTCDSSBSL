export const login = (phone, password) => {
    if(phone === "0123" && password === "pass"){
        return {
            type: "SUCCESS"
        }
    }else{
        return {
            type: "FAILED"
        }
    }
}