const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required']
    },
   // fullName: {
   //     type: String,
   //     trim: true,
   // },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'A valid email address is required']
    },
    //password: {
       // type: String,
        //I set password as not required due to the OAuth. 
        // Ideally, the user could login using OAuth and then would be
        // prompted to set a password on the front end.
   // },
    tasksAssigned: [String]
});



module.exports = mongoose.model('users', userSchema);