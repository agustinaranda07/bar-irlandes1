//acá cargué todos mis productos para poder pasarlos al DOM

const stockProductos = [
    {id: 1, nombre: "Cerveza Porter", cantidad: 1, precio: 15, img: "./sources/cervezas/porter.jpg"},
    {id: 2, nombre: "Cerveza Lager", cantidad: 1, precio: 12, img: "./sources/cervezas/lager.jpg"},
    {id: 3, nombre: "Cerveza Pale Ale", cantidad: 1, precio: 17, img: "./sources/cervezas/paleAle.jpg"}, 
    {id: 4,nombre: "Ron Blanco", cantidad: 1, precio: 10, img: "./sources/ron/ronBlanco.jpg"},
    {id: 5,nombre: "Ron Dorado", cantidad: 1, precio: 20, img: "./sources/ron/ronDorado.jpg"},
    {id: 6,nombre: "Ron Cubano", cantidad: 1, precio: 15, img: "./sources/ron/cubano.jpg"},
    {id: 7,nombre: "Ron Añejo", cantidad: 1, precio: 30, img: "./sources/ron/añejo.jpg"},
    {id: 8,nombre: "Whisky De Grano" , cantidad: 1, precio: 40, img: "./sources/whisky/deGrano.jpg"},
    {id: 9,nombre: "Whisky Bourbon", cantidad: 1, precio: 35, img: "./sources/whisky/Bourbon.jpg"},
    {id: 10,nombre: "Whisky De Centeno", cantidad: 1, precio: 20, img: "./sources/whisky/deCenteno.jpg"},
    {id: 11,nombre: "Whisky Blended", cantidad: 1, precio: 25, img: "./sources/whisky/blended.png"},
    {id: 12, nombre: "Hamburguesa", cantidad: 1, precio: 15, img: "./sources/comidas/burguer.jpg"},
    {id: 13, nombre: "Pizza", cantidad: 1, precio: 20, img: "./sources/comidas/pizza.jpg"},
    {id: 14, nombre: "Papas fritas", cantidad: 1, precio: 7, img: "./sources/comidas/papas.jpg"}
]

//esta constante trae el div "todoslosproductos" de html donde se van a insertar los productos
const contenedorProductos = document.getElementById("todosLosProductos");

//esta constante trae el div "carrito" de html para insertar mis productos luego
const contenedorCarrito = document.getElementById("carrito");

//este es el carrito que al principio está vacio
let carritoProductos = [];
console.log(carritoProductos)

//acá uso localstorage para poder recargar la pagina y que no se borre lo que tenia en el carrito
document.addEventListener("DOMContentLoaded", () =>{
    if(localStorage.getItem('carritoProductos')){
        carritoProductos = JSON.parse(localStorage.getItem('carritoProductos'))
        actualizarCarrito();
        if (carritoProductos.length == 0){
            ocultar();
        }
    }
});

//aca uso forEach para recorrer mi stock del principio e ir agregando los productos con los estilos de css
//luego con el listener cada vez que hago click al boton de agregar puedo añadir productos al carrito
function ocultar(){
    document.getElementById("cartTitle").style.display = "none";
}

function show(){
    document.getElementById("cartTitle").style.display = "block";
}

if (carritoProductos.length == 0){
    ocultar();
}
    stockProductos.forEach((producto) => {
        let div = document.createElement('div')
        div.classList.add("styleProducto")
        div.innerHTML = ` 
        <img src=${producto.img}>
        <h4>${producto.nombre}</h4>
        <p>Precio: $${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar"><i class="bi bi-cart pe-2"></i>Agregar</button>`;
        contenedorProductos.appendChild(div); 
    
        const boton = document.getElementById(`agregar${producto.id}`);
    
        boton.addEventListener('click', () => {
            show();
            agregarCarrito(producto.id)
            //Acá utilizo la libreria Sweet alert para indicar al usuario que se agregó su producto al carrito
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 700
              })
        });
    });



/*aca agrego un condicional para verificar si hay un producto igual en el carrito, 
si hay sumo la cantidad y sino agrego como item nuevo*/
const agregarCarrito = (prodId) =>{
    const productoExistente = carritoProductos.some(prod =>prod.id === prodId)
    if(productoExistente){
        const prod = carritoProductos.map(prod =>{
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else{
        const item = stockProductos.find((prod) => prod.id === prodId)
        carritoProductos.push(item)
        
    }
    actualizarCarrito()
    if (carritoProductos.length == 0){
        ocultar();
    }
};

// con esta funcion elimino productos del carrito y actualizo al final
const eliminarDelCarrito = (prodId) =>{
    const item = carritoProductos.find((producto) => producto.id === prodId)
    const indice = carritoProductos.indexOf(item)
    //Acá utilizo la libreria Sweet alert para preguntar al usuario si desea eliminar el producto al oprimir el button 
    Swal.fire({
        title: '¿Seguro que desea eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7BC081',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado del carrito',
            'success'
          )
          carritoProductos.splice(indice,1),
          actualizarCarrito() 
          if (carritoProductos.length == 0){
            ocultar();
        }
        }
      }) 
};

//esta funcion actualiza el carrito para que no se repita lo primero que agregué, empezando vacío 
const actualizarCarrito = () =>{
    contenedorCarrito.innerHTML = ""

    carritoProductos.forEach((producto) =>{
        const div = document.createElement('div')
        div.className = ("productoEnCarrito")
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="bi bi-trash3"></i></button>`

        contenedorCarrito.appendChild(div)
        localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos))
    })
};

//esta constante trae la seccion testimonios donde luego se insertan los clientes
const clientes = document.getElementById("testimonios")


//Aca utilizo fotos y nombres de clientes almacenados en clientes.json
fetch("./clientes.json")
.then(response => response.json())
.then((json) => {
    json.forEach((json)=>{
        let div1 = document.createElement("div")
        div1.classList.add("styleClientes")
        div1.innerHTML= `
        <h4>${json.nombre}</h4>
        <img src=${json.img} id="imgsJson">
        <p id="pJson">${json.msj}</p>
        `
        clientes.appendChild(div1);
    })
})


