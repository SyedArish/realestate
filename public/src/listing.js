
// import { loadListingDetails } from "./detail-listing.js";

export async function loadListings() {
    try {
        console.log('loadListings function called');
        const response = await fetch('/api/listings');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const listings = await response.json();
        const listingsContainer = document.getElementById('property-listingsz');

        listings.forEach(listing => {
            const imageUrl = listing.imageUrls && listing.imageUrls.length > 0 ? listing.imageUrls[0] : 'default-image-url.jpg';
            const propertyItem = document.createElement('div');
            propertyItem.className = 'property-item w-dyn-item';
            propertyItem.innerHTML = `
              <a href="/listings/${listing.houseid}" class="property-card w-inline-block" data-id="${listing.id}">
                     <div class="property-card-image-wrap">
                        <img src="${imageUrl}" alt="${listing.HouseName}" class="property-card-image smaller"/>
                        <div class="property-tag">
                            <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/66560ac27cbe3cd38c96b942_Dollar%20circle.svg" alt="" class="property-tag-icon"/>
                            <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/66575ddb4c26ab7a4a72b3ca_Home%20(5).svg" alt="" class="property-tag-icon w-condition-invisible"/>
                            <div class="text-color-brand">For Sale</div>
                        </div>
                    </div>
                    <div class="property-content">
                        <div>
                            <h2 class="property-card-name smaller">${listing.HouseName}</h2>
                            <div class="spacer-xsmall"></div>
                            <div class="spacer-xxsmall"></div>
                            <div class="property-location smaller">
                                <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/6655fb38fe96d25c5f431916_map-pin-filled%20(1).svg" alt="Location" class="property-location-icon"/>
                                <div>${listing.houseaddress}</div>
                            </div>
                            <div class="spacer-small"></div>
                            <div class="spacer-xsmall"></div>
                        </div>
                        <div class="property-meta">
                            <div>
                                <div class="property-price">£${listing.Price}</div>
                            </div>
                            <div class="border"></div>
                            <div class="property-meta-wrap">
                                <div class="property-meta-card">
                                    <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/6655fc836d1b8b069f6f1758_Double%20bed%203.svg" alt="Bedrooms" class="property-meta-icon"/>
                                    <div>${listing.bedroom}</div>
                                </div>
                                <div class="property-meta-card">
                                    <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/6655fc839372245491397eb5_Shower.svg" alt="Shower" class="property-meta-icon"/>
                                    <div>${listing.Bathroom}</div>
                                </div>
                                <div class="property-meta-card">
                                    <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/6655fc83b7af1a550027e5c9_expand%20Resize.svg" alt="Square Feet" class="property-meta-icon"/>
                                    <div class="property-sq-ft-area">
                                        <div>${listing.squarefeet}</div>
                                        <div>sq ft</div>
                                    </div>
                                </div>
                                <div class="property-meta-card">
                                    <img src="https://cdn.prod.website-files.com/66535ae1be2305926e53d855/6655fc87d1121efb59ab9f53_Car.svg" alt="Parking Spots" class="property-meta-icon"/>
                                    <div>2</div> <!-- Assuming you have parking info; adjust accordingly -->
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            listingsContainer.appendChild(propertyItem);

            document.addEventListener('DOMContentLoaded', () => {
                const propertyItems = document.querySelectorAll('.property-card');
            
                propertyItems.forEach(item => {
                    item.addEventListener('click', (event) => {
                        event.preventDefault();
                        const houseId = item.getAttribute('href').split('/')[2]; // Extract houseid from href
                        console.log('Extracted houseId from href:', houseId);  // Debugging: Check the extracted houseId
            
                        if (houseId) {
                            // loadListingDetails(houseId);
                            window.location.href = `/listings/${houseId}`;
                        } else {
                            console.error('No house ID found.');
                        }
                    });
                });
            });
            
              
                     
        });
    } catch (error) {
        console.error('Error loading listings:', error);
    }
}
loadListings();