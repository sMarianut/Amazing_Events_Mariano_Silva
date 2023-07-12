
let cards = document.getElementById("cartas")
let datos = data.events
let current = data.currentDate
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
// function filter(events) {
//     for(let evento of events){
//       cards.innerHTML += createModel(evento)
//     }
// }
function filterEvents(events, dataCurrent) {
    let filteredEvents = []

    for (let evento of datos) {
        if (evento.date < dataCurrent) {
            filteredEvents.push(evento)
        }
    }
    return filteredEvents
}
let filteredEvents = filterEvents(data.events, current)
printModel(filteredEvents)

