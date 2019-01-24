
const xhttp = new XMLHttpRequest();


function pedirData(valor) {
    
    let url;
    if (valor) {
        
        if (valor.indexOf('@') > -1) {
            url = `https://jsonplaceholder.typicode.com/users?email=${valor}`  
            console.log(valor);
            
        }else{
            url = `https://jsonplaceholder.typicode.com/users?name=${valor}`  
        }
    }else{
        url = `https://jsonplaceholder.typicode.com/users/`
    }

    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState === 4 && this.status === 200) {
            
            mostrarData(xhttp.responseText); 
        }
    };
    
    
    xhttp.open("GET", url, true);
    xhttp.send(); 
}


let input = document.getElementById('inputBuscar');
const boton = document.getElementById('buttonBuscar');
const listaUsuarios = document.getElementById('lista-usuarios');
let valor;


input.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        valor = input.value;
        return pedirData(valor);
    }
});

boton.addEventListener('click', function () {
    valor = input.value;
    return pedirData(valor);
})




function mostrarData(data) {
    let objeto = JSON.parse(data)
    if (data === '[]' && listaUsuarios.textContent !== '') {
        alert('Debe ingresar el nombre completo o el email completo para completar la búsqueda');
    }
    if (listaUsuarios.textContent !== '') {
        $('#lista-usuarios').empty();
        if ($('#buttonVolver').css('display') === 'none') {
                $('#buttonVolver').toggleClass('mostrar');
            }
        input.value = "";
    }
    if (objeto.length === 1) {
        if ($('#buttonVolver').css('display') === 'none') {
            $('#buttonVolver').toggleClass('mostrar');
        }
    }
    for (let i = 0; i < objeto.length; i++) { 
        let ul = document.createElement('ul');
        const key = Object.keys(objeto[i]);
        const val = Object.values(objeto[i]);
        let li;
        

        for (let e = 0; e < key.length; e++) {
        li = document.createElement('li');

                if (typeof(val[e]) === "object") {
                    
                    const ul2 = document.createElement('ul');
                    const title = document.createElement('h5');
                    title.textContent = key[e];
                    ul2.append(title);
                    
                    const key1 = Object.getOwnPropertyNames(val[e]);
                    const val1 = Object.values(val[e]);

                    for (let x = 0; x < key1.length; x++) {
                        const li2 = document.createElement('li');
                        li2.textContent = key1[x]+": "+ val1[x];
                        


                        if (typeof(val1[x]) === "object") {
                            e++
                            const key2 = Object.getOwnPropertyNames(val1[x]);
                            const val2 = Object.values(val1[x]);
                            const title2 = document.createElement('h5');
                            title2.textContent = key1[x];
                            const ul3 = document.createElement('ul');
                            let li3;
                            ul3.append(title2);
                            
                            

                                for (let y = 0; y < val2.length; y++) {
                                    li3 = document.createElement('li');
                                    li3.textContent = key2[y]+": "+val2[y];
                                    ul3.append(li3);
                                    
                                }

                        ul2.append(ul3);    
                        }


                    if (x === 4) {
                    break;
                    }
                    ul2.append(li2);
                    }
                

                ul.append(ul2);
                }


        if (e === 7) {
        break;
        }
        li.textContent = key[e] + ": " + val[e];
        ul.append(li)
        }
    
        
    listaUsuarios.append(ul);            
    }

    
}

$('#buttonVolver').click(function () {
    
    window.onload();
})


window.onload = function() {
    pedirData();
}
