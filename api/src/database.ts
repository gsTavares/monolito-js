import { Pool } from "pg";

// Configuração do banco

export const pool = new Pool({
    host:"localhost",
    port: 5432,
    database: "templatenaka", // nome do banco
    user: "postgres",
    password: "postdba"
})