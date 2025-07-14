const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;

exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, address } = req.body;
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({ url: file.path, public_id: file.filename }));
    }
    const property = new Property({
      title,
      description,
      price,
      address,
      images,
      user: req.user.id
    });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('user', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('user', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 