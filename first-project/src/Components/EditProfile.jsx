import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    profileImage: null,
    coverImage: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // جلب بيانات المستخدم الحالية من API
    // setFormData(currentUserData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // إرسال التعديلات إلى API
    navigate('/profile');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">تعديل الملف الشخصي</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">الاسم الكامل</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1">نبذة عنك</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-1">صورة الملف الشخصي</label>
          <input
            type="file"
            onChange={(e) => setFormData({...formData, profileImage: e.target.files[0]})}
            className="w-full px-4 py-2 border rounded-lg"
            accept="image/*"
          />
        </div>

        <div>
          <label className="block mb-1">صورة الغلاف</label>
          <input
            type="file"
            onChange={(e) => setFormData({...formData, coverImage: e.target.files[0]})}
            className="w-full px-4 py-2 border rounded-lg"
            accept="image/*"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-[#d5006d] text-white py-3 rounded-lg hover:bg-[#b0005a]"
          >
            حفظ التعديلات
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex-1 bg-gray-200 py-3 rounded-lg"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;