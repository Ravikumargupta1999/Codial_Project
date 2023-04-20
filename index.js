const expres = require('express');
const app = expres();
const port = 8000;
const exportsLayouts = require('express-ejs-layouts');

app.use(exportsLayouts);

// Use express router
app.use('/',require('./routes')); 

// set up the engine 
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server : ${port}`)
    }
    console.log(`Server is running on port ${port}`);
});