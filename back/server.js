const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json()); 

const DatabaseManager = require('./src/databaseManager');
const dbManager = new DatabaseManager('userData');

// GET /api/transactions?username=...
app.get('/api/transactions', async (req, res) => {
    const { username } = req.query;

    try {
        const transactions = await dbManager.getDataByCondition(
            'transactions',
            'user_login = ?',
            [username]
        );
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении транзакций' });
    }
});

// POST /api/transactions — создать новую транзакцию
app.post('/api/transactions', async (req, res) => {
    const { date, amount, user_login, category } = req.body;

    try {
        const result = await dbManager.insertData('transactions', {
            date,
            amount,
            user_login,
            category
        });
        res.status(201).json({ id: result.id, message: 'Транзакция создана' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при создании транзакции' });
    }
});

// PUT /api/transactions/:id — обновить транзакцию
app.put('/api/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { date, amount, user_login, category } = req.body;

    try {
        const result = await dbManager.updateData('transactions', id, {
            date,
            amount,
            user_login,
            category
        });
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Транзакция не найдена' });
        }
        res.json({ message: 'Транзакция обновлена', changes: result.changes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при обновлении транзакции' });
    }
});

// DELETE /api/transactions/:id — удалить транзакцию
app.delete('/api/transactions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await dbManager.deleteData('transactions', id);
        if (!result.deleted) {
            return res.status(404).json({ error: 'Транзакция не найдена' });
        }
        res.json({ message: 'Транзакция удалена' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при удалении транзакции' });
    }
});

// POST /api/users — создать пользователя
app.post('/api/users', async (req, res) => {
    const { login, password } = req.body;
    console.log(login, password);
    try {
        const existingUsers = await dbManager.getDataByCondition('users', 'login = ?', [login]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'Пользователь с таким логином уже существует' });
        }

        const result = await dbManager.insertData('users', { login, password });
        res.status(201).json({ login: login, message: 'Пользователь создан' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при создании пользователя' });
    }
});

// POST /api/login — валидация входа пользователя
app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const users = await dbManager.getDataByCondition('users', 'login = ?', [login]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Неверный логин' });
        }

        const user = users[0];

        if (user.password !== password) {
            return res.status(401).json({ error: 'Неверный пароль' });
        }

        res.json({
            success: true,
            user: {
                login: user.login
            },
            message: 'Вход выполнен успешно'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при входе' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});