var express     = require('express');
var router      = express.Router();
const multer    = require('multer');
const azureBlobService = require('../Services/AzureBlobService');


const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage}).single('upload');

router.post('/', uploadStrategy, function (req, res, next) {

    azureBlobService.upload(req, res, function (err, success) {
        if (err) res.json(err);
        else
            res.json({foto: success})
    });
});
module.exports = router;