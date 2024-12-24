const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('config.properties');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = properties.get('PORT') || 5000;  // take port from properties file

app.use(express.static(path.join(__dirname, '../FrontEnd')));
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = `mongodb://${properties.get('DB_HOST')}:${properties.get('DB_PORT')}/${properties.get('DB_NAME')}`;

mongoose.connect(MONGO_URI, {  // take from properties file
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Endpoint to handle login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await User.findOne({ email, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(404).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd', 'LearningApp.html'));  // Adjust the file path accordingly
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);    
});

module.exports = app;
// include unit test
// configure local host
// create readme 
