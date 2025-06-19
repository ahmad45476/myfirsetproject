import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Share2, Bookmark, Star } from 'react-feather';

const ArtworkCard = ({ artwork, viewMode, onLike, onSave }) => {
  
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    if (onLike) onLike(artwork.id, newLikeStatus);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newSaveStatus = !isSaved;
    setIsSaved(newSaveStatus);
    if (onSave) onSave(artwork.id, newSaveStatus);
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < fullStars
                ? 'text-yellow-400 fill-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-xs text-gray-500 mr-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return viewMode === 'grid' ? (
    <Link to={`/artwork/${artwork._id}`} className="block">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="relative">
          <img 
            src={artwork.image} 
            alt={artwork.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold">{artwork.title}</h3>
            <p className="text-sm opacity-90">{artwork.category}</p>
            {artwork.rating && renderRatingStars(artwork.rating)}
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <Heart 
                className={isLiked ? 'text-[#d5006d] fill-[#d5006d]' : 'text-gray-500'} 
                size={18} 
              />
              <span className="text-sm">{isLiked ? artwork.likes + 1 : artwork.likes}</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="flex items-center space-x-1 text-gray-500"
            >
              <MessageSquare size={18} />
              <span className="text-sm">{artwork.comments}</span>
            </button>
            <button 
              onClick={handleSave}
              className="text-gray-500"
            >
              <Bookmark 
                className={isSaved ? 'text-[#d5006d] fill-[#d5006d]' : 'text-gray-500'} 
                size={18} 
              />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="text-gray-500"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  ) : (
    <Link to={`/artwork/${artwork.id}`} className="block">
      <motion.div
        whileHover={{ x: 5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden flex"
      >
        <div className="w-1/3">
          <img 
            src={artwork.image} 
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <h3 className="font-bold text-lg">{artwork.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{artwork.category}</p>
          {artwork.rating && renderRatingStars(artwork.rating)}
          <p className="text-gray-700 text-sm mb-4">{artwork.description || 'لا يوجد وصف متاح'}</p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={handleLike}
                className="flex items-center space-x-1"
              >
                <Heart 
                  className={isLiked ? 'text-[#d5006d] fill-[#d5006d]' : 'text-gray-500'} 
                  size={18} 
                />
                <span className="text-sm">{isLiked ? artwork.likes + 1 : artwork.likes}</span>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="flex items-center space-x-1 text-gray-500"
              >
                <MessageSquare size={18} />
                <span className="text-sm">{artwork.comments}</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="text-gray-500"
              >
                <Bookmark 
                  className={isSaved ? 'text-[#d5006d] fill-[#d5006d]' : 'text-gray-500'} 
                  size={18} 
                />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="text-gray-500"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ArtworkCard;