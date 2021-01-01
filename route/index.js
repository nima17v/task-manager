const express = require('express');
const router = express();
const path = require('path');
const fs = require('fs');
const mainModule = path.resolve(process.mainModule.path, 'data', 'index.json');

router.get('/', function (req, res, next) {
    fs.readFile(mainModule, 'utf-8', function (err, data) {
        if (err) return res.status(500).json({ message: 'you got an error for get tasks from file' });
        return res.json({ tasks: JSON.parse(data) })
    });
});

router.get('/:id', function (req, res, next) {
    const id = +req.params.id;
    fs.readFile(mainModule, 'utf-8', function (err, data) {
        if (err) return res.status(500).json({ message: 'you got an error for get tasks from file' });
        return res.json({ task: data ? JSON.parse(data).find((task) => task.id === id) : {} });
    });
});

router.post('/create', function (req, res, next) {
    const body = { ...req.body, createAt: new Date(Date.now()), id: Math.floor(Math.random() * 1000000) };
    fs.readFile(mainModule, 'utf-8', function (err, data) {
        if (err) return res.status(500).json({ message: 'you got an error for get tasks from file' });
        const mainData = data ? JSON.parse(data) : [];
        mainData.push(body);
        fs.writeFile(mainModule, JSON.stringify(mainData), function (err) {
            if (err) return res.status(500).json({ message: 'the create task failed ...' });
            return res.json({ message: 'create task successfully' })
        });
    });
});

router.put('/done/:id', function (req, res, next) {
    const id = +req.params.id;
    fs.readFile(mainModule, 'utf-8', function (err, data) {
        if (err) return res.status(500).json({ message: 'you got an error for get tasks from file' });
        const mainData = data ? JSON.parse(data) : [];
        const getIndexById = mainData.findIndex((task) => task.id === id);
        mainData[getIndexById].isDone = true;
        fs.writeFile(mainModule, JSON.stringify(mainData), function (err) {
            if (err) return res.status(500).json({ message: 'the create task failed ...' });
            return res.json({ message: 'task done successfully' })
        });
    });
});

module.exports = router;