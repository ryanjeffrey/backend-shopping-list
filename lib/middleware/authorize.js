const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  const item = await Item.getById(req.params.id);
  try {
    if (item && (req.user.id === item.user_id || req.user.email === 'admin')) {
      next();
    } else {
      throw new Error('You do not have access to this item');
    }
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
