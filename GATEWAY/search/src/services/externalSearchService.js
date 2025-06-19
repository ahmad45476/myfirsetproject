const axios = require('axios');
const { authUserUrl, artworkUrl, postUrl } = require('../config/services');

const searchArtists = async (query) => {
  try {
    const res = await axios.get(`${authUserUrl}/api/users`, {
      params: { name: query }
    });
    return res.data.data || [];
  } catch (error) {
    return [];
  }
};

const searchArtworks = async (query) => {
  try {
    const res = await axios.get(`${artworkUrl}/api/artworks/search`, {
      params: { title: query }
    });
    return res.data.data || [];
  } catch (error) {
    return [];
  }
};

const searchPosts = async (query) => {
  try {
    const res = await axios.get(`${postUrl}/api/posts/search`, {
      params: { content: query }
    });
    return res.data.data || [];
  } catch (error) {
    return [];
  }
};

module.exports = {
  searchArtists,
  searchArtworks,
  searchPosts
};
