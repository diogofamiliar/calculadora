var app = require('./config/server');

app.get('/',(req,res)=>{
    res.send('ON!');
});

const port = 3000;
app.listen(port,()=>console.log('Listening....'));