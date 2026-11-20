import app from './app.js';

const PORT = app.get('port');

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
