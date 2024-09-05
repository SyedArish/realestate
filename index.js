import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebaseApp } from './firebase.js';
import { firestoredb } from './firebase.js';
import { collection, getDoc,addDoc,setDoc,doc } from 'firebase/firestore';
import { addDocument } from './public/src/dbadd.js';
import { getAllListings } from './public/src/dbretrive.js';
import path from 'path';
import { getAllMessage } from './public/src/dbmesage.js';
dotenv.config();
initializeFirebaseApp();

const dirname_ = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static(path.join(dirname_, 'public')));
app.use(express.static(path.join(dirname_, 'src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });


// all page get request
app.get('/', (req, res) => {
  res.sendFile(dirname_ + "/public/home.html");
});



// add Listing get and post
     app.get('/add-listing', (req, res) => {
  res.sendFile(dirname_ + "/public/Admin-dash/add-listing.html");
     });
     app.post('/add-listing', upload.array('images', 10), async (req, res) => {
  console.log(req.files);  // Check if files are being uploaded
 
  try {
      const { HouseName, houseaddress, bedroom, Bathroom, squarefeet, houseid, aboutHouse, Feature1, Feature2, Feature3, Feature4, propertieinfo1, propertieinfo2, propertieinfo3, propertieinfo4,youtubeurl, Price } = req.body;

      const imageUrls = [];

      // Upload each image to Firebase Storage
      for (let file of req.files) {
          const storageRef = ref(storage, `images/${houseid}/${file.originalname}`);
          const snapshot = await uploadBytes(storageRef, file.buffer);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadURL);
      }

      const staticData = {
          HouseName, 
          houseaddress, 
          bedroom,
          Bathroom,
          squarefeet,
          houseid,
          aboutHouse,
          Feature1,
          Feature2,
          Feature3,
          Feature4,
          propertieinfo1,
          propertieinfo2,
          propertieinfo3,
          propertieinfo4,
          Price,
          youtubeurl, // Ensure price is stored as a number
          imageUrls,
          createdAt: new Date()
      };

      await addDocument('Listing', houseid, staticData);

      // Send response only once
      res.status(200).send('Listing added successfully');
  } catch (error) {
      console.error('Error adding listing:', error);

      // If there's an error, send only one response
      res.status(500).send('Error adding listing');
  }
     });

//  get message and post message and message api
      app.get('/contact-us',(req,res)=>{
        res.sendFile(dirname_+"/public/messages.html");
      })
      app.get('/Messages', (req, res) => {
        res.sendFile(dirname_+"/public/Admin-dash/messages.html");
      })
      app.post('/Messages', (req, res) => {
         try {
      const { HouseName, houseaddress, bedroom, Bathroom, squarefeet, houseid, aboutHouse, Feature1, Feature2, Feature3, Feature4, propertieinfo1, propertieinfo2, propertieinfo3, propertieinfo4,youtubeurl, Price } = req.body;

      const imageUrls = [];

    
      const staticData = {
          HouseName, 
          houseaddress, 
          bedroom,
          Bathroom,
          squarefeet,
          houseid,
          aboutHouse,
          Feature1,
          Feature2,
          Feature3,
          Feature4,
          propertieinfo1,
          propertieinfo2,
          propertieinfo3,
          propertieinfo4,
          Price,
          youtubeurl, // Ensure price is stored as a number
          imageUrls,
          createdAt: new Date()
      };

      // await addDocument('Listing', houseid, staticData);

      // Send response only once
      res.status(200).send('Listing added successfully');
  } catch (error) {
      console.error('Error adding listing:', error);

      // If there's an error, send only one response
      res.status(500).send('Error adding listing');
  }
     }); 
      app.get('/api/message', async (req, res) => {
        try {
          const message = await getAllMessage();
          res.json(message);
        } catch (error) {
          console.error('Error fetching listings:', error);
          res.status(500).send('Error fetching listings');
        }
      }); 
      

// Delet Listing get Post and api 
      app.get('/Delete-Listing', (req, res) => {
        res.sendFile(dirname_+"/public/Admin-dash/delet-listing.html");
      })


// All Listing get and Api
      app.get('/all-Listing', (req, res) => {
        res.sendFile(dirname_+"/public/listing.html");
      })
      app.get('/api/listings', async (req, res) => {
        try {
          const listings = await getAllListings();
          res.json(listings);
        } catch (error) {
          console.error('Error fetching listings:', error);
          res.status(500).send('Error fetching listings');
        }
      }); 
    


// Listing Detail and its api 
      app.get('/listings/:id', (req, res) => {

        res.sendFile(path.join(dirname_, '/public/listing2.html'));
      });
      app.get('/api/listings/:id', async (req, res) => {
        try {
          const listings = await getAllListings(); // Fetch all listings
          const listing = listings.find(item => item.id === req.params.id); // Find the listing with the matching ID
        
          if (!listing) {
            return res.status(404).send('Listing not found');
          }
      
          res.json(listing);
        } catch (error) {
          console.error('Error fetching listing:', error);
          res.status(500).send('Error fetching listing');
        }
      });
  



// Serve the listing page
      app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
      });

      // exports.app = functions.https.onRequest(app); y
      