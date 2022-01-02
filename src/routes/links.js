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
    var lastOrderNote = await pool.query("SELECT `orderNote_id` FROM `order-notes` ORDER BY `orderNote_id` DESC LIMIT 1;")
    lastOrderNote = Object.values(lastOrderNote[0]);
    lastOrderNote = lastOrderNote[0] + 1;
    const clients = await pool.query("SELECT `client_id`, `name` FROM clients ORDER BY name ASC LIMIT 150;")
    const articles = await pool.query("SELECT `article_id`, `descrition` FROM articles ORDER BY descrition ASC;")
    console.log('LastIrder',lastOrderNote)
    res.render('order-notes', { title:'Notas de pedido - Grupo Max',orderNotes, clients, articles,lastOrderNote })
})

router.get('/notas-de-pedido/:id', async (req,res) => {
    const { id } = req.params;
    const detailsOrderNote = await pool.query('SELECT o.`voucherNumber`,c.`name`, a.`descrition`, d.`amount` FROM `details-order-note` AS d INNER JOIN `order-notes` AS o ON d.`orderNote_id` = o.`orderNote_id` INNER JOIN `articles` AS a ON a.article_id = d.article_id INNER JOIN `clients` AS c ON c.client_id = o.client_id WHERE o.`orderNote_id` = ?',[id]);
    res.send(detailsOrderNote)
})

router.post('/notas-de-pedido/agregar', async (req,res)=>{
    console.log(req.body)
    const { client_id, voucherNumber } = req.body;
    const { newDetailsOrderNote,newDetailsOrderNote2, newDetailsOrderNote3,newDetailsOrderNote4,newDetailsOrderNote5,newDetailsOrderNote6,
        newDetailsOrderNote7,
        newDetailsOrderNote8,newDetailsOrderNote9,newDetailsOrderNote10,newDetailsOrderNote11,
        newDetailsOrderNote12,newDetailsOrderNote13,newDetailsOrderNote14,newDetailsOrderNote15,newDetailsOrderNote16  } = req.body;
    var newDetailsOrderNote1 = [ newDetailsOrderNote ]
    console.log('antes',newDetailsOrderNote1)
    if (newDetailsOrderNote2) {
        newDetailsOrderNote1.push(newDetailsOrderNote2)
        
    } 
    if (newDetailsOrderNote3) {
        newDetailsOrderNote1.push(newDetailsOrderNote3);
    }
    if (newDetailsOrderNote4) {
        newDetailsOrderNote1.push(newDetailsOrderNote4);
    }
    if (newDetailsOrderNote5) {
        newDetailsOrderNote1.push(newDetailsOrderNote5);
    }
    if (newDetailsOrderNote6) {
        newDetailsOrderNote1.push(newDetailsOrderNote6);
    }
    if (newDetailsOrderNote7) {
        newDetailsOrderNote1.push(newDetailsOrderNote7);
    }
    console.log('Verdadero',newDetailsOrderNote1)
    const newOrderNote = {
        client_id,
        voucherNumber
    }
    await pool.query('INSERT INTO `order-notes` set ?', [newOrderNote]);
    
    newDetailsOrderNote1 = Object.values(newDetailsOrderNote1)


    console.log(newDetailsOrderNote1)
    await pool.query('INSERT INTO `details-order-note` (`orderNote_id`,`article_id`,`amount`) VALUES ?',[newDetailsOrderNote1])
    res.redirect('/notas-de-pedido');
})




module.exports = router;