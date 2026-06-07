import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const hubSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  hours: { type: String },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  images: [{ type: String }],
  services: [{ type: String }],
  verified: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  monthlyVisitors: { type: Number, default: 0 },
  reviews: [reviewSchema],
  pricing: {
    hourly: { type: Number },
    daily: { type: Number },
    monthly: { type: Number }
  },
  amenities: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Index for geospatial queries
hubSchema.index({ coordinates: '2dsphere' });
hubSchema.index({ city: 1, category: 1 });

export default mongoose.model('Hub', hubSchema);