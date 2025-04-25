const express = require('express');
const router = express.Router(); // 使用 express.Router() 创建路由实例
const pool = require('../models/danmaku');

// 处理 GET 请求
router.get('/', async (req, res) => {
    console.log('GET请求');
    const { id, limit } = req.query; // 从查询参数获取 id 和 limit

    // 参数验证
    if (!id) {
        return res.status(400).json({ code: 1, msg: 'id 参数是必需的' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT time, type, color, author, text FROM danmaku WHERE player = ? ORDER BY time',
            [id]
        );
        let data = rows.map(item => [
            parseFloat(item.time),
            parseInt(item.type),
            parseInt(item.color.replace('#', ''), 16),
            item.author,
            item.text
        ]);

        if (limit) {
            const parsedLimit = parseInt(limit);
            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                return res.status(400).json({ code: 1, msg: 'limit 参数必须是正整数' });
            }
            data = data.slice(-parsedLimit);
        }

        res.json({
            code: 0,
            data
        });
    } catch (error) {
        console.error('获取弹幕失败:', error);
        res.status(500).json({ code: 1, msg: '获取弹幕失败' });
    }
});

module.exports = router;