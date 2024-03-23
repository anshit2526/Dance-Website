// Tutorial75 --> tut76_Designing_Cards_using_Pug --> tut77_Continuing_Dance_Website_using_Pug --> tut78_Adding_Sponser_Section_using_Pug --> tut79_Adding_a_Contact_Form_using_Pug --> tut88_Saving_Data_into_Database

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const port = 8000;

// Code for mongoose
main().catch(err => console.log(err));

// connecting with the instance of mongod running on the local system (Connecting with the database).
async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}
// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

});


// Compiled schema into model.
const Contact = new mongoose.model('Contact', contactSchema);




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());


// PUG SEPCIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('This item has been saved to the database');
    }).catch(() => {
        res.status(400).alert("Item was not saved in the database");
    })
    // res.status(200).render('contact.pug');
});


// SERVER STARTS
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}/`);
});