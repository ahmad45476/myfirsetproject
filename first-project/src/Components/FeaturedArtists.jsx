
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const FeaturedArtists = () => {
  const artists = [
    {
      id: 1,
      name: "أحمد الشريف",
      specialty: "الرسم الزيتي",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      followers: "12.5K"
    },
    {
      id: 2,
      name: "سارة محمد",
      specialty: "النحت الحديث",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      followers: "8.3K"
    },
    {
      id: 3,
      name: "خالد الفنون",
      specialty: "الجرافيتي",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e",
      followers: "15.2K"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#f8f9fa] to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-[#333]"
        >
          فنانونا المميزون
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{artist.name}</h3>
                  <p className="text-sm">{artist.specialty}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-gray-600">👥 {artist.followers} متابع</span>
                <button className="px-4 py-2 bg-[#d5006d] text-white rounded-lg hover:bg-[#b0005a]">
                  متابعة
                </button>
                
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
    to="/artists"  // مسار ثابت لصفحة الفنانين
    className="inline-block px-6 py-3 bg-[#d5006d] text-white rounded-lg hover:bg-[#b0005a]"
  >
    عرض جميع الفنانين
  </Link>

               </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArtists;