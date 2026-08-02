import axios from "axios";

export async function getProducts(){

try{

const response = await axios("http://localhost:5000/api/products")
return response.data


}catch(error){
console.log("an errro has occured ", error);

}

}