const mongoose = require('mongoose');
const Property = require('../models/Property');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/realestate';

const sampleProperties = [
  {
    title: 'Modern Family Home',
    description: 'A beautiful modern family home with 4 bedrooms, 3 bathrooms, and a spacious backyard.',
    price: 9500000,
    address: '123 Green Avenue, Mumbai, Maharashtra',
    images: [
      { url: '/pexels-binyaminmellish-1396132.jpg', public_id: 'sample1' }
    ]
  },
  {
    title: 'Luxury Apartment',
    description: 'A luxury apartment in the heart of the city with all amenities and a great view.',
    price: 12000000,
    address: '45 City Center, Bengaluru, Karnataka',
    images: [
      { url: '/pexels-pixabay-259593.jpg', public_id: 'sample2' }
    ]
  },
  {
    title: 'Cozy Cottage',
    description: 'A cozy cottage perfect for a small family or a couple, surrounded by nature.',
    price: 6500000,
    address: 'Hilltop Road, Shimla, Himachal Pradesh',
    images: [
      { url: '/pexels-pixabay-280222.jpg', public_id: 'sample3' }
    ]
  },
  {
    title: 'Urban Studio',
    description: 'A compact and stylish studio apartment ideal for young professionals.',
    price: 4200000,
    address: 'Downtown, Pune, Maharashtra',
    images: [
      { url: '/hero-image.jpg', public_id: 'sample4' }
    ]
  }
];

async function seed() {
  await mongoose.connect(MONGO_URL);
  const user = await User.findOne();
  if (!user) {
    console.log('No user found. Please register at least one user first.');
    process.exit(1);
  }
  for (const prop of sampleProperties) {
    prop.user = user._id;
  }
  await Property.insertMany(sampleProperties);
  console.log('Sample properties inserted!');
  await mongoose.disconnect();
}

seed(); 