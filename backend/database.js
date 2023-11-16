import mongoose from "mongoose"
export const db=()=>{
    
console.log('Hi')
    mongoose
    .connect("mongodb://127.0.0.1:27017/form"
    )
    .then(()=>{console.log("Database connected")})
    
    .catch((e)=>{console.log(e)})
    


}