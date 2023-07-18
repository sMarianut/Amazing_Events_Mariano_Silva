
let date;
let datosEvents;
let table1 = document.getElementById("tMayor")
let table2 = document.getElementById("tMenor")
let table3 = document.getElementById("masCapacidad")
let tablaDeCatP = document.getElementById("tableCatP")
let tablaDeCatU = document.getElementById("tableCatU")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        datosEvents = data.events
        date = data.currentDate

        let eventosFuturos = datosEvents.filter(evento => evento.date > date)
        let eventosPasados = datosEvents.filter(evento => evento.date < date)
        const arrayOrdenado = Array.from(eventosPasados).sort(function (a, b) {
            return b.capacity - a.capacity
        })

        let catUpcoming = eventosFuturos.map(eventoUpcoming => eventoUpcoming.category)
        arrayCatUp = Array.from(new Set(catUpcoming))
        console.log(arrayCatUp);
        let catPast = eventosPasados.map(eventoPast => eventoPast.category)
        arrayCatPast = Array.from(new Set(catPast))
        console.log(arrayCatPast);
        let mayorCapacidad = arrayOrdenado[0].capacity
        let mayorCapacidadNombre = arrayOrdenado[0].name


        eventosPasados.sort((a, b) => masPorcentaje(a.assistance, a.capacity) - masPorcentaje(b.assistance, b.capacity))
        let eventoMenor = eventosPasados[0];
        let eventoMayor = eventosPasados[eventosPasados.length - 1];
        let porcentajeMayor = masPorcentaje(eventoMayor.assistance, eventoMayor.capacity)
        let porcentajeMenor = masPorcentaje(eventoMenor.assistance, eventoMenor.capacity)
        tabla1(eventoMayor, table1, porcentajeMayor.toFixed(2))
        tabla1(eventoMenor, table2, porcentajeMenor.toFixed(2))
        tabla2(mayorCapacidadNombre, table3, mayorCapacidad.toLocaleString())

        //PAST 
        let objEventPast = arrayCatPast.map((categoria) => {
            let aux = {
                category: categoria
            }
            let catEvents = eventosPasados.filter(evento => evento.category == categoria)
            console.log(catEvents);
            const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.assistance), 0)
            // console.log(revenue);
            aux.revenue = revenue
            let porcAssist = catEvents.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / catEvents.length
            aux.porcAssist = porcAssist
            return aux
        })
        //UPCOMING
        let objEventUp = arrayCatUp.map((categoria) => {
            let aux = {
                category: categoria
            }
            let catEvents = eventosFuturos.filter(evento => evento.category == categoria)
            console.log(catEvents);
            const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.estimate), 0)
            aux.revenue = revenue
            let porcEstimate = catEvents.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / catEvents.length
            aux.porcEstimate = porcEstimate
            return aux

        })
        tablaDeCatP.innerHTML = tableCatP(objEventPast)
        tablaDeCatU.innerHTML = tableCatU(objEventUp)


    }
    )
    .catch(error => console.log(error))

function masPorcentaje(assistance, capacidad) {
    let porcentaje = (assistance / capacidad) * 100
    return porcentaje
}

function tabla1(event, htmlCont, porcentajeMayor) {
    htmlCont.innerHTML = `🚩<td>${event.name} ${porcentajeMayor}%</td>`
}
function tabla2(event, htmlCont, capacidad) {
    htmlCont.innerHTML = `🚩<td>${event} ${capacidad}</td>`
}


function tableCatP(objeto) {

    let tabla = `<tr><th colspan="3">Past Events statics by categories</th></tr><tr><th>Categories</th><th>Revenue</th><th>Porcentaje of assistance</th></tr>`
    for (let prop of objeto) {
        let fila = `<tr> <td>`
        fila += prop.category
        fila += `</td>`
        fila += `<td>`
        fila += "💵$" + prop.revenue.toLocaleString()
        fila += `</td>`
        fila += `<td>`
        fila += "🚩" + prop.porcAssist.toFixed(2) + "%"
        fila += `</td>`

        fila += `</tr>`
        tabla += fila
    }
    return tabla
}
function tableCatU(objeto) {

    let tabla = `<tr><th colspan="3">Upcoming Events statics by categories</th></tr><tr><th>Categories</th><th>Revenue</th><th>Estimate Of Assistance</th></tr>`
    for (let prop of objeto) {
        let fila = `<tr> <td>`
        fila += prop.category
        fila += `</td>`
        fila += `<td>`
        fila += "💵$" + prop.revenue.toLocaleString()
        fila += `</td>`
        fila += `<td>`
        fila += "🚩" + prop.porcEstimate.toFixed(2) + "%"
        fila += `</td>`

        fila += `</tr>`
        tabla += fila
    }
    return tabla
}


