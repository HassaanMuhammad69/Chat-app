import express from 'express';
import mongoose from 'mongoose';
import { tweetModel } from './../dbRepo/model.mjs'
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bucket from '../firebaseAdmin/index.mjs';
import fs from 'fs'
  


const storageConfig = multer.diskStorage({
    // destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var uploadMiddleware = multer({ storage: storageConfig })
 


const router = express.Router()


router.post('/tweet', uploadMiddleware.any(), (req, res) => {


    const body = req.body;

    const token = jwt.decode(req.cookies.Token)

    if ( // validation
        !body.text
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }
    console.log(body.text)


    bucket.upload(
        req.files[0].path,
        {
            destination: `tweetPictures/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2999'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // // delete file from folder before sending response back to client (optional but recommended)
                        // // optional because it is gonna delete automatically sooner or later
                        // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder

                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }

                        tweetModel.create({
                            text: body.text,
                            imageUrl: urlData[0],
                            owner: new mongoose.Types.ObjectId(token._id)
                        },
                            (err, saved) => {
                                if (!err) {
                                    console.log(saved);
                    
                                    res.send({
                                        message: "tweet added successfully"
                                    });
                                } else {
                                    res.status(500).send({
                                        message: "server error"
                                    })
                                }
                            })
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });




   
})

router.get('/tweets', (req, res) => {


    const body = req.body;

    const token = jwt.decode(req.cookies.Token)

    const userId = new mongoose.Types.ObjectId(token._id);

    tweetModel.find({ owner: userId, isDeleted: false }, {},
        {
            sort: { "_id": -1 },
            limit: 100,
            skip: 0,
            populate: {
                path: "owner",
                select: 'firstName lastName email'
            }
        },
        (err, data) => {
            if (!err) {
                res.send({
                    message: "got all tweets successfully",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
}, [])

router.get('/tweetFeed', (req, res) => {

    const page = req.query.page || 0

    tweetModel.find({ isDeleted: false }, {},
        {
            sort: { "_id": -1 },
            limit: 5,
            skip: page,
            populate: {
                path: "owner",
                select: 'firstName lastName email'
            }
        },
        (err, data) => {
            if (!err) {
                res.send({
                    message: "got all tweets successfully",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
}, [])

router.get('/tweet/:id', (req, res) => {

    const id = req.params.id;

    tweetModel.findOne({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
                res.send({
                    message: `get tweet by id: ${data._id} success`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: "tweet not found",
                })
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.delete('/tweet/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    tweetModel.deleteOne({
        _id: id,
        owner: new mongoose.Types.ObjectId(token._id)
    }
        , (err, deletedData) => {
            console.log("deleted: ", deletedData);
            if (!err) {

                if (deletedData.deletedCount !== 0) {
                    res.send({
                        message: "tweet has been deleted successfully",
                    })
                } else {
                    res.status(404);
                    res.send({
                        message: "No tweet found with this id: " + id,
                    });
                }
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });








})

router.put('/tweet/:id', async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.text
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "text": "value",
        }`)
        return;
    }

    try {
        let data = await tweetModel.findOneAndUpdate(
            {
                _id: id,
                owner: new mongoose.Types.ObjectId(token._id)
            },
            {
                text: body.text,

            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "tweet modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})


export default router