import React from 'react';
import {logo} from '../assets';
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
  <img src={logo} alt="logo" className="w-28 object-contain" />
  <button
    type="button"
    onClick={() => window.open("https://github.com/Manasvi-2593/Aisummarizer")}
    className="black_btn ml-auto"
  >
    Link to project
  </button>
</nav>
 <h1 className='head_text'>
    A quick and easy way to summarize text using <br className='max-md:hidden'/>
    <span className='orange_gradient'> OpenAI</span>
 </h1>
 <h2 className='desc' >
    This AI integrated web-app will help you to transform any lengthy articles to short summaries
 </h2>
    </header>

  )
}

export default Hero
