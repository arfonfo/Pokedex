 const listaPokemon = document.querySelector('#listaPokemon');
 const botonesHeader = document.querySelectorAll('.btn-header');
 let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 0; i <= 151; i++) {
  fetch(URL +i)
    // la respuesta obtenida la almacenamos en un archivo json
    .then((response) => response.json())
    // los datos obtenidos los pasamos al método mostrarPokemon 
    .then((data) => mostrarPokemon(data))
}


function mostrarPokemon(poke) {

  // De esta manera, en la variable tipos tenemos solo los nombres de los tipos de cada pokémon
  let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
  // Con el método join unimos los elementos de un array en un String
  tipos = tipos.join('');

  // Rellenar los huecos de los números con 0's hasta 3 cifras
  let pokeId = poke.id.toString();
  if(pokeId.length === 1){
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `<p class="pokemon-id-back">#${pokeId}</p>
  <div class="pokemon-imagen">
    <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
  </div>
  <div class="pokemon-info">
    <div class="nombre-contenedor">
      <p class="pokemon-id">#${pokeId} </p>
      <h2 class="pokemon-nombre">${poke.name}</h2>
    </div>
    <div class="pokemon-tipos">
      ${tipos}
    </div>
    <div class="pokemon-stats">
      <p class="stat">${(poke.height/10).toFixed(1)}m</p>
      <p class="stat">${(poke.weight*0.45).toFixed(2)}kg</p>
    </div>
  </div>`;

  listaPokemon.append(div);
}

// Se llama a event como parámetro de la función flecha cuando traemos alguna información al hacer click en el botón
botonesHeader.forEach(boton => boton.addEventListener('click', (event) =>{
  const botonId = event.currentTarget.id;

  listaPokemon.innerHTML = "";

  for (let i = 0; i <= 151; i++) {
    fetch(URL +i)
      .then((response) => response.json())
      .then((data) => {
        if(botonId === "ver-todos") {
          mostrarPokemon(data);
        } else {
          const tipos = data.types.map(type => type.type.name);
          if(tipos.some(tipo => tipo.includes(botonId))) {
            mostrarPokemon(data);
          }
        }
        
      })
  }
}))
