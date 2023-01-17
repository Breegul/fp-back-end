const herd = document.getElementById("herd");

async function callTheHerd() {

    // Request all the goats from the API
    const res = await fetch("http://localhost:3000/goats");

    // Extract the JSON data from the response
    const data = await res.json();

    // For each goat, create an HTML element and add to the herd container 
    data.forEach(g=>{
        birthGoats(g);
    })

}

function birthGoats(data) {
    console.log(data);
    const container = document.querySelector("#herd");
    
    const card = document.createElement("div");
    card.classList.add("goat");
    card.classList.add(data["age"]<5?"young":"old")

    const name = document.createElement("h2");
    name.textContent = data["name"];
    card.appendChild(name);

    const list = document.createElement("ul");
    for(x in data){
        if(x!="name"){
            const item = document.createElement("li");
            // console.log(x + ": " + data[x]);
            item.textContent = x + ": " + data[x];
            list.appendChild(item);
    }
    }
    card.appendChild(list);

    const marquee = document.createElement("marquee");
    marquee.textContent = "BAAAAAaaaaaaAAAAaaaaAAAAAaaAAAAaaaaAAAAAAAaaaaaaAAAaaa";
    card.appendChild(marquee);

    container.appendChild(card);

}

document.querySelector("form").addEventListener("submit", (e)=>{
    
    e.preventDefault(); // Stop the form interfering

    const goat = {
        name: e.target.name.value,
        age: e.target.age.value,
        sex: e.target.sex.value,
        favouriteColour: e.target.colour.value
    } // Get all the data

    // Make an options object for fetch
    const options = {
        method: "POST",
        body: JSON.stringify(goat),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    fetch("http://localhost:3000/goats", options) // Fetch with options
        .then(res => res.json()) // Extract the data
        .then(data => birthGoats(data)) // Make a goat card with the data
        .catch(err => {
            console.log(err);
            alert("Something went wrong!");
        }) // Alternatively panic
})

callTheHerd();