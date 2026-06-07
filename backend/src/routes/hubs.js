import express from 'express';
import Hub from '../models/Hub.js';

const router = express.Router();

// GET /api/hubs - Get all hubs with filtering
router.get('/', async (req, res) => {
  try {
    const { city, category, lat, lng, radius = 10 } = req.query;
    let query = { isActive: true };

    if (city) query.city = new RegExp(city, 'i');
    if (category) query.category = category;

    // Geospatial search if coordinates provided
    if (lat && lng) {
      query.coordinates = {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    }

    const hubs = await Hub.find(query)
      .populate('owner', 'name email')
      .sort({ rating: -1 })
      .limit(50);

    res.json({
      success: true,
      data: hubs,
      count: hubs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hubs',
      error: error.message
    });
  }
});

// GET /api/hubs/:slug - Get specific hub
router.get('/:slug', async (req, res) => {
  try {
    const hub = await Hub.findOne({ slug: req.params.slug, isActive: true })
      .populate('owner', 'name email')
      .populate('reviews.user', 'name');

    if (!hub) {
      return res.status(404).json({
        success: false,
        message: 'Hub not found'
      });
    }

    res.json({
      success: true,
      data: hub
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hub',
      error: error.message
    });
  }
});

export default router;