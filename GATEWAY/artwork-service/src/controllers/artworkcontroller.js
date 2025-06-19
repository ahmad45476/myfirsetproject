const Artwork = require('../models/Artwork');

exports.createArtwork = async (req, res) => {
  try {
    const { title, description, imageUrl, artistId } = req.body;
    const artwork = new Artwork({ title, description, imageUrl, artist: artistId });
    await artwork.save();
    res.status(201).json(artwork);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create artwork' });
  }
};

exports.getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
};

exports.searchArtworks = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Artwork.find({
      title: { $regex: query, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching artworks' });
  }
};
