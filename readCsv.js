const contenido = document.getElementById('contenido')
async function cargarArchivoCSV() {
    const respuesta = await fetch('../plantillaArticuloNataliaCorrea.csv');
    const datosCSV = await respuesta.text();
    const datosObjeto = Papa.parse(datosCSV, { header: true });
    const datos = datosObjeto.data;
    var cadena = ``;
    //Creamos un nuevo objeto donde vamos a almacenar por ciudades. 
    let nuevoObjeto = {}
    //Recorremos el arreglo 
    datos.forEach(x => {
        if (!nuevoObjeto.hasOwnProperty(x.SECCION)) {
            nuevoObjeto[x.SECCION] = {
                items: []
            }
        }
        //Agregamos los datos de profesionales. 
        nuevoObjeto[x.SECCION].items.push({
            DESCRIPCION: x.DESCRIPCION,
            PRECIO: x.PRECIO
        })
    })
    for (const value in nuevoObjeto) {
        if (value != typeof undefined) {
            cadena = `<div class="menu-restaurante" data-aos="fade-right" data-aos-duration="1500" >
               <h3>${value}</h3>
               <div>`
            const temporal = nuevoObjeto[value];
            for (var i = 0 in temporal) {
                const salida = temporal[i];
                for (var j = 0 in salida) {
                    cadena += `<p>${salida[j].DESCRIPCION} <span>${salida[j].PRECIO} $</span></p>`
                }
                cadena += `</div>`
            }
            contenido.innerHTML += cadena;
        }
    }
}
cargarArchivoCSV();