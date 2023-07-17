
let datosEventos =
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(respuesta => respuesta.json())
    .then(data => {
      datosEventos = data.events
      console.log(datosEventos);
      let cat = datosEventos.map(evento => evento.category)
      console.log(cat);
      let newCategories = Array.from(new Set(cat))
      console.log(newCategories);
      printCheckBox(newCategories, checkbox)
    })
    .catch(error => console.error(error.message))

let cards = document.getElementById("cartas")
// //let datos = data.events
// let checkbox = document.getElementById("buscador")
// let searchInput = document.getElementById("inputSearch")

function createModel(evento) {
  return `<div class="card shadow p-3 bg-info-subtle" style="width: 15rem; height: 25rem">
    <img src="${evento.image}" class="card-img-top carta" style="height: 5rem" alt="Image of: ${evento.name}">
    <div class="card-body">
        <h6 class="card-title h-25">${evento.name}</h6>
        <p class="card-text">${evento.description}</p>
        <div class="d-flex justify-content-between">
            <p class="card-text d-inline">$${evento.price}</p>
            <a href="./assets/pages/details.html?ID=${evento._id}" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>`
}

function printModel(events, ubi) {
  let card = ''
  if (events.length == 0) {
    card = `<p class="display-1">Name event not found</p>`
    ubi.innerHTML = card
    return;
  }
  for (let evento of events) {
    ubi.innerHTML += createModel(evento)
  }
}


function createCheck(check) {
  return `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="${check}" id="${check}">
  <label class="form-check-label" for="${check}">
      ${check}
  </label>`
}
function printCheckBox(cat, cont) {
  for (const elemento of cat) {
    cont.innerHTML += createCheck(elemento)
  }
}


function showValue(input) {
  let valorInputSearch = input.value
  return valorInputSearch
}

//FILTROS


function SearchFilter(eventos, input) {
  let filterSearch = eventos.filter(evento => evento.name.toLowerCase().includes(input.toLowerCase()))
  return filterSearch
}
//Dependiendo de otros factores si quiero guardar algo en un array. Uso forEach
function checkFilter() {
  let boxCheck = document.querySelectorAll("input[type='checkbox']:checked")
  let arrayCheck = []
  boxCheck.forEach((values) => arrayCheck.push(values.value))
  return arrayCheck
}



function crossFilter(arrayCat, searchValue) {

  let crossFilter = datos;
  if (arrayCat.length > 0) {
    crossFilter = crossFilter.filter(evento => arrayCat.includes(evento.category))
  }
  if (searchValue) {
    crossFilter = crossFilter.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()));
  }
  return crossFilter;
}



//Listeners



checkbox.addEventListener('change', () => {
  cards.innerHTML = ""
  let filtroCheck = checkFilter()
  let values = showValue(searchInput)
  let catFilter = crossFilter(filtroCheck, values)
  printModel(catFilter)
})

searchInput.addEventListener('input', () => {
  cards.innerHTML = ""
  let filtroCheck = checkFilter()
  let values = showValue(searchInput)
  filterSearch = crossFilter(filtroCheck, values)
  printModel(filterSearch)
})



