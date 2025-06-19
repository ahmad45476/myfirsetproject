import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtworkContext } from '../context/ArtworkContext';
import UserInfoCard from '../Components/UserInfoCard';

const ArtistsPage = () => {
  const { artworks } = useContext(ArtworkContext);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueArtists = {};
    Object.values(artworks).forEach(artwork => {
      if (artwork.artist && artwork.artist.id && !uniqueArtists[artwork.artist.id]) {
        uniqueArtists[artwork.artist.id] = {
          ...artwork.artist,
          artworksCount: Object.values(artworks).filter(
            art => art.artist?.id === artwork.artist.id
          ).length
        };
      }
    });
    
    setArtists(Object.values(uniqueArtists));
    setLoading(false);
  }, [artworks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#d5006d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">الفنانين</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map(artist => (
          <div 
            key={artist.id} // إضافة key فريدة هنا
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
          
            <UserInfoCard 
              user={artist}
              showArtworksCount
              artworksCount={artist.artworksCount}
              disableLinks // إضافة هذا البروب لتجنب تداخل <a>
            />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;