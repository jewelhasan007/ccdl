

export const navItemsDB = async() =>{
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/component/sections/api`);
        const data = await resp.json();
        return data
    } catch (error) {
     
       
    }
}



