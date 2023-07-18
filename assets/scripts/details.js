import { createDetailCard } from "./modules/functions.js";
let datosEventos;
let containerDetail = document.getElementById("detailCon")
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(respuesta => respuesta.json())
    .then(data => {
        datosEventos = data.events
        const parameter = location.search
        let parameters = new URLSearchParams(parameter)
        let id = parameters.get('ID')
        let finder = datosEventos.find(dato => dato._id == id)
        createDetailCard(containerDetail, finder)
    })
    .catch(error => console.error(error.message))









