async function obtenerClientes() {
    try {
        const response = await fetch('http://localhost:4000/api/clientes');
        const data = await response.json();

        // Verifica si 'data.body' es un array antes de intentar iterar sobre él
        if (Array.isArray(data.body)) {
            // Lógica para mostrar los datos en la tabla (personaliza según tus necesidades)
            const tableBody = document.getElementById('clientesBody');
            tableBody.innerHTML = '';

            data.body.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.edad}</td>
                    <td>${cliente.profesion}</td>
                    <td>
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                        <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('El campo "body" no es un array:', data);
        }
    } catch (error) {
        console.error('Error al obtener clientes:', error);
    }
}



async function agregarCliente(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const profesion = document.getElementById('profesion').value;

    // Validación de datos
    if (!nombre || !edad || !profesion) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert('El nombre solo debe contener letras y espacios');
        return;
    }

    if (!/^\d{1,2}$/.test(edad) || edad <= 0) {
        alert('La edad debe ser un número positivo de hasta dos cifras');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(profesion)) {
        alert('La profesión solo debe contener letras y espacios');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, edad, profesion }),
        });

        const data = await response.json();
        console.log('Nuevo cliente agregado:', data);

        // Llama a la función para actualizar la tabla después de agregar un cliente
        obtenerClientes();
    } catch (error) {
        console.error('Error al agregar cliente:', error);
    }
}

async function editarCliente(id) {
    // Puedes mostrar un formulario o un conjunto de prompts para que el usuario ingrese los nuevos datos
    const nuevoNombre = prompt('Nuevo nombre:');
    const nuevaEdad = prompt('Nueva edad:');
    const nuevaProfesion = prompt('Nueva profesión:');

    const nuevosDatos = {
        nombre: nuevoNombre,
        edad: nuevaEdad,
        profesion: nuevaProfesion,
    };

    // Validación de datos (puedes agregar más validaciones según tus requisitos)

    try {
        const response = await fetch(`http://localhost:4000/api/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevosDatos),
        });

        const data = await response.json();
        console.log('Cliente editado:', data);

        // Llama a la función para actualizar la tabla después de editar un cliente
        obtenerClientes();
    } catch (error) {
        console.error('Error al editar cliente:', error);
    }
}

async function eliminarCliente(id) {
    const confirmacion = confirm('¿Estás seguro de eliminar este cliente?');

    if (!confirmacion) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/clientes/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log('Cliente eliminado:', data);

        // Llama a la función para actualizar la tabla después de eliminar un cliente
        obtenerClientes();
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
    }
}

async function agregarCliente(event) {
    event.preventDefault();

    const nombreInput = document.getElementById('nombre');
    const edadInput = document.getElementById('edad');
    const profesionInput = document.getElementById('profesion');

    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const profesion = profesionInput.value;

    // Validación de datos
    if (!nombre || !edad || !profesion) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert('El nombre solo debe contener letras y espacios');
        return;
    }

    if (!/^\d{1,2}$/.test(edad) || edad <= 0) {
        alert('La edad debe ser un número positivo de hasta dos cifras');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(profesion)) {
        alert('La profesión solo debe contener letras y espacios');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, edad, profesion }),
        });

        const data = await response.json();
        console.log('Nuevo cliente agregado:', data);

        // Limpiar los campos del formulario después de agregar el cliente
        nombreInput.value = '';
        edadInput.value = '';
        profesionInput.value = '';

        // O puedes usar reset() para restablecer todo el formulario
        // document.getElementById('formularioClientes').reset();

        // Llama a la función para actualizar la tabla después de agregar un cliente
        obtenerClientes();
    } catch (error) {
        console.error('Error al agregar cliente:', error);
    }
}
