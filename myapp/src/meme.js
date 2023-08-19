import './App.css'
import React from 'react'

export default function Meme(){
  // https://api.imgflip.com/get_memes
        const[data,dataFunction]=React.useState({
          top_text:"",
          bottom_text:"",
          memeImage:"../images/memeIcon.png"
        });

      function handleChange(event){
        const{name,value}=event.target;
        dataFunction(prevState=>({
          ...prevState,
          [name]:value
        }))
      }

     const[allMemes,setAllMemes]=React.useState({});
     console.log(allMemes) 
     React.useEffect(function(){
     fetch("https://api.imgflip.com/get_memes")
       .then(res=>res.json())
       .then(data=>setAllMemes(data))
     },[])

    //  Incase if we want to use async 
  //    React.useEffect(() => {
  //     async function getMemes() {
  //         const res = await fetch("https://api.imgflip.com/get_memes")
  //         const data = await res.json()
  //         setAllMemes(data.data.memes)
  //     }
  //     getMeme()
  // }, [])


     function getImage(){
      const memeData=allMemes.data.memes;
      const randomMemeData=Math.floor(Math.random()*memeData.length);
      dataFunction(prevState=>({
        ...prevState,
        memeImage:allMemes.data.memes[randomMemeData].url
      }))
     }

    return(
        <div className='main'>
           <div className='form'>
            <input type='text' className='form--input' placeholder='Top text' onChange={handleChange} name='top_text' value={data.top_text}/>
            <input type='text' className='form--input' placeholder='Bottom text' onChange={handleChange} name='bottom_text' value={data.bottom_text}/>
            <button className='form--button' onClick={getImage}> Get a meme image <i class="fa-solid fa-image"></i></button>
           </div>
           <div className="meme">
                <img src={data.memeImage} className="meme--image" />
                <h2 className="meme--text top">{data.top_text}</h2>
                <h2 className="meme--text bottom">{data.bottom_text}</h2>
            </div>
        </div>
    )
}