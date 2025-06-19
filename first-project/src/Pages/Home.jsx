import React from 'react'
import HomeImage from '../Components/HomeImage'
import NaveBar from '../Components/NaveBar'
import FeaturedArtists from '../Components/FeaturedArtists';
import LatestArtworks from '../Components/LatestArtworks';

const Home = () => {

 const user = localStorage.getItem('artAppUser');
    const token = localStorage.getItem('artAppToken');
    console.log(user);
    
    console.log(token);
    
    

  return (
    <>
    <NaveBar/>
    <HomeImage/>
   <FeaturedArtists />
   <LatestArtworks/>
    </>
  )
}

export default Home