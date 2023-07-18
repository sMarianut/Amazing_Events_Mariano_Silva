
export function createModel2(evento) {
    return `<div class="card shadow p-3 bg-info-subtle" style="width: 15rem; height: 25rem">
          <img src="${evento.image}" class="card-img-top carta" style="height: 5rem" alt="Image of: ${evento.name}">
          <div class="card-body">
              <h6 class="card-title h-25">${evento.name}</h6>
              <p class="card-text">${evento.description}</p>
              <div class="d-flex justify-content-between">
                  <p class="card-text d-inline">$${evento.price}</p>
                  <a href="./details.html?ID=${evento._id}" class="btn btn-primary">Details</a>
              </div>
          </div>
      </div>`
}
export function createCheck(check) {
    return `<div class="form-check">
    <input class="form-check-input" type="checkbox" value="${check}" id="${check}">
    <label class="form-check-label" for="${check}">
        ${check}
    </label>`
}
export function printCheckBox(cat, cont) {
    for (const elemento of cat) {
        cont.innerHTML += createCheck(elemento)
    }
}
export function showValue(input) {
    let valorInputSearch = input.value.toLowerCase()
    return valorInputSearch
}

//FILTROS


export function SearchFilter(eventos, input) {
    let filterSearch = eventos.filter(evento => evento.name.toLowerCase().includes(input.toLowerCase()))
    return filterSearch
}
//Dependiendo de otros factores si quiero guardar algo en un array. Uso forEach
export function checkFilter(arrayCompleto, categoria) {
    if (categoria == 0) {
        return arrayCompleto
    }
    return arrayCompleto.filter(evento => categoria.includes(evento.category) || categoria.includes(""))
}

// let boxCheck = document.querySelectorAll("input[type='checkbox']:checked")
// let arrayCheck = []
// boxCheck.forEach((cat) => arrayCheck.push(cat.value))
// return arrayCheck

export function crossFilter(arrayCat, searchValue, categoria) {
    let filtroCheck = checkFilter(arrayCat, categoria)
    let search = SearchFilter(filtroCheck, searchValue)
    return search;
    if (arrayCat.length > 0) {
        arrayCat = arrayCat.filter(evento => arrayCat.includes(evento.category))
    }
    if (searchValue) {
        arrayCat = arrayCat.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
}
export function createDetailCard(cartaDetail, detalles) {
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