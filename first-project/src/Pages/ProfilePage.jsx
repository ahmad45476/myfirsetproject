import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdPalette } from 'react-icons/md';
import { Bookmark, Users, Heart, Grid, List, MessageSquare } from 'react-feather';
import UserInfoCard from '../Components/UserInfoCard';
import ArtworkCard from '../Components/ArtworkCard';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ isCurrentUser = false }) => {
  const [activeTab, setActiveTab] = useState('artworks');
  const [viewMode, setViewMode] = useState('grid');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUserId = 1;
  const viewingOwnProfile = user && user.id === currentUserId;

  const handleLike = (artworkId, newLikeStatus) => {
    setUser(prev => ({
      ...prev,
      artworks: prev.artworks.map(art => 
        art.id === artworkId 
          ? { ...art, likes: newLikeStatus ? art.likes + 1 : art.likes - 1 }
          : art
      )
    }));
  };

  const toggleSaveArtwork = (artworkId) => {
    setUser(prev => {
      const isSaved = prev.savedArtworks.some(a => a.id === artworkId);
      const savedArtworks = isSaved 
        ? prev.savedArtworks.filter(a => a.id !== artworkId)
        : [...prev.savedArtworks, prev.artworks.find(a => a.id === artworkId)];
      
      return {
        ...prev,
        savedArtworks
      };
    });
  };

  // بيانات تجريبية - في الواقع ستأتي من API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setTimeout(() => {
          setUser({
            id: 1,
            fullName: "فنان مشهور",
            username: "@famous_artist",
            bio: "فنان تشكيلي متخصص في الرسم الزيتي، أعرض أعمالي منذ 2015 ولدي عدة معارض فردية وجماعية",
            email: "artist@example.com",
            phone: "+966501234567",
            gender: "ذكر",
            age: 32,
            role: "فنان محترف",
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            coverImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968",
            artworks: [
              {
                id: 1,
                title: "حنين الماضي",
                image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
                likes: 245,
                comments: 32,
                category: "رسم زيتي",
                createdAt: "2023-05-15"
              },
              {
                id: 2,
                title: "ألوان المدينة",
                image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8",
                likes: 189,
                comments: 24,
                category: "فن الشارع",
                createdAt: "2023-04-22"
              },
              {
                id: 3,
                title: "الوجوه الخفية",
                image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7",
                likes: 312,
                comments: 45,
                category: "بورتريه",
                createdAt: "2023-06-10"
              }
            ],
            followers: 1500,
            following: 320,
            savedArtworks: []
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const openArtworkDetail = (artwork) => {
    navigate(`/artwork/${artwork.id}`, { state: { artwork, user } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#d5006d] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8 text-gray-500">
        لا يوجد مستخدم
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* غلاف الصفحة */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={user.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* محتوى الصفحة */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* معلومات المستخدم */}
          <div className="lg:w-1/3">
            <UserInfoCard user={user} isCurrentUser={viewingOwnProfile} />
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:w-2/3">
            {/* الإحصائيات */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <div className={`grid ${isCurrentUser ? 'grid-cols-3' : 'grid-cols-4'} gap-4 text-center`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab('artworks')}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${activeTab === 'artworks' ? 'bg-[#d5006d]/10' : 'hover:bg-gray-100'}`}
                >
                  <p className="text-2xl font-bold text-[#d5006d]">{user.artworks.length}</p>
                  <p className="text-gray-600">أعمال</p>
                </motion.div>
                
                {!isCurrentUser && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveTab('followers')}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${activeTab === 'followers' ? 'bg-[#d5006d]/10' : 'hover:bg-gray-100'}`}
                  >
                    <p className="text-2xl font-bold text-[#d5006d]">{user.followers}</p>
                    <p className="text-gray-600">متابعون</p>
                  </motion.div>
                )}
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab('following')}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${activeTab === 'following' ? 'bg-[#d5006d]/10' : 'hover:bg-gray-100'}`}
                >
                  <p className="text-2xl font-bold text-[#d5006d]">{user.following}</p>
                  <p className="text-gray-600">متابَعون</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab('saved')}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${activeTab === 'saved' ? 'bg-[#d5006d]/10' : 'hover:bg-gray-100'}`}
                >
                  <p className="text-2xl font-bold text-[#d5006d]">{user.savedArtworks.length}</p>
                  <p className="text-gray-600">محفوظات</p>
                </motion.div>
              </div>
            </motion.div>

            {/* تبويبات المحتوى */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center"
            >
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('artworks')}
                  className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'artworks' ? 'bg-[#d5006d] text-white' : 'text-gray-700'}`}
                >
                  <MdPalette className="mr-2" size={20} />
                  الأعمال
                </button>
                {isCurrentUser && (
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'saved' ? 'bg-[#d5006d] text-white' : 'text-gray-700'}`}
                  >
                    <Bookmark className="mr-2" size={18} />
                    المحفوظات
                  </button>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#d5006d] text-white' : 'bg-gray-100'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#d5006d] text-white' : 'bg-gray-100'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </motion.div>

            {/* محتوى التبويب النشط */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'artworks' && (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {user.artworks.map(artwork => (
                    <ArtworkCard 
                      key={artwork.id} 
                      artwork={artwork} 
                      viewMode={viewMode}
                      isSaved={user.savedArtworks.some(a => a.id === artwork.id)}
                      onSave={() => toggleSaveArtwork(artwork.id)}
                      onClick={() => openArtworkDetail(artwork)}
                      onLike={(liked) => handleLike(artwork.id, liked)}
                      showCommentsCount
                    />
                  ))}
                </div>
              )}

              {activeTab === 'saved' && isCurrentUser && (
                user.savedArtworks.length > 0 ? (
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {user.savedArtworks.map(artwork => (
                      <ArtworkCard 
                        key={artwork.id} 
                        artwork={artwork} 
                        viewMode={viewMode}
                        isSaved={true}
                        onSave={() => toggleSaveArtwork(artwork.id)}
                        onClick={() => openArtworkDetail(artwork)}
                        onLike={(liked) => handleLike(artwork.id, liked)}
                        showCommentsCount
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-md p-8 text-center"
                  >
                    <Bookmark className="mx-auto text-gray-400" size={48} />
                    <h3 className="text-xl font-medium text-gray-600 mt-4">لا توجد أعمال محفوظة</h3>
                    <p className="text-gray-500 mt-2">احفظ الأعمال التي تعجبك لتجدها هنا لاحقاً</p>
                  </motion.div>
                )
              )}

              {activeTab === 'followers' && !isCurrentUser && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-md p-8 text-center"
                >
                  <Users className="mx-auto text-gray-400" size={48} />
                  <h3 className="text-xl font-medium text-gray-600 mt-4">قائمة المتابعين</h3>
                  <p className="text-gray-500 mt-2">ستظهر هنا قائمة الأشخاص الذين يتابعونك</p>
                </motion.div>
              )}

              {activeTab === 'following' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-md p-8 text-center"
                >
                  <Users className="mx-auto text-gray-400" size={48} />
                  <h3 className="text-xl font-medium text-gray-600 mt-4">قائمة المتابَعين</h3>
                  <p className="text-gray-500 mt-2">ستظهر هنا قائمة الأشخاص الذين تتابعهم</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;