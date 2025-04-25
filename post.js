const express = require('express');
const router = express.Router();
const pool = require('../models/danmaku');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    console.log('POST请求');
    const { id, author, time, text, color, type } = req.body;
    const ip = req.ip;
    const referer = req.headers.referer || '';

    try {
        const [result] = await pool.query(
            'INSERT INTO danmaku (player, author, time, text, color, type, ip, referer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, author, time, text, color, type, ip, referer]
        );
        res.json({
            code: 0,
            data: {
                id: result.insertId,
                player: id,
                author,
                time,
                text,
                color,
                type,
                ip,
                referer,
                date: new Date().getTime()
            }
        });
    } catch (error) {
        console.error('添加弹幕失败:', error);
        res.status(500).json({ code: 1, msg: '添加弹幕失败' });
    }
});

module.exports = router;