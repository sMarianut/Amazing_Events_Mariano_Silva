let datos = data.events
const parameter = location.search
let containerDetail = document.getElementById("detailCon")
let parameters = new URLSearchParams(parameter)
let id = parameters.get('ID')
let finder = datos.find(dato => dato._id === id)


function createDetailCard(cartaDetail, detalles) {
    cartaDetail.innerHTML += `<div class="row g-0">
    <div class="col-md-4">
        <img src="${detalles.image}" class="img-fluid h-100 w-100 rounded-start bg-success-subtle"
            alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${detalles.name}</h5>
            <p class="card-text">${detalles.description}</p>
            <p class="card-text"><small class="text-body-secondary">Place: ${detalles.place}</small>
            </p>
            <p class="card-text"><small class="text-body-secondary">Category: ${detalles.category}</small>
            </p>
            <p class="card-text"><small class="text-body-secondary">Price: $${detalles.price}</small>
            </p>
        </div>
    </div>
</div>`
}
createDetailCard(containerDetail, finder)

