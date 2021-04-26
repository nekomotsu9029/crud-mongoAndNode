const express = require('express');
const router = express.Router();

const task = require('../models/task');

router.get('/', async (req, res)=>{
    const tasks = await task.find();
    res.render('index.html', {saludo: 'hola hdlv soy nekomotsu', tasks});
});

router.post('/add', async (req, res) => {
    const taskReceived = new task(req.body);
    await taskReceived.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await task.remove({_id: id});
    res.redirect('/');
});

router.get('/estado/:id', async (req, res) => {
    const { id } = req.params;
    const tarea = await task.findById(id);
    tarea.status = !tarea.status;
    await tarea.save();
    res.redirect('/');
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const tarea = await task.findById(id);
    res.render('editar.html', {
        tarea
    });
});

router.post('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    await task.update({_id: id}, req.body);
    res.redirect('/');
});
/*
router.get('/tierlist', (req, res)=>{
    res.render('tierlist.html');
});

router.get('/topdecks', (req, res)=>{
    res.render('topdecks.html');
});

router.get('/torneos', (req, res)=>{
    res.render('comoParticipar.html');
});*/

module.exports = router;