<script>
// Variable para almacenar la cantidad de mesas iniciales
let mesasIniciales = 5;
// Obtener una referencia al botón "Crear Mesa"
let agregarMesaBtn = document.getElementById("crearMesaBtn");

// Función para crear una mesa y agregarla al contenedor
function crearMesa() {

    const mesaNumero = mesasContainer.children.length + 1;
    const mesa = document.createElement('div');
    // mesa.classList.add('col');
    mesa.dataset.numero = mesaNumero;
    mesa.innerHTML = `
    <div class="col">
        <div class="card text-bg-secondary-light flex-fill m-3" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Mesa ${mesaNumero}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Comensales 0</h6>
                <p class="card-text">Mesa Cerrada.</p>
                <a href="#" class="btn btn-primary disabled" role="button" aria-disabled="true">Pedido</a>
                <a href="#" class="btn btn-danger disabled" role="button" aria-disabled="true">Cerrar Mesa</a>
            </div>
        </div>
    </div>
    `;
    mesasContainer.appendChild(mesa);
    guardarMesas();
}


// Guardar estado de las mesas en el localStorage
function guardarMesas() {
    const mesas = [];
    for (const mesa of mesasContainer.children) {
        const mesaData = {
            numero: mesa.dataset.numero,
            active: mesa.classList.contains('active'),
            guests: mesa.querySelector('p').textContent.match(/\d+/) || [0],
        };
        mesas.push(mesaData);
    }
    localStorage.setItem('mesas', JSON.stringify(mesas));
}
// Crear mesas iniciales al cargar la página
function cargarMesas() {

    const mesasGuardadas = JSON.parse(localStorage.getItem('mesas')) || [];

    if (!mesasGuardadas) {
        mesasGuardadas = 1;
    }
    for (const mesaData of mesasGuardadas) {
        crearMesa();
        const mesa = mesasContainer.lastElementChild;
        if (mesaData.active) {
            mesa.classList.add('active');
            mesa.innerHTML = `
                <p>Mesa ${mesaData.number} - Comensales: ${mesaData.guests}</p>
                <button class="order-button">Hacer pedido</button>
                <button class="close-button">Cerrar mesa</button>
            `;
        }
    }
}


// Asignar la función como manejador del evento clic
agregarMesaBtn.addEventListener('click', crearMesa);


// Cargar mesas desde el localStorage
cargarMesas();
</script>