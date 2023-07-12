let cards = document.getElementById("cartas")
let datos = data.events
let current = data.currentDate
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
            <a href="../pages/details.html" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>`
}
function printModel(events) {
    for (let evento of events) {
        cards.innerHTML += createModel(evento)
    }
}

function filterEvents(events, dataCurrent) {
    let filteredEvents = []

    for (let evento of datos) {
        if (evento.date > dataCurrent) {
            filteredEvents.push(evento)
        }
    }
    return filteredEvents
}
let filteredEvents = filterEvents(data.events, current)
printModel(filteredEvents)











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
console.log(checkbox)


checkbox.addEventListener('change', () => {
    cards.innerHTML = ""
    let boxCheck = document.querySelectorAll("input[type='checkbox']:checked")
    let arrayCheck = []
    boxCheck.forEach((values) => arrayCheck.push(values.value))
    let catFilter = datos.filter(event => arrayCheck.includes(event.category) || arrayCheck.length == 0)
    printModel(catFilter, cards)
})

// InputSearch
let containerSearch = document.getElementById("contenedorSearch")
let searchInput = document.getElementById("buscador2")
searchInput.addEventListener('input', () => {
    const value = showValue(searchInput)
    let nombre = datos.filter(dato => dato.name.toLowerCase().startsWith(value))
    return nombre
})
function showValue(input) {
    let valorInputSearch = input.value
    return valorInputSearch
}