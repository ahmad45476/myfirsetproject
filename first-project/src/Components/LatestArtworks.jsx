import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const LatestArtworks = () => {
  const artworks = [
    {
      id: 1,
      title: "حنين الماضي",
      artist: "ليلى أحمد",
      image: "https://images.unsplash.com/photo-1579820016140-6a96782b1599",
      likes: 245
    },
    {
      id: 2,
      title: "ألوان المدينة",
      artist: "عمر النجار",
      image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8",
      likes: 189
    },
    {
      id: 3,
      title: "الوجوه الخفية",
      artist: "نورا خالد",
      image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7",
      likes: 312
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-[#333]"
        >
          أحدث الأعمال
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl shadow-md"
            >
              <img 
                src={artwork.image} 
                alt={artwork.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">{artwork.title}</h3>
                <p className="text-sm">بواسطة {artwork.artist}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm">❤️ {artwork.likes} إعجاب</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
             <Link 
             to="/explore"  // مسار ثابت لصفحة الفنانين
             className="inline-block px-6 py-3 bg-[#d5006d] text-white rounded-lg hover:bg-[#b0005a]"
           >
            عرض جميع الأعمال
         </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArtworks;