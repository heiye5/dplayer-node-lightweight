const express = require('express');
const app = express();
const getRouter = require('./routes/get');
const postRouter = require('./routes/post');
const morgan = require('morgan');
const cors = require('cors'); // 引入 cors 中间件

// 使用 cors 中间件处理跨域请求
app.use(cors());

// 使用 morgan 作为日志中间件，记录更详细的请求信息
app.use(morgan('combined'));

app.use(express.json());

// 使用 /v3 作为基础路径
app.use('/v3', getRouter);
app.use('/v3', postRouter);

// 全局错误处理中间件
app.use((err, req, res, next) => {
    console.error('发生未捕获的异常:', err);
    res.status(500).json({ code: 1, msg: '服务器内部错误' });
});

const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(`无法启动服务器:`, err);
    } else {
        console.log(`弹幕服务器运行在 http://localhost:${PORT}`);
    }
});