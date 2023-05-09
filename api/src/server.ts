import express from "express";
import { pool } from "./database";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3000);
console.log("HTTP server running!");

app.get("/clientes", async (_, response) => {   
    pool.query("SELECT * FROM cliente", (error, result) => {
        if(error) {
            console.log(error);
            console.log("Erro ao buscar clientes \n Erro: " + error.message);
            response.status(500).json({erro: error.message});
        } else {
            response.status(200).json(result.rows);
        }
    });
});

app.get("/cliente/:id", async (request, response) => {   
    const id = parseInt(request.params.id);
    pool.query("SELECT * FROM cliente WHERE id = $1", [id], (error, result) => {
        if(error) {
            console.log(error);
            console.log("Erro ao buscar clientes \n Erro: " + error.message);
            response.status(500).json({erro: error.message});
        } else {
            response.status(200).json(result.rows[0]);
        }
    });
});

app.post("/cliente", async (request, response) => {
    if(!request.body) {
        response.status(406).json({message: "Os dados do cliente são obrigatórios para o cadastro"});
    } else {
        const {nome, idade} = request.body;
        if(!nome || !idade) {
            response.status(406).json({message: "Os dados do cliente são obrigatórios para o cadastro"});
        } else {
            pool.query("INSERT INTO cliente (nome, idade) VALUES ($1, $2)", [nome, idade], (error, _) => {
                if(error) {
                    console.log(error);
                    console.log("Erro ao salvar cliente \n Erro: " + error.message);
                    response.status(500).json({erro: error.message});
                } else {
                    response.status(200).json({message: "Cliente cadastrado com sucesso"});
                }
            })
        }        
    }
});

app.put("/cliente", async (request, response) => {
    if(!request.body) {
        response.status(406).json({message: "Os dados do cliente são obrigatórios para a atualização"});
    } else {
        const {id, nome, idade} = request.body;
        if(!id || !nome || !idade) {
            response.status(406).json({message: "Os dados do cliente são obrigatórios para a atualização"});
        } else {
            pool.query("UPDATE cliente SET nome = $1, idade = $2 WHERE id = $3", [nome, idade, id], (error, _) => {
                if(error) {
                    console.log(error);
                    console.log("Erro ao atualizar cliente \n Erro: " + error.message);
                    response.status(500).json({erro: error.message});
                } else {
                    response.status(200).json({message: "Cliente deletado com sucesso!"});
                }
            })
        }        
    }
})

app.delete("/cliente/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    if(!id) {
        response.status(406).json({message: "O ID do cliente precisa ser informado para a exclusão!"});
    } else {
        pool.query("DELETE FROM cliente WHERE id = $1", [id], (error, _) => {
            if(error) {
                console.log(error);
                console.log("Erro ao buscar clientes \n Erro: " + error.message);
                response.status(500).json({erro: error.message});
            } else {
                response.status(200).json({message: "Cliente atualizado com sucesso!"});
            }
        })
    }
})


