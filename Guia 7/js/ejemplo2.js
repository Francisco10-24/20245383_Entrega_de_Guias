// ACCEDIENDO A LA REFERENCIA DEL BOTON
const button = document.querySelector("button[name='btnRegistro']");

// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO
const formulario = document.forms["frmRegistro"];

// ACCEDIENDO A LA REFERENCIA DEL MODAL
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

// DEFINICION DE FUNCIONES
const recorrerFormulario = function () {
    // Inicializando contadores
    let totText = 0;
    let totPass = 0;
    let totEmail = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totFile = 0;
    let totDate = 0;
    let totSelect = 0;

    // Recorriendo todos los elementos del formulario
    for (let i = 0; i < formulario.elements.length; i++) {
        let elemento = formulario.elements[i];
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE = PASSWORD
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = DATE
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de SELECT
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.innerHTML = resultado;
    // Function que permite mostrar el modal de Bootstrap
    // Esta funcion es definida por Bootstrap
    modal.show();
};

// agregando eventos al boton
button.onclick = () => {
    recorrerFormulario();
};

// Función para validar el formulario completo
const validarFormularioCompleto = function () {
    let errores = [];
    
    // a) Validar campos no vacíos
    const camposTexto = ['idNombre', 'idApellidos', 'idFechaNac', 'idCorreo', 'idPassword', 'idPasswordRepetir'];
    camposTexto.forEach(id => {
        const campo = document.getElementById(id);
        if (!campo.value.trim()) {
            errores.push(`El campo "${campo.labels[0].textContent}" está vacío`);
        }
    });

    // b) Validar fecha de nacimiento no supere la fecha actual
    const fechaNac = document.getElementById('idFechaNac').value;
    const fechaActual = new Date().toISOString().split('T')[0];
    if (fechaNac > fechaActual) {
        errores.push('La fecha de nacimiento no puede ser mayor a la fecha actual');
    }

    // c) Validar correo electrónico con expresión regular
    const correo = document.getElementById('idCorreo').value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !regexEmail.test(correo)) {
        errores.push('El formato del correo electrónico no es válido');
    }

    // d) Validar que contraseñas sean iguales
    const password = document.getElementById('idPassword').value;
    const passwordRepetir = document.getElementById('idPasswordRepetir').value;
    if (password !== passwordRepetir) {
        errores.push('Las contraseñas no coinciden');
    }

    // e) Validar al menos un interés seleccionado
    const intereses = document.querySelectorAll('input[type="checkbox"]');
    const algunInteresSeleccionado = Array.from(intereses).some(checkbox => checkbox.checked);
    if (!algunInteresSeleccionado) {
        errores.push('Debe seleccionar al menos un interés');
    }

    // f) Validar carrera seleccionada
    const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');
    if (!carreraSeleccionada) {
        errores.push('Debe seleccionar una carrera');
    }

    // g) Validar país de origen seleccionado
    const pais = document.getElementById('idCmPais');
    if (pais.selectedIndex === 0) {
        errores.push('Debe seleccionar un país de origen');
    }

    return errores;
};

// Función para crear tabla con DOM (sin innerHTML)
const crearTablaDatos = function () {
    const modalBody = document.getElementById('idBodyModal');
    
    // Limpiar contenido previo
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }
    
    // Crear tabla
    const tabla = document.createElement('table');
    tabla.setAttribute('class', 'table table-striped');
    
    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');
    
    // Función para agregar fila
    const agregarFila = function (etiqueta, valor) {
        const tr = document.createElement('tr');
        
        const tdEtiqueta = document.createElement('td');
        tdEtiqueta.textContent = etiqueta;
        tdEtiqueta.setAttribute('class', 'fw-bold');
        
        const tdValor = document.createElement('td');
        tdValor.textContent = valor;
        
        tr.appendChild(tdEtiqueta);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    };
    
    // Recopilar datos
    agregarFila('Nombres', document.getElementById('idNombre').value);
    agregarFila('Apellidos', document.getElementById('idApellidos').value);
    agregarFila('Fecha Nacimiento', document.getElementById('idFechaNac').value);
    agregarFila('Correo Electrónico', document.getElementById('idCorreo').value);
    
    // Obtener intereses seleccionados
    const interesesSeleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent)
        .join(', ');
    agregarFila('Intereses', interesesSeleccionados || 'Ninguno');
    
    // Obtener carrera seleccionada
    const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');
    agregarFila('Carrera', carreraSeleccionada ? carreraSeleccionada.nextElementSibling.textContent : 'No seleccionada');
    
    // Obtener país seleccionado
    const pais = document.getElementById('idCmPais');
    agregarFila('País', pais.options[pais.selectedIndex].text);
    
    tabla.appendChild(tbody);
    modalBody.appendChild(tabla);
};

// Modificamos la función del botón principal
button.onclick = () => {
    const errores = validarFormularioCompleto();
    
    if (errores.length > 0) {
        alert("Errores de validación:\n\n" + errores.join('\n'));
    } else {
        crearTablaDatos();
        modal.show();
    }
};