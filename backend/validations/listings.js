// const { handleValidationErrors } = require('../utils/validation');
// //CHANGE OVER TO LISTING 
// const id = check('id')
//   .notEmpty()
//   .isInt({ min: 0 });
// const no = check('no')
//   .notEmpty()
//   .isInt({ min: 0 });
// const attack = check('attack')
//   .notEmpty()
//   .isInt({ min: 0, max: 100 })
//   .toInt();
// const defense = check('defense')
//   .notEmpty()
//   .isInt({ min: 0, max: 100 })
//   .toInt();
// const imageUrl = check('imageUrl')
//   .notEmpty()
//   .isURL({ require_protocol: false, require_host: false });
// const name = check('name').notEmpty();
// const type = check('type').notEmpty().isIn(types);
// const moves = check('moves').isArray();

// exports.validateCreate = [
//   no,
//   attack,
//   defense,
//   imageUrl,
//   name,
//   type,
//   moves,
//   handleValidationErrors,
// ];

// exports.validateUpdate = [
//   id,
//   no,
//   attack,
//   defense,
//   imageUrl,
//   name,
//   type,
//   moves,
//   handleValidationErrors,
// ];