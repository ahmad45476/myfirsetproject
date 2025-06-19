const User = require('../models/User');

// متابعة فنان
exports.followArtist = async (req, res) => {
  const userId = req.user.userId;
  const artistId = req.params.artistId;

  if (userId === artistId) {
    return res.status(400).json({ message: "لا يمكنك متابعة نفسك." });
  }

  const user = await User.findById(userId);
  const artist = await User.findById(artistId);

  if (!artist || artist.role !== 'artist') {
    return res.status(404).json({ message: 'لا يمكنك متابعة أشخاص ليسوا فنانين '});
  }

  if (user.following.includes(artistId)) {
    return res.status(400).json({ message: 'أنت تتابع هذا الفنان بالفعل' });
  }

  user.following.push(artistId);
  artist.followers.push(userId);

  await user.save();
  await artist.save();

  res.json({ message: 'تمت المتابعة بنجاح' });
};

// إلغاء المتابعة
exports.unfollowArtist = async (req, res) => {
  const userId = req.user.userId;
  const artistId = req.params.artistId;

  const user = await User.findById(userId);
  const artist = await User.findById(artistId);

  if (!artist || artist.role !== 'artist') {
    return res.status(404).json({ message: 'الفنان غير موجود' });
  }

  user.following = user.following.filter(id => id.toString() !== artistId);
  artist.followers = artist.followers.filter(id => id.toString() !== userId);

  await user.save();
  await artist.save();

  res.json({ message: 'تم إلغاء المتابعة' });
};

// جلب قائمة الفنانين الذين أتابعهم
exports.getFollowingArtists = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('following', 'name email role');

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    res.json({
      count: user.following.length,
      following: user.following
    });

  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب قائمة المتابعة', error: err.message });
  }
};

exports.getMyFollowers = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('followers', 'name email role');

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    res.json({
      count: user.followers.length,
      followers: user.followers
    });

  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المتابعين', error: err.message });
  }
};
