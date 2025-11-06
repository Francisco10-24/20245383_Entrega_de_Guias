// ===== EJERCICIO COMPLEMENTARIO 2 =====
// Validaciones con expresiones regulares

const validarCarnet = (carnet) => {
    const regex = /^[A-Z]{2}\d{3}$/;
    return regex.test(carnet);
};

const validarNombreCompleto = (nombre) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(nombre) && nombre.trim().length > 0;
};

const validarDUI = (dui) => {
    const regex = /^\d{8}-\d{1}$/;
    return regex.test(dui);
};

const validarNIT = (nit) => {
    const regex = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    return regex.test(nit);
};

const validarFechaNacimiento = (fecha) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(fecha)) return false;
    
    // Validación adicional de fecha
    const [dia, mes, anio] = fecha.split('/');
    const fechaObj = new Date(anio, mes - 1, dia);
    return fechaObj.getDate() == dia && 
           fechaObj.getMonth() == mes - 1 && 
           fechaObj.getFullYear() == anio;
};

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarEdad = (edad) => {
    const regex = /^\d+$/;
    return regex.test(edad) && parseInt(edad) > 0 && parseInt(edad) < 150;
};

// Ejemplo de uso en un formulario
const validarFormularioEstudiante = (estudiante) => {
    const errores = [];
    
    if (!validarCarnet(estudiante.carnet)) {
        errores.push("Carnet debe tener formato: dos letras y tres números (Ejemplo: AB001)");
    }
    
    if (!validarNombreCompleto(estudiante.nombre)) {
        errores.push("Nombre completo no debe contener números o caracteres especiales");
    }
    
    if (!validarDUI(estudiante.dui)) {
        errores.push("DUI debe tener formato: ########-#");
    }
    
    if (!validarNIT(estudiante.nit)) {
        errores.push("NIT debe tener formato: ####-######-###-#");
    }
    
    if (!validarFechaNacimiento(estudiante.fechaNacimiento)) {
        errores.push("Fecha de nacimiento debe tener formato dd/mm/aaaa");
    }
    
    if (!validarEmail(estudiante.email)) {
        errores.push("Correo electrónico no válido");
    }
    
    if (!validarEdad(estudiante.edad)) {
        errores.push("Edad debe ser un número válido");
    }
    
    return errores;
};