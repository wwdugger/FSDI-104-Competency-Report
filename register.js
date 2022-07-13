var salon = {
    name: "The Fashion Pet",
    address: {
        street: "11111 C ST",
        city: "San Diego",
        state: "CA",
    },
    hours: {
        open: "9:00 AM",
        close: "6:00 PM"
    },
    nextPetId: 7,
    pets: [],
    prices: {
        wash: 50,
        groom: 75,
        nails: 25,
        obedience: 200,
        teethCleaning: 30,
        walking: 15,
        fullService: 350,
    }
}

var { name, address: { street, city, state, zip }, hours: { open, close }, nextPetId, pets, prices: { wash, groom, fullService } } = salon;

function createPets() {
    var scooby = new Pet(1, "Scooby", 50, "Male", "Dog", "Dane", "Full Service", "Shaggy", "555-555-5555", "000@email.com", 350);
    pets.push(scooby);

    var scrappy = new Pet(2, "Scrappy", 30, "Male", "Dog", "Mix", "Wash", "Shaggy", "555-555-5556", "wes@email.com", 50);
    pets.push(scrappy);

    var speedy = new Pet(3, "Speedy", 70, "Male", "Cat", "Persian", "Groom", "Wes", "555-555-5557", "bb@email.com", 75);
    pets.push(speedy);

    var bella = new Pet(4, "Bella", 4, "Female", "Cat", "Persian", "Full Service", "Wes", "555-555-5558", "444@email.com", 350);
    pets.push(bella);

    var spike = new Pet(5, "Spike", 9, "Male", "Dog", "Husky", "Groom", "Cat", "555-555-5559", "333@email.com", 75);
    pets.push(spike);

    var Kobe = new Pet(6, "Kobe", 24, "Male", "Dog", "Doberman", "Obedience", "Wes", "555-555-5555", "111@gmail.com", 200);
    pets.push(Kobe);
}

class Pet {
    constructor(petId, name, age, gender, anType, breed, service, owner, phone, email, price) {
        this.petId = petId;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.anType = anType;
        this.breed = breed;
        this.service = service;
        this.owner = owner;
        this.phone = phone;
        this.email = email;
        this.price = price;
    }
}

function register() {
    var petId = nextPetId;
    var inputName = document.getElementById("petName").value;
    var inputAge = document.getElementById("petAge").value;
    var inputGender = document.getElementById("petGender").value;
    var inputType = document.getElementById("petType").value;
    var inputBreed = document.getElementById("petBreed").value;
    var inputService = document.getElementById("petService").value;
    var inputOwner = document.getElementById("petOwner").value;
    var inputPhone = document.getElementById("petPhone").value;
    var inputEmail = document.getElementById("petEmail").value;

    var price;
    if (inputService === "Wash") {
        price = salon.prices.wash;
    } else if (inputService === "Groom") {
        price = salon.prices.groom;
    } else if (inputService === "Full Service") {
        price = salon.prices.fullService;
    }

    var newPet = new Pet(petId, inputName, inputAge, inputGender, inputType, inputBreed, inputService, inputOwner, inputPhone, inputEmail, price);

    pets.push(newPet);
    nextPetId ++;

    $(".form-control").val("");
    $(".form-select").val("");

    totalNumPets();
    
    
    totalPrice();
    petsByType();
    displayPets();
}


function totalNumPets() {
    var totalNumPets = pets.length;
    document.getElementById("number-pets").innerHTML = `
    <p>
        Total Pets Registered: <b>${totalNumPets}</b>
    </p>`;
}

function totalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < pets.length; i++) {
        totalPrice += pets[i].price;
    }

    document.getElementById("total-price").innerHTML = `
    <p>
    Total Cost: <b>$${totalPrice}.00
    </p>`;
}

function petsByType() {
    let dogs = 0, cats = 0;

    for (var i = 0; i < pets.length; i ++) {
        switch(pets[i].anType) {
            case "Dog" :
                dogs ++;
                break;
            case "Cat" :
                cats ++;
                break;
            
        }
    }

    document.getElementById("dog-count").innerHTML=`<b>${dogs}</b>`;
    document.getElementById("cat-count").innerHTML=`<b>${cats}</b>`;
}

function searchPet() {
    var searchText = document.getElementById("search-text").value

    document.getElementById("pets").innerHTML="";

    for (var i = 0; i < pets.length; i ++) {
        var pet = pets[i];

        if (
            pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
            pet.owner.toLowerCase().includes(searchText.toLowerCase()) ||
            pet.phone.includes(searchText)
        
        ) {
            displayPet(pet);
        }
    }
}

function searchByType(anType) {
    document.getElementById("pets").innerHTML="";

    for (var i = 0; i < pets.length; i ++) {
        var pet = pets[i];

        if (pet.anType === anType) {
            displayPet(pet);
        }
    }
}

function displayPet(pet) {
        var icon = '';
        if (pet.anType === "Dog") {
            icon = "🐕";
        }
        if (pet.anType === "Cat") {
            icon = '🐈';
        }
        var card = `
            <div id="" class="card shadow m-3" style="width: 15rem;">
                <div class-"card-body">
                    <h5 class="card-title text-center py-3">
                        ${pet.name}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Service:</b> ${pet.service}</li>
                        <li class="list-group-item"><b>Price:</b> $${pet.price}.00</li>
                        <li class="list-group-item"><b>Owner:</b> ${pet.owner}</li>
                        <li class="list-group-item"><b>Phone:</b> ${pet.phone}</li>
                        <li class="list-group-item">${icon}</li>
                        <button class="my-2 mx-5 btn btn-sm btn-outline-danger" onclick="deletePet(${pet.petId})">Remove Pet</button>
                    </ul>
                    </div>
            </div>
        `

        var newCard = document.createElement("div");
        newCard.innerHTML = card;
        document.getElementById("pets").appendChild(newCard);
}

function displayPets() {
    document.getElementById("pets").innerHTML = "";
    document.getElementById("search-text").value="";

    for (var i = 0; i < pets.length; i++) {
        displayPet(pets[i]);
    }
}

function deletePet(petId) {
    for (var i = 0; i < pets.length; i ++) {
        var deletePet = pets[i];

        if (deletePet.petId === petId) {
            pets.splice(i, 1);
        }
    }

    displayPets();

    totalNumPets();
   
    totalPrice();
    petsByType();
}

function displayOfficeInfo() {
    document.getElementById('footer-info').innerHTML = `
        <p>
            Hours: <br>
            ${open} - ${close}, Monday to Friday <br>
            <br>
            Address: <br>
            ${street} <br>
            ${city} ${state}, ${zip}
        </p>`;
}

function init() {
    console.log("Document Ready");

    createPets();
    totalNumPets();
    totalPrice();
    petsByType();
    displayPets();
    displayOfficeInfo();
}

window.onload = init;