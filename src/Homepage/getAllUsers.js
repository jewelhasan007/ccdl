import axios from "axios";

export const getAllUsers = async  () =>{
    try {
  const resp =  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/api`);
        console.log("Users data from users api server call=", resp)
        return resp.data       
    } catch (error) {
        return []
    }

}

