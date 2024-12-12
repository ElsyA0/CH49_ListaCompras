const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const totalProductos = document.getElementById("totalProductos");
const productosTotal = document.getElementById("productosTotal");

const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont=0
let costoTotal = 0;
let TotalEnProductos= 0;

let datos = [];

function validarCantidad(){

    if (txtNumber.value.length<=0){
        return false;
    }//length<=0
    if(isNaN(txtNumber.value)){
        return false;
    }
    if(Number(txtNumber.value)<=0){
        return false;
    }
    return true;
}//validar cantidad

function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}//getprecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true;

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    if (txtName.value.length<3){
        //1. Mostrar la laerta con el error
        //2. Borde de color rojo
            txtName.style.border = "solid red medium";
            alertValidacionesTexto.innerHTML="El nombre del producto no es correcto";
            alertValidaciones.style.display="block";
            isValid = false

    }//Alerta en caso de que el texto del campo 
    //Nombre sea menor que 3.
    if (! validarCantidad()){
        txtNumber.style.border = "solid red medium";
         alertValidacionesTexto.innerHTML+=
            "<br/><strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display="block";
        isValid = false

    }//!validar cantidad.
    if (isValid){
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
            </tr>`;
        let elemento = {"cont": cont,
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
         };
        datos.push(elemento);

       localStorage.setItem("datos", JSON.stringify(datos));

         
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio*Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        TotalEnProductos+=Number(txtNumber.value);
        productosTotal.innerText = TotalEnProductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("TotalEnProductos", TotalEnProductos);
        localStorage.setItem("cont", cont);

        cuerpoTabla.innerText="";

        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }

}); //Boton de agregar click

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtName.value = "";
    txtNumber.value ="";

    cont=0;
    costoTotal = 0;
    TotalEnProductos= 0;
    precioTotal.innerText = "$" + costoTotal;;
    contadorProductos.innerText = cont;
    productosTotal.innerText = TotalEnProductos;

    cuerpoTabla.innerText="";

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
});

window.addEventListener("load", function(event){
    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }
    if(this.localStorage.getItem("TotalEnProductos")!=null){
        TotalEnProductos = Number(this.localStorage.getItem("TotalEnProductos"));
    }
    if(this.localStorage.getItem("cont")!=null){
        cont = Number(this.localStorage.getItem("cont"));
    }
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    datos.forEach((r)=>{
        let row = `<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
            </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = TotalEnProductos;

});