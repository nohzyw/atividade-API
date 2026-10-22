const express = require('express');
const app = express();
const PORT = 8800;

app.use(express.urlencoded({ extended: true }));

app.get('/v1/hi', (req, res) => {
    const out = {
        msg: 'Hello, World!'
    };
    res.status(200).json(out);
});

app.get('/v1/hi/user/:name', (req, res) => {
    const out = {
        msg: `Hello, ${req.params.name}`
    };
    res.status(200).json(out);
});

app.post('/v1/hi', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const out = {
        msg: `Hello, ${name.toUpperCase()} from POST!`
    };
    res.status(200).json(out);
});

app.get('/v2/hi/:lang', (req, res) => {
    const lang = req.params.lang.toLowerCase();
    let msg = 'Hello, World!';

    if (lang === 'pt-br') msg = 'Olá, Mundo!';
    else if (lang === 'es') msg = '¡Hola, Mundo!';

    res.status(200).json({ msg });
});

app.post('/v2/hi', (req, res) => {
    const lang = (req.body.lang || '').toLowerCase();
    let msg = 'Hello, World!';

    if (lang === 'pt-br') msg = 'Olá, Mundo!';
    else if (lang === 'es') msg = '¡Hola, Mundo!';

    res.status(200).json({ msg });
});

app.use((req, res) => {
    const err = {
        error: 'Invalid endpoint'
    };
    res.status(404).json(err);
});

app.listen(PORT, () => {
    console.log(`Hello API on port ${PORT}`);
});
