const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LocadoraBD',
    password: 'postgres',
    port: "5432"
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../Front')));

// Endpoint para listar carros disponíveis
app.get('/cars', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars WHERE available = TRUE');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
});

// Endpoint para alugar um carro
app.post('/rent', async (req, res) => {
    const { car_id, renter_name, start_date, end_date, email, marital_status, contact_number } = req.body;

    try {
        const carResult = await pool.query('SELECT available FROM cars WHERE id = $1', [car_id]);

        if (carResult.rows.length > 0 && carResult.rows[0].available) {
            await pool.query('INSERT INTO orders (car_id, renter_name, start_date, end_date, email, marital_status, contact_number) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                [car_id, renter_name, start_date, end_date, email, marital_status, contact_number]);

            await pool.query('UPDATE cars SET available = FALSE WHERE id = $1', [car_id]);

            res.json({ message: 'Carro alugado com sucesso!' });
        } else {
            res.status(400).json({ message: 'Carro não disponível.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
