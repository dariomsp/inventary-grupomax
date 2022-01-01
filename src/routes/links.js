const express = require('express')
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
    const orderNotes = await pool.query("SELECT o.`order-note_id`, o.`voucher-number`,c.`name`, COUNT(a.`descrition`) AS amount FROM `details-order-note` AS d INNER JOIN `order-notes` AS o ON d.`order-note_id` = o.`order-note_id` INNER JOIN `articles` AS a ON a.article_id = d.article_id INNER JOIN `clients` AS c ON c.client_id = o.client_id GROUP BY o.`voucher-number`;")
    console.log(orderNotes)
    res.render('order-notes', { title:'Notas de pedido - Grupo Max',orderNotes })
})

router.get('/notas-de-pedido/:id', async (req,res) => {
    const { id } = req.params;
    const detailsOrderNote = await pool.query('SELECT o.`voucher-number`,c.`name`, a.`descrition`, d.`amount` FROM `details-order-note` AS d INNER JOIN `order-notes` AS o ON d.`order-note_id` = o.`order-note_id` INNER JOIN `articles` AS a ON a.article_id = d.article_id INNER JOIN `clients` AS c ON c.client_id = o.client_id WHERE o.`order-note_id` = ?',[id]);
    console.log(detailsOrderNote)
    res.send(detailsOrderNote)
})




module.exports = router;