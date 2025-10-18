const URL_API = 'http://localhost:8080';

export async function health_check() {
    return await fetch(`${URL_API}/`).then(res => res.json());
}

export async function listar_usuarios() {
    var lista_usuarios = await fetch(`${URL_API}/api/cliente`).then(res => res.json()); 
    console.log(lista_usuarios);
    return lista_usuarios;
}