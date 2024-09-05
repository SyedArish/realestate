import { collection, doc, getDocs } from 'firebase/firestore';
import { firestoredb } from '../../firebase.js';

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