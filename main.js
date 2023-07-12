// let section = document.getElementById("cartas")
let cards = document.getElementById("cartas")
let datos = data.events
let cat = datos.map(category => category.category)
let newCat = new Set(cat)
let categorias = Array.from(newCat)
let checkbox = document.getElementById("buscador")
function createModel(evento) {
  return `<div class="card shadow p-3 bg-success-subtle" style="width: 15rem;">
    <img src="${evento.image}" class="card-img-top" alt="Image of: ${evento.name}">
    <div class="card-body">
        <h6 class="card-title h-50">${evento.name}</h6>
        <p class="card-text">${evento.description}</p>
        <div class="d-flex justify-content-between">
            <p class="card-text d-inline">$${evento.price}</p>
            <a href="./assets/pages/details.html" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>`
}
function printModel(events, ubicacion) {
  let card = ''
  if (events.length == 0) {
    card += `<p class="display-1">No coincidences</P>`
    ubicacion.innerHTML = cards
    return false
  } else {
    ubicacion.innerHTML = ''
    for (let evento of events) {
      ubicacion.innerHTML += createModel(evento)
    }
  }
}
printModel(datos, cards)

// InputSearch
let searchInput = document.getElementById("inputSearch")
searchInput.addEventListener('input', () => {
  const value = showValue(searchInput)
  let nombre = datos.filter(dato => dato.name.toLowerCase().startsWith(value))
  return nombre
})
function showValue(input) {
  let valorInputSearch = input.value
  return valorInputSearch
}










//CheckBoxes


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


checkbox.addEventListener('change', () => {
  cards.innerHTML = ""
  let boxCheck = document.querySelectorAll("input[type='checkbox']:checked")
  let arrayCheck = []
  boxCheck.forEach((values) => arrayCheck.push(values.value))
  let catFilter = datos.filter(event => arrayCheck.includes(event.category) || arrayCheck.length == 0)
  printModel(catFilter, cards)
})




