document.addEventListener('DOMContentLoaded', () => {
  // Get the current URL path
  const path = window.location.pathname;

  // Extract the houseId from the path
  const houseId = path.split('/')[2]; // Assuming the path is '/listings/{houseId}'

  console.log('Extracted houseId from URL:', houseId);

  if (houseId) {
      // Fetch listing details using the extracted houseId
      loadListingDetails(houseId);
  } else {
      console.error('No house ID found in the URL.');
  }
});

 async function loadListingDetails(id) {
  try {
      // Fetch the listing details from your API using the extracted houseId
      const response = await fetch(`/api/listings/${id}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const listing = await response.json();
      displayListingDetails(listing);
  } catch (error) {
      console.error('Error loading listing details:', error);
  }
}

function displayListingDetails(listing) {
  const detailsContainer = document.getElementById('listing-details');
  detailsContainer.innerHTML = `
      <h1>${listing.HouseName}</h1>
      <img src="${listing.imageUrls[0]}" alt="${listing.HouseName}" />
      <p>${listing.houseaddress}</p>
      <p>Price: £${listing.Price}</p>
      <p>Bedrooms: ${listing.bedroom}</p>
      <p>Bathrooms: ${listing.Bathroom}</p>
      <p>Square Feet: ${listing.squarefeet}</p>
      <p>Parking Spots: 2</p>
  `;
}

