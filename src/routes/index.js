import express from 'express';
const router = express.Router();
import nameRouter from './name';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    msg: "You got here.",
  })
});

router.use('/names', nameRouter);

export default router;