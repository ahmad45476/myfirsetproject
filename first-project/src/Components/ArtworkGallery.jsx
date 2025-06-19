import React from 'react';
import { Link } from 'react-router-dom';

const ArtworkGallery = ({ artworks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((art) => (
        <div key={art.id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <Link to={`/artwork/${art.id}`}>
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="p-4">
            <Link to={`/artwork/${art.id}`} className="font-medium hover:text-[#d5006d]">
              {art.title}
            </Link>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">بواسطة {art.artist}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm">❤️ {art.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkGallery;