
var config = require('../Config/config');


const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=warankaimages;AccountKey=Qlj5k5dcHT1AXLopzmS44vlKSCr+9c78vUIPHRxd2SKMCH7fmvDZcNvVkMaQ98+k+QkC07eaR4e/IahexWDurQ==;EndpointSuffix=core.windows.net")

const containerName = "imagenes";
const getStream = require('into-stream')
const baseHost = config.aws.baseHost


function uploadFile(req, response, callback) {

    const blobName = req.time+ req.file.originalname
    const stream    =  getStream(req.file.buffer)
    const streamLength = req.file.buffer.length

    blobService.createBlockBlobFromStream(containerName,blobName, stream, streamLength, err => {

        if(err){
            callback(err)
        } else {
            callback()
        }
    })
}

function S3Service() {

}


S3Service.prototype.upload = function (req, response, callback) {

    req.time = Date.now().toString();
    uploadFile(req, response, function (error) {
        if (error) callback(error)
        else callback(null, baseHost+req.time+req.file.originalname);
    })
};

module.exports = new S3Service();