const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const pool = require('../database')

router.get('/agregar', (req, res) => {
    res.render('add')
})

router.post('/articulos/agregar', async (req,res)=>{
    const { descrition,category_id ,unit, amount } = req.body;
    const newArticle = {
        descrition,
        category_id,
        unit,
        amount
    }
    console.log(newArticle)
    await pool.query('INSERT INTO articles set ?',[newArticle])
    res.redirect('/articulos');
})

router.get('/articulos', async (req,res) => {
    const articles = await pool.query("SELECT a.descrition, c.description, a.unit, a.amount FROM articles AS a INNER JOIN categories AS c ON a.category_id = c.category_id ORDER BY a.amount DESC;")
    const categories = await pool.query("SELECT category_id, description FROM categories ORDER BY description ASC;")
    res.render('articles', { title:'Artículos - Grupo Max',articles, categories })
})

router.get('/notas-de-pedido', async (req,res) => {
    const orderNotes = await pool.query("SELECT o.`orderNote_id`, o.`voucherNumber`,c.`name`, COUNT(a.`descrition`) AS amount FROM `details-order-note` AS d INNER JOIN `order-notes` AS o ON d.`orderNote_id` = o.`orderNote_id` INNER JOIN `articles` AS a ON a.article_id = d.article_id INNER JOIN `clients` AS c ON c.client_id = o.client_id GROUP BY o.`voucherNumber`;")
    const clients = await pool.query("SELECT `client_id`, `name` FROM clients ORDER BY name ASC LIMIT 150;")
    const articles = await pool.query("SELECT `article_id`, `descrition` FROM articles ORDER BY descrition ASC;")
    res.render('order-notes', { title:'Notas de pedido - Grupo Max',orderNotes, clients, articles })
})

router.get('/notas-de-pedido/:id', async (req,res) => {
    const { id } = req.params;
    const detailsOrderNote = await pool.query('SELECT o.`voucherNumber`,c.`name`, a.`descrition`, d.`amount` FROM `details-order-note` AS d INNER JOIN `order-notes` AS o ON d.`orderNote_id` = o.`orderNote_id` INNER JOIN `articles` AS a ON a.article_id = d.article_id INNER JOIN `clients` AS c ON c.client_id = o.client_id WHERE o.`orderNote_id` = ?',[id]);
    res.send(detailsOrderNote)
})

router.post('/notas-de-pedido/agregar', async (req,res)=>{
    console.log(req.body)
    const { client_id, voucherNumber } = req.body;
    const { article_id, amount } = req.body;
    const newOrderNote = {
        client_id,
        voucherNumber
    }
    await pool.query('INSERT INTO `order-notes` set ?', [newOrderNote]);
    const orderNote_IId = await pool.query("SELECT `orderNote_id` FROM `order-notes` ORDER BY `orderNote_id` DESC LIMIT 1;")
    const orderNoteToJSON = JSON.parse(JSON.stringify(orderNote_IId[0]));
    const orderNote_id = Object.values(orderNoteToJSON);
    const newDetailsOrderNote = {
        orderNote_id,
        article_id,
        amount
      }
    console.log(orderNote_id)
    await pool.query('INSERT INTO `details-order-note` set ?',[newDetailsOrderNote])
    res.redirect('/notas-de-pedido');
})




module.exports = router;