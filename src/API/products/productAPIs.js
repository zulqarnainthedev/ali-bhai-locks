import axios from "axios";

export async function getProducts(){

try{

const response = await axios("https://hardware-api-1kp1.onrender.com/api/products");
return response.data


}catch(error){
console.log("an errro has occured ", error);

}

}