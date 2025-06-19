import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtworkCard from '../Components/ArtworkCard';

const Explore = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('الكل');

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. جلب المنشورات من خدمة المنشورات (4004)
        const postsResponse = await axios.get('http://localhost:3000/api/posts');
        console.log(postsResponse.data)
        // 2. جلب التفاعلات من خدمة التفاعلات (4001)
        const artworksWithDetails = await Promise.all(
          postsResponse.data.map(async post => {
            try {
              // يمكنك استبدال هذه الطلبات ب service متخصص عندما يكون جاهزاً
              const likes = await axios.get(`http://localhost:3000/api/interaction/likes/${post._id}`);
              const comments = await axios.get(`http://localhost:3000/api/interaction/comments/${post._id}`);
              const rating = await axios.get(`http://localhost:3000/api/rating/${post._id}`);
              
              return {
                ...post,
                likes: likes.data.count || 0,
                comments: comments.data.length ||0,
                rating: rating.data.average || 0,
                category: post.category  || 'غير مصنف'
              };
            } catch (error) {
              console.error(`Error fetching details for post ${post._id}:`, error);
              return {
                ...post,
                likes: 0,
                comments: 0,
                rating: 0,
                category: post.category || 'غير مصنف'
              };
            }
          })
        );
        
        setArtworks(artworksWithDetails);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setError('تعذر تحميل الأعمال الفنية. يرجى المحاولة لاحقاً');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const categories = ['الكل', 'رسم', 'تصوير', 'نحت', 'جرافيتي', 'فن رقمي'];

  const filteredArtworks = activeCategory === 'الكل'
    ? artworks
    : artworks.filter(art => art.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">استكشف الأعمال الفنية</h1>

      {/* فئات التصنيفات */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-[#d5006d] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* حالة التحميل */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d5006d]"></div>
        </div>
      )}

      {/* حالة الخطأ */}
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#d5006d] text-white rounded hover:bg-[#b0005a]"
          >
            حاول مرة أخرى
          </button>
        </div>
      )}

      {/* حالة عدم وجود أعمال فنية */}
      {!loading && !error && artworks.length === 0 && (
        <p className="text-center text-gray-500 py-10">لا توجد أعمال فنية متاحة حالياً</p>
      )}{/* عرض الأعمال الفنية */}
      {!loading && !error && artworks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map(artwork => (
            <ArtworkCard 
              key={artwork._id}  // تأكد من استخدام _id بدلاً من id إذا كان MongoDB
              artwork={artwork}
              viewMode="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;