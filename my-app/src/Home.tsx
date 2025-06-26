import { BASE_URL } from "./constants/constant";
import { useEffect, useState } from "react";

const Home = () => {

    const [data, setData] = useState<any>();
    
    const getData = async () => {
       try{
             const response = await fetch(BASE_URL);
             const jsonData = await response.json();
             setData(jsonData);
       }catch(error){
            console.log(error);
       }
    }

    useEffect(() => {
        getData();
    },[])


    return(
        <div>
            {data && data.message}
        </div>
    )
}

export default Home;