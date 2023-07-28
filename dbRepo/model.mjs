import mongoose from 'mongoose';


let tweetSchema = new mongoose.Schema({
    text: { type: String, required: true }, 
    owner: { type: mongoose.ObjectId, ref: "users" , required: true },
    imageUrl:{type:String},
    isDeleted:{type: Boolean, default: false},
    createdOn: { type: Date, default: Date.now }
});
export const tweetModel = mongoose.model('products', tweetSchema);


const messageSchema = new mongoose.Schema({
    from: { type: mongoose.ObjectId, ref: "users" , required: true },
    to:{ type: mongoose.ObjectId, ref: "users" , required: true },
    text: { type: String, required: true }, 
    imageUrl:{type:String}, 
    createdOn: { type: Date, default: Date.now },
});
messageSchema.index({text:'text'})
export const messageModel = mongoose.model('Messages', messageSchema);


const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});
userSchema.index({firstName:'text' , lastName:'text'})
export const userModel = mongoose.model('users', userSchema);


const otpSchema = new mongoose.Schema({
    otp: String,
    email: String, 
    isUsed: {type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
});
export const otpModel = mongoose.model('Otps', otpSchema);



const mongodbURI = process.env.mongodbURI || "mongodb+srv://chat:chat@cluster0.oud3rz1.mongodb.net/chatapp?retryWrites=true&w=majority"

// "mongodb+srv://saad:sdsdsd@cluster0.9bemtsg.mongodb.net/ecommerce?retryWrites=true&w=majority";

// // saad 
// // "mongodb+srv://saad:sdsdsd@cluster0.9bemtsg.mongodb.net/ecommerce?retryWrites=true&w=majority";

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
 
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////