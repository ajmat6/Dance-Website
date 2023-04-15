const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser'); //To store the data through the post request. It is used when you want to know more just than the url(But here you haven't used it).
const port = 82;
const app = express();
mongoose.connect("mongodb://127.0.0.1/DanceWebsite",{ 
    useNewUrlParser:true,useUnifiedTopology:true
});

//Defining Mongoose Schema:
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,                //Setting the schema to specify in which format the data will be stored in the database.
    address: String,
    skills: String,
    reason: String,
});

const contact = mongoose.model('contact', contactSchema);

//Express stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug Stuff
app.set('view-engine','pug');
app.set('views', path.join(__dirname, 'views'));

//Endpoints
app.get('/', (req,res) => {
    const params = { };
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req,res) => {
    const params = { };
    res.status(200).render('contact.pug', params);
});

//Database endpoint
app.post('/contact', (req,res) => {
    var DataCollected = new contact(req.body); //Jo data aaya uski body yaani ki info.

    DataCollected.save().then(() => {//save is returning a promise and in this way a promise is handeled.
        res.send("The information provided has been saved to the database");
        // res.send.alert("The information provided has been saved to the database");   It is giving error.
    }).catch(() => {
        res.status(400).send("Some error occured , Please try again after some time");
    });
    // res.status(200).render('contact.pug'); this will give error as you had already send a response above and you can't do it again.
});

//Listen Server
app.listen(port, () => {
    console.log("Bhai server chalu ho gaya he");
})