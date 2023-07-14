import React from 'react';
import {useState, useEffect} from 'react';
import {copy ,linkIcon, loader, tick} from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';


const Demo = () => {
    const [article, setarticle] = useState({
        url:'',
        summary:'',
});
   const [allarticles,setallarticles]=useState([]);
  const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery();
  useEffect(()=>{
    const localstore = JSON.parse(localStorage.getItem('articles'));
    if(localstore){
      setallarticles(localstore);
    }
  },[]);
  const submitfun=async(e)=>{
    e.preventDefault();
    const {data} = await getSummary({articleUrl:article.url});
    if(data?.summary){
      const newart={...article,summary:data.summary};
      const updatedart=[newart,...allarticles];
      setallarticles(updatedart);
      setarticle(newart);
      localStorage.setItem('articles',JSON.stringify(updatedart));
    }
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
   <div className='flex flex-col w-full gap-2'>
    <form className='relative flex justify-center items-center' onSubmit={submitfun}>
        <img src={linkIcon} alt="link" className= 'absolute left-0 my-2 ml-3 w-5'/>
        <input type='url' 
        placeholder='Enter the link'
        value={article.url}
        onChange ={(e)=>setarticle({
            ...article,url:e.target.value})}
        required
        className='url_input peer'
        /> 
        <button
        type='submit'
        className='submit-btn peer-focus:border-gray-600'
        >
          Submit
        </button>
    </form>
    {/* this saves the browser history*/}
    <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
     {allarticles.reverse().map((item,index)=>(
      <div
      key={`link-${index}`}
      onClick={()=> setarticle(item)}
      className='link_card'>
        <div className='copy_btn'>
          <img src={copy}
          alt="copy"
          className='w-[40%] h-[40%] object-contain'/>
        </div>
        <p className='flex-1 font-inter
        text-purple-900 font-medium text-sm truncate'> {item.url} </p>
      </div>
     ))}
    </div>
   </div>
     {/* this section displays results*/}
     <div className='my-10 max-w-full flex justify-center items-center'>
      {isFetching ? (
        <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>
      ) : error? (
        <p className='text-black text-center font-satoshi'>error occured
        <br/>
        <span className='text-black text-center font-satoshi'>
          {error?.data?.error};
        </span>
        </p>
      ):(
        article.summary&&(
          <div className='flex flex-col gap-3'>
            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
              <span className='blue_gradient'>
                ArticleSummary
              </span>
            </h2>
            <div className='summary_box'>
              <p className='font-satoshi font-medium text-sm'>{article.summary}</p>
            </div>

            </div>
        )
      )}

     </div>
    </section>
  )
}

export default Demo