import { createModel2, printCheckBox, showValue, crossFilter } from "./modules/functions.js";

const cards = document.getElementById("cartas")
const checkbox = document.getElementById("idCheck")
const searchInput = document.getElementById("inputSearch")
let current;
let datosEventos;
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(respuesta => respuesta.json())
    .then(data => {
        current = data.currentDate
        datosEventos = data.events.filter(evento => evento.date > current)
        console.log(datosEventos);
        let cat = datosEventos.map(evento => evento.category)
        let newCategories = Array.from(new Set(cat))
        createModel2(datosEventos)
        printModel(datosEventos, cards)
        printCheckBox(newCategories, checkbox)
    })
    .catch(error => console.error(error.message))

function printModel(events, ubi) {
    let card = ''
    if (events.length == 0) {
        card = `<p class="display-1">Name event not found</p>`
        ubi.innerHTML = card
        return;
    }
    for (let evento of events) {
        ubi.innerHTML += createModel2(evento)
    }
}


//Listeners


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




