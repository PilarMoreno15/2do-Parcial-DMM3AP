document.getElementById("hamburguesa").addEventListener("click", function () {
    let link = document.getElementById("link-movile");
    if (link.classList.contains("oculto")) {
        link.classList.remove("oculto");
    } else {
        link.classList.add("oculto");
    }
});

document.getElementById("imagenes-footer").addEventListener("click", function () {
    let link = document.getElementById("footer-oculto");
    if (link.classList.contains("oculto")) {
        link.classList.remove("oculto");
    } else {
        link.classList.add("oculto");
    }
});

// Busca el boton de para acceder a la carga de las experiencias y lo abre
document.getElementById("estadia").addEventListener("hide.bs.collapse", function () {
    document.getElementById("acceder").textContent = "Mostrar";
});

document.getElementById("estadia").addEventListener("show.bs.collapse", function () {
    document.getElementById("acceder").textContent = "Ocultar";
});


{/* <option value="caballito">Caballito</option>
<option value="mardeajo">Mar de Ajo</option>
<option value="angostura">Villa Langostura</option>
<option value="olivos">Olivos</option> */}

// Aplica filtros para el Hotel 
filtro.addEventListener("change", function () {
    let color_elegido = document.querySelector("option:checked");
    let visitas = document.querySelectorAll("#contenido .card");
    visitas.forEach(card => {
        card.classList.add("oculto");
    });
    
    if (color_elegido.value == "todas") {
        visitas.forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (color_elegido.value == "caballito") {
        document.querySelectorAll("#contenido .caballito").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (color_elegido.value == "mardeajo") {
        document.querySelectorAll("#contenido .mardeajo").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (color_elegido.value == "angostura") {
        document.querySelectorAll("#contenido .angostura").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (color_elegido.value == "olivos") {
        document.querySelectorAll("#contenido .olivos").forEach(card => {
            card.classList.remove("oculto");
        });
    }
});


/* Formulario que ingresa Tarjeta */
document.querySelector("#ingresar form").addEventListener("submit", function name(e) {
    e.preventDefault();
    let hotel_ingresada = hotel.value; 
    let fecha_ingresado = fecha.value; 
    let texto_ingresada = texto.value; 
    let color_ingresado = document.querySelector('#colores option:checked').value; 
    const nuevo_div = document.createElement("div");
    nuevo_div.classList.add("card", "m-2", "text-start", "d-inline-block", color_ingresado , hotel_ingresada);
    nuevo_div.innerHTML = `
        <div class="card-header text-end">
            <img src="imagenes/lapiz.svg" alt="modificar" class="me-3" data-accion="modificar" data-bs-toggle="modal" data-bs-target="#modificar">
            <img src="imagenes/tacho.svg" alt="eliminar" data-accion="eliminar">
        </div>
        <div class="card-body">
            <h3 class="card-title">${hotel_ingresada}</h3>
            <p class="card-text"><strong>fecha:</strong> <span>${fecha_ingresado}</span></p>
            <p class="card-text"><strong>texto:</strong> <span>${texto_ingresada}</span></p>
        </div>
    `;    
    document.getElementById("contenido").prepend(nuevo_div);    
    document.querySelector("#ingresar form").reset();

    /* Luego de agregar el nuevo card dentro del div con id contenido, seleccionamos el contenido completo que tenga ese contenedor (los cards) mediante la propiedad innerHTML como getter y lo guardamos en una variable.
    
    Luego, con el método setItem() guardamos ese contenido como valor de la texto "visitas" en localStorage (si es el primer card estará creando el ítem completo, si ya teníamos el ítem creado en localStorage por uso previo, reemplazamos el valor de esa texto por el nuevo, por lo que siempre estaremos almacenando todos los cards que tenga actualmente el contenedor. */

    let cards_actuales = document.getElementById('contenido').innerHTML;
    localStorage.setItem("visitas", cards_actuales);
                   
});


/* ELIMINAR CARD 
Producimos la BAJA de un dato, debemos preservar el contenido de la WebApp que quede como resultado luego de producirse esta acción. */

document.getElementById("contenido").addEventListener("click", function (e) {
    if(e.target.dataset.accion == "eliminar"){
        let rta = confirm("¿Estás seguro que querés eliminar esta hotel?");
        if(rta){
            e.target.parentElement.parentElement.remove();

            /* Realizamos el mismo proceso que anteriormente, luego de la eliminación del card, seleccionamos los que quedaron como contenido del div con id contenido y los guardamos en localStorage en el mismo ítem. 
            
            De este modo, no nos interesa si el eliminado era el cuarto o el décimo card, guardamos lo que quedó luego de la eliminación que es el contenido que está viendo el fecha luego de la funcionalidad. */

            let cards_actuales = document.getElementById('contenido').innerHTML;
            localStorage.setItem("visitas", cards_actuales);
        }
    }
});


/* ELIMINAR TODOS LOS CARDS 
Producimos la BAJA de todos los datos, debemos reflejar esa situación en localStorage luego de producirse esta acción. */

document.getElementById("eliminar_todo").addEventListener("click", function () {    
    let rta = confirm("¿Estás seguro que querés eliminar todas las hotels?");
    if(rta){
        document.getElementById('contenido').innerHTML = "";

        /* Después de eliminar todo el contenido del div con id contenido (los cards) debemos hacer lo mismo en localStorage mediante el método clear() eliminamos todos los ítems guardados por la WebApp (que en realidad era uno solo). */

        localStorage.clear();
    }   
});


/* PROGRAMACIÓN DEL BOTÓN MODIFICAR 
Preparamos el formulario de modificación pero no realizamos ningún cambio por lo que no hacemos nada (en realidad le agregamos el atributo data-modificando a un card pero este cambio no nos interesa guardarlo en localStorage ya que es un cambio momentaneo solo mientras dure el proceso de modificación ya que al terminar la funcionalidad, eliminamos ese atributo que aplicamos solo para marcar el card a modificar). */

document.getElementById("contenido").addEventListener("click", function (e) {
    if(e.target.dataset.accion == "modificar"){
        let card = e.target.parentElement.parentElement; 
        let color_actual;
        if(card.classList.contains("rosa")) {
            color_actual = "rosa";
        }else if(card.classList.contains("celeste")) {
            color_actual = "celeste";
        }else if(card.classList.contains("verde")) {
            color_actual = "verde";
        }else if(card.classList.contains("naranja")) {
            color_actual = "naranja";
        }
        card.dataset.modificando = color_actual;
        let hotel_actual = document.querySelector('[data-modificando] h3').textContent;
        let fecha_actual = document.querySelector('[data-modificando] p:first-of-type span').textContent; 
        let texto_actual = document.querySelector('[data-modificando] p:last-child span').textContent;         
        hotel_mod.value = hotel_actual;
        fecha_mod.value = fecha_actual;
        texto_mod.value = texto_actual;        
        document.querySelectorAll('#colores_mod option').forEach(option => {
            option.removeAttribute("selected");
        });
        document.querySelector(`#colores_mod option[value="${color_actual}"]`).setAttribute("selected", "selected");
    }
});


/* CANCELAR MODIFICACIÓN
Si bien estamos eliminado el atributo data-modificando del card, ese cambio no nos interesa almacenarlo en el localStorage ya que se trata solo de una marca que le agregamos a la etiqueta mientras dura el proceso de modificación y, de hecho, tampoco guardamos el cambio en el evento anterior cuando le agregamos ese atributo (si lo hacemos en ambos no pasa nada pero estaríamos realizando acciones y consumiendo memoria inútilmente ya que no son cambio duraderos). */

document.getElementById("cancelar_mod").addEventListener("click", function () {
    let modificando = document.querySelector('[data-modificando]');
    modificando.removeAttribute('data-modificando');
});


/* MODIFICACIÓN DE DATOS 
Producimos la MODIFICACIÓN de un dato, debemos preservar el contenido de la WebApp que quede como resultado luego de producirse esta acción. */

document.querySelector("#modificar form").addEventListener("submit", function name(e) {
    e.preventDefault();
    let modificando = document.querySelector('[data-modificando]');
    let hotel_modificada = hotel_mod.value; 
    let fecha_modificado = fecha_mod.value; 
    let texto_modificada = texto_mod.value; 
    let color_modificado = document.querySelector('#colores_mod option:checked').value;
    let color_actual = modificando.dataset.modificando;
    let h3 = document.querySelector('[data-modificando] h3');
    let p_fecha = document.querySelector('[data-modificando] p:first-of-type span');
    let p_texto = document.querySelector('[data-modificando] p:last-child span');
    h3.textContent = hotel_modificada;
    p_fecha.textContent = fecha_modificado;
    p_texto.textContent = texto_modificada;
    modificando.classList.replace(color_actual, color_modificado);
    modificando.removeAttribute('data-modificando');

    /* Luego de modificar el contenido del card y de eliminar el atributo data-modificando que solo lo utilizamos para marcar el card en cuestión (no necesitamos guardar ese atributo localmente para nada), hacemos lo mismo que antes: traemos el contenido completo del div con id contenido como quedó luego de la modificación y lo guardamos localmente (evitamos tener que detectar cuál de todos fue modificado al trabajar el contenido completo). */

    let cards_actuales = document.getElementById('contenido').innerHTML;
    localStorage.setItem("visitas", cards_actuales);
});


/* EVENTO DE CARGA 
Una vez que terminamos de preservar de manera local cada vez que realizamos alta, baja o modificación de datos, debemos realizar la segunda parte de este tercer paso del proceso de producción que se trata de realizar la acción inversa: ahora, cuando carga el documento HTML, traemos los cards guardados en localStorage y se los agregamos como contenido del div con id contenido que en el documento HTML ESTÁ VACÍO.

De este modo, el fecha verá el mismo contenido que la última vez que había utilizado la WebApp como si nunca se ubieran perdido esas etiquetas creadas en tiempo de ejecución. */

document.addEventListener("DOMContentLoaded", function () {

    /* Traemos los datos guardados en el ítem de localStorage y los guardamos en una variable. */

    let guardados = localStorage.getItem("visitas");

    /* Pero si es la primera vez que utilizamos la WebApp o si en su último uso eliminamos todos los cards, en localStorage no exite un ítem con la clave "visitas" y cuando lo pedimos con el método getItem() devuelve el valor null.
    
    Para evitar que ese valor se agregue como contenido del div con id contenido, SIEMPRE debemos verificar que el valor que trajimos de localStorage sea DISTINTO de null y solo en ese caso proceder a agregar el contenido guardado como contenido del div con id contenido mediante la propiedad innerHTML. */
    
    if(guardados != null) {
        document.getElementById('contenido').innerHTML = guardados;
    }
});