
document.getElementById("search-button").addEventListener("click", searchPokemon); //triggers the searchPokemon function when search button is clicked
//everything that happens after the button is clicked will start below 
async function searchPokemon() {
  const input = document.getElementById("pokemon-input").value.trim().toLowerCase(); /*removes whitespaces, input is automatically changed to lowercase to match API data
  .value is used to get the text thats in the input area! w/o it you wont be able to access the user input and search it in the POkemon API*/
  const container = document.getElementById("pokemon-container"); // where the pokemon data will be displayed
  const heading = document.getElementById("hidden-heading");

  heading.classList.remove("fade-in"); // hide the heading for now


  if (!input) {
    container.innerHTML = "<p class='error'>Please enter a Pokémon name or ID.</p>"; //error message pops up red in the conatiner if input data is not valid,
    heading.style.display = "none";  // Gotta catch them all phrase does not show if there is an error
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`); //fetching pokemon data from API using the input data
    if (!response.ok) {
      throw new Error("Pokémon not found");// if pokemon is not found returns error message
    }
    const data = await response.json(); //data translated to json format IF SUCCESSFUL 

    const name = data.name;
    const image = data.sprites.front_default; 
    const types = data.types.map(t => t.type.name).join(', ');

    container.innerHTML = `
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>  
      <img src="${image}" alt="${name}" />
      <p>Type: ${types}</p>
    `; //Name, first letter is Capitalized + the rest of the letters in the name 

      // Show the heading with a fade-in effect
      heading.classList.remove("hidden");   // make it visible
      setTimeout(() => {
        heading.classList.add("fade-in");   // apply the fade-in effect
      }, 50); // small delay to trigger transition
  
  } catch (error) {
    container.innerHTML = `<p class="error">${error.message}</p>`; // error handling is anything goes wrong with loading
    heading.style.display = "none"; // hide the phrase on error

  }
}
