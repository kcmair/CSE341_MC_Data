const { check } = require('express-validator');

exports.bikeValidation = [
    check('make', 'Make is required.').not().isEmpty(),
    check('model', 'Model is required.').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('year', 'Please enter the year manufactured.').isLength({ min: 6 }),
    check('terrain', 'Invalid terrain. Enter street, dirt, or dual-sport.').isLength({ min: 6 })
]