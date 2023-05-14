const expres = require('express');
const cookieParser = require('cookie-parser');
const app = expres();
const port = 8000;
const exportsLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMare = require('./config/middleware');


app.use(sassMiddleware({
    src : './assests/scss',
    dest : './assests/css',
    debug : true,
    outputStyle : 'extended',
    prefix:'/css'
}))
app.use(expres.urlencoded());
app.use(cookieParser());
app.use(expres.static('./assests'));
// make the uploads path available to the 
app.use('/uploads',expres.static(__dirname+'/uploads'));
app.use(exportsLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


// set up the engine 
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment in prodecution mode
    secret : 'blahsomething',
    saveUninitialized :false,
    reSave : false,
    cookie :{
        maxAge :(1000*60*100)
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMare.setFlash);

// Use express router
app.use('/',require('./routes')); 


app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server : ${port}`)
    }
    console.log(`Server is running on port ${port}`);
});