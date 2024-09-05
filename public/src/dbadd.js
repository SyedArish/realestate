import { collection, getDocs,addDoc,setDoc,doc } from 'firebase/firestore';
import { firestoredb } from '../../firebase.js';
import firebase from 'firebase/compat/app';

//uploading the data in firestore
const addDocument = async (collectionName,documentid, data) => {
  try {

 const currentdata=doc(firestoredb,collectionName,documentid);
 let datoupload = setDoc(currentdata,data);
 console.log('Data to be added:', datoupload); // Debug log


 
    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};

export async function getAllListings() {
  try {
    const snapshot = await getDocs(collection(firestoredb, 'Listing'));
    const listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return listings;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

export { addDocument };
