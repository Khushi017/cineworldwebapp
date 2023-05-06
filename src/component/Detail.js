import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import {db} from '../firebase/Firebase';
import {doc, getDoc} from 'firebase/firestore';
import { Bars } from "react-loader-spinner";
import Reviews from "./Reviews";

const Detail = () => {
    const {id} = useParams();
    const [data, setData] = useState({
      title:'',
      year:'',
      image:'',
      description:'',
      rating:0,
      rated:0
    });

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      async function getData(){
        setLoading(true);
        const _doc = doc(db, "movies",id);
        const _data = await getDoc(_doc);
        setData(_data.data());
        console.log(_data)
        setLoading(false);
        // console.log(data);
      }
      getData();
      
    },[])
    
  return (
    <div className="p-4 mt-4 w-full flex flex-col items-center md:flex-row md:items-start justify-center">
      {loading? <div className="h-96 flex w-full justify-center items-center"><Bars height={35} color="white" /></div> :
      <>
      <img className="h-100 w-80 block md:sticky top-28 " src= {data.image} />
        {/* console.log({data.image}); */}
      <div className=" ml-0 md:ml-4 w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-400">
          {data.title}<span className="text-xl"> ({data.year})</span>
        </h1>
        <ReactStars size={20}
          half={true}
          value={data.rating/data.rated}
          edit={false} />
        <p className="mt-3">
            {data.description}
        </p>
        <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
      </div>
      </>
      }   
    </div>
  );
};

export default Detail;
