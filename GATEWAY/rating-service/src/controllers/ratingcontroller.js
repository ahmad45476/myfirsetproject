const Rating = require('../models/rating');
const jwt = require('jsonwebtoken');

// Helper function to get user ID from token
const getUserId = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET).userId;
};

exports.addRating = async (req, res) => {
  try {
    
    const { artworkId, value,userId  } = req.body;
if (value < 1 || value > 5) {
  return res.status(400).json({ error: 'Rating must be between 1 and 5' });
}
    // التحقق من التقييم المسبق
    const existingRating = await Rating.findOne({ artworkId, userId }); 
    if (existingRating) {
      return res.status(400).json({ error: 'Rating already exists' });
    }

    const rating = await Rating.create({
  userId,
  artworkId,
  value
});

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const result = await Rating.aggregate([
      { $match: { artworkId } },
      { $group: { _id: null, average: { $avg: "$value" } } }
    ]);
    
    res.json({ average: result[0]?.average || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const checkUserRating = async () => {
  try {
    const response = await fetch(`${RATING_SERVICE_URL}/api/ratings/check/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // جرب تحويل البيانات داخل try جديد
    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      throw new Error("الرد لم يكن بصيغة JSON صالحة");
    }

    console.log("rating check response:", data);
    setUserRating(data.rating); // أو كيفما تعالجها
  } catch (err) {
    console.error("حدث خطأ أثناء التحقق من التقييم:", err);
  }
};
