const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const { mongoose } = require('./db/mongoose');
const { Note } = require('./models/note');

let app = express();
let upload = multer();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', upload.fields([]), (req, res) => {
    let formData = req.body;
    
    let note = new Note({
        text: formData.text,
        user: formData.user
    })

    note.save().then((doc) => {
        res.send(doc);
    }), (e) => {
        res.status(400)
            .send(e);
    }
})

app.get('/', (req, res) => {
    Note.find().then((notes) => {
        res.send({
            notes
        })
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/:user', (req, res) => {
    let user = req.params.user;
    console.log(user);

    Note.find({
        user
    }).then((notes) => {
        if (!notes) {
            return res.status(404).send();
        }

        res.send({ notes })
    }, (e) => {
        res.status(404).send();
    })

})

app.listen(port, () => {
    console.log(`Started on port ${port}`);

})


module.exports = { app };