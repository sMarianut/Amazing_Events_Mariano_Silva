import { printCheckBox, showValue, crossFilter } from "./modules/functions.js"
const cards = document.getElementById("cartas")
const checkbox = document.getElementById("buscador")
const searchInput = document.getElementById("inputSearch")

let datosEventos =
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(respuesta => respuesta.json())
    .then(data => {
      datosEventos = data.events
      let cat = datosEventos.map(evento => evento.category)
      let newCategories = Array.from(new Set(cat))
      printModel(datosEventos, cards)
      printCheckBox(newCategories, checkbox)
      searchInput.addEventListener('input', () => {
        let boxCheck = document.querySelectorAll("input[type='checkbox']:checked")
        let arrayCheck = []
        let values = showValue(searchInput)
        boxCheck.forEach((values) => arrayCheck.push(values.value))
        cards.innerHTML = ""
        let filtroCruzado = crossFilter(datosEventos, values, arrayCheck)
        printModel(filtroCruzado, cards)
      })
      checkbox.addEventListener('change', () => {
        let boxCheck = document.querySelectorAll("input[type='checkbox']:checked")
        let arrayCheck = []
        let values = showValue(searchInput)
        boxCheck.forEach((values) => arrayCheck.push(values.value))
        cards.innerHTML = ""
        let filtroCruzado = crossFilter(datosEventos, values, arrayCheck)
        printModel(filtroCruzado, cards)
      })
    })
    .catch(error => console.error(error.message))

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














//Listeners









