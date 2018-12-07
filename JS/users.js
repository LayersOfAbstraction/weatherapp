console.log('User loading!');
// Create user Object
function User() {}

// ASYNC FETCHING USERS
/// FROM LOCAL JSON FILE 
/// FROM WEB API
User.prototype.fetchUsers = async(dataUrl, callBack) => {
    try {
        const results = await fetch(dataUrl);
        const users = await results.json();
        const createUsers = await callBack(users);
    } catch (err) {
        console.log("There was an Error: " + err.message);
    }
}

User.prototype.createUser = (data) => {
    const usersCard = document.getElementById('users');
    // FOREACH
    data.forEach((person, index) => {
        let card =
            `<div class="col-md-4 col-sm-6  pt-2">
                <div class="card">
                    <img class="card-img-top" src="${person.image}" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">${person.firstName} ${person.lastName}</h5>
                    <p class="card-text">${person.bio}.</p>
                    <p class="text-info"><small>State: ${person.state}</small></p>   
                    </div>
                </div>
            </div>`;


        usersCard.innerHTML += card;
    });
}

// Gallery of Users
User.prototype.createGallery = (users) => {
    const userGallery = document.getElementById('gallery');

    users.forEach((user, index) => {
        if (index < 24) {
            let galleryCard =
                `<div class="card" style="width: 11rem;">
                    <img class="card-img-top" src="${user.thumbnailUrl}" alt="Card image cap">
                    <div class="card-body">
                    <h6 class="card-title h6">Album: ${user.albumId}</h6>          
                    <p class="card-text">${user.title}.</p>
                    <a href="${user.url}" class="btn btn-link">View</a>
                    </div>
                </div>`;
            userGallery.innerHTML += galleryCard;
        }
    });

}