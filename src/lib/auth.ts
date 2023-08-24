export const getJwtSecretKey = () =>{
const secret = process.env.JWT_SECRET
if (!secret || secret.length===0) {
    throw new Error("JWT secret not set in the enviroment variable")
}
return secret;
}