import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebaseApp } from './firebase.js';
import { firestoredb } from './firebase.js';
import { collection, getDoc, addDoc, setDoc, doc } from 'firebase/firestore';
import { addDocument } from './public/src/dbadd.js';
import { getAllListings } from './public/src/dbretrive.js';
import path from 'path';
import { getAllMessage } from './public/src/dbmesage.js';

initializeFirebaseApp();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;

// app.use(express.static(path.join(dirname_, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(dirname_, 'src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Add Listing - GET and POST
app.get('/add-listing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Admin-dash/add-listing.html'));
});

app.post('/add-listing', upload.array('images', 10), async (req, res) => {
  try {
    const {
      HouseName, houseaddress, bedroom, Bathroom, squarefeet, houseid, aboutHouse,
      Feature1, Feature2, Feature3, Feature4, propertieinfo1, propertieinfo2,
      propertieinfo3, propertieinfo4, youtubeurl, Price
    } = req.body;

    const imageUrls = [];

    // Upload each image to Firebase Storage
    for (let file of req.files) {
      const storageRef = ref(storage, `images/${houseid}/${file.originalname}`);
      const snapshot = await uploadBytes(storageRef, file.buffer);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageUrls.push(downloadURL);
    }

    const staticData = {
      HouseName, houseaddress, bedroom, Bathroom, squarefeet, houseid, aboutHouse,
      Feature1, Feature2, Feature3, Feature4, propertieinfo1, propertieinfo2,
      propertieinfo3, propertieinfo4, Price, youtubeurl, imageUrls,
      createdAt: new Date(),
    };

    await addDocument('Listing', houseid, staticData);

    res.status(200).send('Listing added successfully');
  } catch (error) {
    console.error('Error adding listing:', error);
    res.status(500).send('Error adding listing');
  }
});

// Contact and Messages
app.get('/contact-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/messages.html'));
});

app.get('/Messages', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Admin-dash/messages.html'));
});

app.post('/Messages', (req, res) => {
  try {
    // Message data extraction
    const {
      HouseName, houseaddress, bedroom, Bathroom, squarefeet, houseid, aboutHouse,
      Feature1, Feature2, Feature3, Feature4, propertieinfo1, propertieinfo2,
      propertieinfo3, propertieinfo4, youtubeurl, Price
    } = req.body;

    res.status(200).send('Message received successfully');
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send('Error processing message');
  }
});

app.get('/api/message', async (req, res) => {
  try {
    const message = await getAllMessage();
    res.json(message);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

// All Listings - GET and API
app.get('/all-Listing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/listing.html'));
});

app.get('/api/listings', async (req, res) => {
  try {
    const listings = await getAllListings();
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).send('Error fetching listings');
  }
});

// Listing Detail - GET and API
app.get('/listings/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/listing2.html'));
});

app.get('/api/listings/:id', async (req, res) => {
  try {
    const listings = await getAllListings();
    const listing = listings.find(item => item.id === req.params.id);

    if (!listing) {
      return res.status(404).send('Listing not found');
    }

    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).send('Error fetching listing');
  }
});

// Delete Listing
app.get('/Delete-Listing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Admin-dash/delet-listing.html'));
});

// For Vercel Deployment - Export the app
app.listen(port, () => console.log("Server ready on port 3000."));
export default app;
