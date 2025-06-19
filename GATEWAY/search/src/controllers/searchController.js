const {
  searchArtists,
  searchArtworks,
  searchPosts
} = require('../services/externalSearchService');

const globalSearch = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: 'Query is required' });

  const [artists, artworks, posts] = await Promise.all([
    searchArtists(query),
    searchArtworks(query),
    searchPosts(query)
  ]);

  res.json({
    artists,
    artworks,
    posts
  });
};

module.exports = {
  globalSearch
};
