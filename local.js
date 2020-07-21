const app = require('./server');
const port = process.env.PORT || 8000;

// Server
app.listen(port, () => {
    console.log("sucess")
   console.log(`Listening on: http://localhost:${port}`);
});