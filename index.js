const expres = require('express');

const app = expres();

const port = 8000;


app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server : ${port}`)
    }
    console.log(`Server is running on port ${port}`);
});