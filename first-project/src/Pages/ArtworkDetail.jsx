import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, MessageSquare, Bookmark, Share2, Edit, Trash2 } from 'react-feather';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('artAppToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ArtworkDetail = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
const userId=localStorage.getItem('UserId');
  const token = localStorage.getItem('artAppToken');
  const artworkId=postId
console.log("userId:"+userId);
console.log("token:"+token);
console.log("postId"+artworkId);

const currentUser = JSON.parse(localStorage.getItem('userData'));
console.log(currentUser);

  
  useEffect(() => {
    console.log('Token:', localStorage.getItem('artAppToken'));
    const fetchData = async () => {
      try {
        const [postRes, likesRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/posts/${postId}`),
          axios.get(`http://localhost:3000/api/interaction/likes/${postId}`),
          axios.get(`http://localhost:3000/api/interaction/comments/${postId}`)
        ]);

        const postData = postRes.data;
        const likesData = likesRes.data;
        const commentsData = commentsRes.data;

        const artworkData = {
          ...postData,
          artist: {
            name: postData.user?.name || 'مستخدم',
            image: postData.user?.image || '/default-avatar.jpg'
          },
          title: postData.title,
          description: postData.content,
          image: postData.image || '/default-artwork.jpg',
          category: postData.category || 'بدون تصنيف',
          createdAt: postData.createdAt,
          userId: postData.userId,
          likes: likesData.count || 0,
          isLiked: likesData.isLiked || false,
          comments: commentsData.map(c => ({
            ...c,
            user: c.user?.name || 'مستخدم',
            userImage: c.user?.image || '/default-avatar.jpg',
            time: c.createdAt
          })),
          ratings: postData.ratings || [],
          averageRating: postData.averageRating || 0
        };
 
console.log(userId);

console.log(token);
console.log(postId);
        setArtwork(artworkData);
        setLiked(artworkData.isLiked);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    
    };

    fetchData();
  }, [postId]);

  const isOwner = artwork && currentUser?.id === artwork.userId;
  const comments = artwork?.comments || [];

  const handleLike = async () => {
  try {
    

    const response = await axios.post('http://localhost:3000/api/interaction/likes', {
      artworkId,
      userId,  // أو currentUser._id إذا كانت هكذا في كائن المستخدم
    });

    console.log('Like updated:', response.data);
    setLiked(true);  // ممكن تضيف تغيير الحالة هنا لو تحب
  } catch (error) {
    console.error('Error updating like:', error);
  }
};

const checkUserRating = async (artworkId, userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/rating/myrate`, {
      headers: {
        artworkId,userId
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Received non-JSON response");
    }

    const data = await response.json();
    
    if (data.hasRated) {
      console.log(`قمت بتقييم هذا العمل بـ: ${data.rating} نجوم`);
      // تحديث الواجهة هنا
    } else {
      console.log('لم تقم بتقييم هذا العمل بعد');
    }
  } catch (error) {
    console.error('حدث خطأ أثناء التحقق من التقييم:', error);
    // يمكنك عرض رسالة للمستخدم هنا إذا أردت
  }
};

// استخدامه في useEffect
useEffect(() => {
  const fetchRating = async () => {
    await checkUserRating(postId, userId);
  };
  
  if (postId && userId) {
    fetchRating();
  }
}, [postId, userId]);

  const handleRating = async (rating) => {
    if (userRating === 0) {
      try {
        setUserRating(rating);
        await axios.post(`http://localhost:3000/api/rating`, 
  {
    artworkId,
    value: rating,
    userId
  },
  {
    headers: {
      Authorization: `Bearer ${token}`  // تأكد من جلب التوكن من localStorage أو context
    }
  }
);

        
        setArtwork(prev => {
          const newRatings = [...prev.ratings, rating];
          const newAverage = newRatings.reduce((a, b) => a + b, 0) / newRatings.length;
          return {
            ...prev,
            ratings: newRatings,
            averageRating: newAverage
          };
        });
      } catch (error) {
        console.error('Error rating post:', error);
        setUserRating(0);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const response = await axios.post('http://localhost:3000/api/interaction/comments', {
          userId,
          artworkId,
          text: comment
        });
        
        const newComment = {
          ...response.data,
          user: currentUser.name,
          userImage: currentUser.image,
          time: new Date().toISOString()
        };
        
        setArtwork(prev => ({
          ...prev,
          comments: [...prev.comments, newComment]
        }));
        
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/interaction/comments/${commentId}`);
      setArtwork(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c._id !== commentId)
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:3000/api/posts/${postId}`);
        navigate('/profile');
      } catch (error) {
        console.error('Error deleting post:', error);
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#d5006d] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="text-center py-10 text-gray-500">
        لا يوجد منشور بهذا المعرف
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={artwork.artist?.image}
                alt={artwork.artist?.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => e.target.src = '/default-avatar.jpg'}
              />
              <div>
                <p className="font-medium">{artwork.artist?.name}</p>
                <p className="text-xs text-gray-500">{artwork.category}</p>
              </div>
            </div>

            {isOwner && (
              <div className="flex space-x-2">
                <button 
                  onClick={() => navigate(`/edit-post/${postId}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition"
                >
                  <Edit size={16} className="ml-1" />
                  تعديل
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg flex items-center hover:bg-red-600 transition disabled:opacity-50"
                >
                  <Trash2 size={16} className="ml-1" />
                  {isDeleting ? 'جاري الحذف...' : 'حذف'}
                </button>
              </div>
            )}
          </div>
        </div>

        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full max-h-[600px] object-contain bg-gray-100"
          onError={(e) => e.target.src = '/default-artwork.jpg'}
        />

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button 
                onClick={handleLike} 
                className="flex items-center space-x-1 hover:text-[#d5006d] transition"
              >
                {liked ? (
                  <Heart className="text-[#d5006d] fill-[#d5006d]" size={18} />
                ) : (
                  <Heart size={18} />
                )}
                <span>{artwork.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageSquare size={18} />
                <span>{comments.length}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Bookmark size={18} className="hover:text-[#d5006d] cursor-pointer" />
              <Share2 size={18} className="hover:text-[#d5006d] cursor-pointer" />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2">{artwork.title}</h2>
            <p className="text-gray-700 mb-3">{artwork.description}</p>
            <p className="text-xs text-gray-500">
              تم النشر في {new Date(artwork.createdAt).toLocaleDateString('ar-SA')}
            </p>
          </div>

          <div className="mb-6 border-t pt-4">
            <h4 className="text-lg font-medium mb-2">تقييم المنشور</h4>
            <div className="flex items-center">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRating(star)}
                    disabled={userRating > 0}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={
                        star <= (hoverRating || userRating || Math.floor(artwork.averageRating || 0))
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </motion.button>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {(artwork.averageRating || 0).toFixed(1)} من 5
                </p>
                <p className="text-xs text-gray-500">
                  ({artwork.ratings?.length || 0} تقييمات)
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">التعليقات ({comments.length})</h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-4 flex">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="أضف تعليقًا..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d5006d] focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="bg-[#d5006d] text-white px-4 py-2 rounded-r-lg hover:bg-[#b0005a] transition"
              >
                نشر
              </button>
            </form>

            {comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex space-x-3 group">
                    <img
                      src={comment.userImage}
                      alt={comment.user}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => e.target.src = '/default-avatar.jpg'}
                    />
                    <div className="bg-gray-100 p-3 rounded-lg flex-1 relative">
                      {(currentUser?.id === comment.userId || isOwner) && (
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="absolute top-2 left-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <p className="font-medium">{comment.user}</p>
                      <p className="text-gray-700">{comment.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(comment.time).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">لا توجد تعليقات حتى الآن</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;