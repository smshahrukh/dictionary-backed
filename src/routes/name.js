import express from 'express';
const router = express.Router();
const { Op } = require("sequelize");
import db from "../models/index"

const fetchNames = async (req, res, next) => {
    const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const key = req.query.key;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const result = {};
      const totalCount = await db.Name.count();
      if (!key) {
          if (endIndex < (totalCount)) {
            result.next = {
              page: page + 1,
              limit: limit,
            };
          }
          if (startIndex > 0) {
            result.previous = {
              page: page - 1,
              limit: limit,
            };
          }
          result.lastPage = Math.floor(totalCount/limit);
      }
      try {
          const whereObj = key ? { where: { name: {[Op.like]: `%${key}`} }} : {limit: limit, offset: startIndex}
        result.results = await db.Name.findAll({
            ...whereObj,
            order: [['name', 'ASC']],
        });
        res.status(200).json({result})
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
}

const postName = async (req, res, next) => {
    const { body } = req;
    try {
        if (body.name) {
            await db.Name.create({name: body.name});
        }
        res.status(200).json({
            data: body.name
        })
    }
    catch(e) {
        res.status(400).json({
            "error": "Something went wrong"
        })
    }
}

const deleteName = async (req, res, next) => {
    const { params } = req;
    await db.Name.destroy({
        where: {
            id: params.id
        }
      })
    res.status(200).json({
        message: "Deleted"
    })
}

router.post('/', postName)
router.get('/', fetchNames)
router.delete('/:id', deleteName)

export default router;