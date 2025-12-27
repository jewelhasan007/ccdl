import axios from "axios";

export const getAllPriorityTaskDB = async  () =>{
try {
    const resp =  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/priority-task/api`);
    // const resp =  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/component/sections/api`);
 
    return resp.data
} catch (error) {
    return []
}
}

