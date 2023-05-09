idClienteSelecionado = undefined;

const salvar = async () => {
    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    
    const body = {
        id: idClienteSelecionado,
        nome: nome,
        idade: idade
    }

    fetch("http://localhost:3000/cliente", {
        method: idClienteSelecionado === undefined ? "POST" : "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        body: JSON.stringify(body)
    })
}

const editar = async(id) => {
    let response = {}
    const cliente = await fetch(`http://localhost:3000/cliente/${id}`);
    response = await cliente.json();

    document.getElementById("nome").value = response.nome;
    document.getElementById("idade").value = response.idade;
    idClienteSelecionado = response.id;
}

const excluir = async(id) => {
    fetch(`http://localhost:3000/cliente/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    });
    location.reload();
}

const listar = async () => {
    let response = [];
    const table = document.getElementById("customersTable");

    const clientes = await fetch("http://localhost:3000/clientes");
    response = await clientes.json();
    response.forEach((cliente) => {
        const tr = `
            <tr>
                <td style="width: 100px; text-align: center">${cliente.nome}</td>
                <td style="width: 100px; text-align: center">${cliente.idade}</td>
                <td style="width: 100px; text-align: center"> <a onclick="editar(${cliente.id})">Editar</a> </td>
                <td style="width: 100px; text-align: center"> <a onclick="excluir(${cliente.id})">Excluir</a> </td>
            </tr>
            `;
        table.innerHTML += tr;
    })  
}

window.addEventListener("load", listar());