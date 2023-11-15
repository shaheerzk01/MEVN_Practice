const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

const corsOptions = {
    origin: "*", // Allow requests from any origin (for development purposes)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/formData', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

app.use(bodyParser.json());

const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    skills: [String],
    contactMethod: String,
    phoneNumber: String,
});

const FormData = mongoose.model('FormData', formDataSchema);


app.post("/api/submitForm", async (req, res)=>{
    try {
        const formdata = new FormData(req.body);
        await formdata.save();
        res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error:', error); // Log the error
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get("/api/getInfo", async (req, res)=>{
    try{
        const info = await FormData.find()
        res.json(info);
    }catch(error){
        console.error('Error fetching User:', error);
        res.status(500).send(error.message);
    }
})

app.delete("/api/deleteUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        await FormData.findByIdAndDelete(userId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting User:', error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

