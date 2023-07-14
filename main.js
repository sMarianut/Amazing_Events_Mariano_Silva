
let cards = document.getElementById("cartas")
let datos = data.events
let cat = datos.map(category => category.category)
let newCat = new Set(cat)
let categorias = Array.from(newCat)
let checkbox = document.getElementById("buscador")
let searchInput = document.getElementById("inputSearch")

function createModel(evento) {
  return `<div class="card shadow p-3 bg-info-subtle" style="width: 15rem; height: 25rem">
    <img src="${evento.image}" class="card-img-top" alt="Image of: ${evento.name}">
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

function printModel(events) {
  let card = ''
  if (events.length == 0) {
    card = `<p class="display-1">Name event not found</p>`
    cards.innerHTML = card
    return;
  }
  for (let evento of events) {
    cards.innerHTML += createModel(evento)
  }
}
printModel(datos)

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
printCheckBox(categorias, checkbox)

function showValue(input) {
  let valorInputSearch = input.value
  return valorInputSearch
}

//FILTROS


function SearchFilter(eventos, input) {
  let filterSearch = eventos.filter(evento => evento.name.toLowerCase().includes(input.toLowerCase()))
  return filterSearch
}

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



