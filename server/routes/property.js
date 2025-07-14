const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'properties',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.array('images', 5), createProperty);
router.get('/', getProperties);
router.get('/:id', getProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router; 