import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ArtworkContext } from '../context/ArtworkContext';
import UserInfoCard from '../Components/UserInfoCard';
import ArtworkCard from '../Components/ArtworkCard';

const ArtistPage = () => {
  const { id } = useParams();
  const { artworks } = useContext(ArtworkContext);
  const [artist, setArtist] = useState(null);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // البحث عن الفنان وأعماله
    const foundArtworks = Object.values(artworks).filter(art => art.artist?.id === id);
    
    if (foundArtworks.length > 0) {
      setArtist(foundArtworks[0].artist);
      setArtistArtworks(foundArtworks);
    }
    
    setLoading(false);
  }, [id, artworks]);

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  if (!artist) {
    return <div>الفنان غير موجود</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <UserInfoCard 
          user={artist} 
          isCurrentUser={false}
          showFullInfo
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">أعمال الفنان</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artistArtworks.map(artwork => (
          <ArtworkCard 
            key={artwork.id}
            artwork={artwork}
            viewMode="grid"
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;