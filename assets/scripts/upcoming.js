let cards = document.getElementById("cartas")
let current = data.currentDate
let datos = data.events.filter(evento => evento.date > current)
let cat = datos.map(category => category.category)
let newCat = new Set(cat)
let categorias = Array.from(newCat)
let checkbox = document.getElementById("buscador")
let searchInput = document.getElementById("inputSearch")
function createModel(evento) {
    return `<div class="card shadow p-3 bg-success-subtle" style="width: 15rem;">
    <img src="${evento.image}" class="card-img-top" alt="Image of: ${evento.name}">
    <div class="card-body">
        <h6 class="card-title h-50">${evento.name}</h6>
        <p class="card-text">${evento.description}</p>
        <div class="d-flex justify-content-between">
            <p class="card-text d-inline">$${evento.price}</p>
            <a href="../pages/details.html?ID=${evento._id}" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>`
}

function printModel(events, ubicacion) {
    let carta = ''
    if (events.length == 0) {
        carta = `<p class="display-1">Name event not found</p>`
        ubicacion.innerHTML = carta
        return;
    }
    for (let evento of events) {
        ubicacion.innerHTML += createModel(evento)
    }
}

function createCheck(check) {
    return `<div class="form-check">
    <input class="form-check-input" type="checkbox" value="${check}" id="${check}">
    <label class="form-check-label" for="${check}">
        ${check}
    </label>
    </div>`
}

function printCheckBox(cat, cont) {
    for (const elemento of cat) {
        cont.innerHTML += createCheck(elemento)
    }
}
printCheckBox(categorias, checkbox)



function filterEvents(dataCurrent) {
    let filteredEvents = []

    for (let evento of datos) {
        if (evento.date > dataCurrent) {
            filteredEvents.push(evento)
        }
    }
    return filteredEvents
}
let filteredEvents = filterEvents(current)
printModel(filteredEvents, cards)







//Filter
function showValue(input) {
    let valorInputSearch = input.value
    return valorInputSearch
}

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
        crossFilter = crossFilter.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return crossFilter
}




//LISTENERS

checkbox.addEventListener('change', () => {
    cards.innerHTML = ""
    let filtroCheck = checkFilter()
    let values = showValue(searchInput)
    let catFilter = crossFilter(filtroCheck, values)
    printModel(catFilter, cards)
})

searchInput.addEventListener('input', () => {
    cards.innerHTML = ""
    let filtroCheck = checkFilter()
    let values = showValue(searchInput)
    filterSearch = crossFilter(filtroCheck, values)
    printModel(filterSearch, cards)
})










