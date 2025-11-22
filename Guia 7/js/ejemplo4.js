// ACCEDIENDO A LA REFERENCIA DE LOS BOTONES
const buttonPagina = document.getElementById("idAgregarPagina");
const buttonMenu = document.getElementById("idAgregarMenu");
const buttonTitulo = document.getElementById("idAgregarTitulo");
const buttonParrafo = document.getElementById("idAgregarParrafo");

// DEFINICION DE FUNCIONES
const agregarPagina = function () {
    // Verificando que no exista el contenedor de la pagina
    const contenedor = document.querySelector("#idDivPage");
    if (!contenedor) {
        const divPage = document.createElement("div");
        divPage.setAttribute("id", "idDivPage");
        divPage.setAttribute("class", "container");
        
        document.getElementById("idPagina").appendChild(divPage);
        alert("Se ha creado el contenedor de la página");
    } else {
        alert("Ya existe un contenedor de página");
    }
};

const agregarMenu = function () {
    // Verificando que existe el contenedor de la pagina
    const contenedor = document.querySelector("#idDivPage");
    if (contenedor) {
        // Verificando que no existe el menu
        const menu = document.querySelectorAll("#idDivPage > header");
        if (menu.length === 0) {
            // Clonando el menú de la página principal
            const headerOriginal = document.querySelector("header");
            const headerClonado = headerOriginal.cloneNode(true);
            
            // Limpiando el contenedor antes de agregar el menú
            contenedor.innerHTML = '';
            contenedor.appendChild(headerClonado);
            alert("Se ha agregado el menú a la página");
        } else {
            alert("Ya existe un menú en la página");
        }
    } else {
        alert("Primero debe agregar un contenedor de página");
    }
};

buttonPagina.onclick = function () {
    agregarPagina();
};

buttonMenu.onclick = function () {
    agregarMenu();
};

buttonTitulo.onclick = function () {
    // Verificando que existe el contenedor de la pagina
    const contenedor = document.querySelector("#idDivPage");
    // Verificando que existe el menu
    const menu = document.querySelectorAll("#idDivPage > header");
    if (contenedor) {
        if (menu.length > 0) {
            let titulo = prompt("Agregue el titulo de la pagina");
            if (titulo != "" && titulo != null) {
                const h1 = document.createElement("h1");
                // Agregando clases de Bootstrap
                h1.setAttribute("class", "display-5 text-center fw-bold py-4 my-4");
                h1.innerHTML = titulo;
                contenedor.appendChild(h1);
            } else {
                alert("No se ha registrado ningun titulo, por favor ingrese información");
            }
        } else {
            alert("Debe agregar un menu primero");
        }
    } else {
        alert("Primero debe agregar un contendor de pagina");
    }
};

const agregarParrafo = function () {
    // Verificando que existe el contenedor de la pagina
    const contenedor = document.querySelector("#idDivPage");
    // Verificando que existe el menu
    const menu = document.querySelectorAll("#idDivPage > header");
    if (contenedor) {
        if (menu.length > 0) {
            let parrafo = prompt("Agregue el parrafo de la pagina");
            if (parrafo != "" && parrafo != null) {
                const p = document.createElement("p");
                // Agregando clases de Bootstrap
                p.setAttribute("class", "lead mb-4 text-justify");
                p.innerHTML = parrafo;
                contenedor.appendChild(p);
            } else {
                alert("No se ha registrado ningun parrafo, por favor ingrese información");
            }
        } else {
            alert("Debe agregar un menu primero");
        }
    } else {
        alert("Primero debe agregar un contendor de pagina");
    }
};

buttonParrafo.onclick = function () {
    agregarParrafo();
};