const expres = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = expres();
const port = 8000;
const exportsLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cors = require('cors');


// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMare = require('./config/middleware');

// setup the chat server to be used with socket.io 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat Server is listening on port 5000')
const path = require('path');


app.use(expres.urlencoded());
app.use(cookieParser());
app.use(expres.static('./assests'));
// make the uploads path available to the 
app.use('/uploads',expres.static(__dirname+'/uploads'));
app.use(exportsLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use(sassMiddleware({
    // src : path.join(__dirname,env.asset_path,'scss'),
    // dest : path.join(__dirname,env.asset_path,'css'),
    // debug : true,
    // outputStyle : 'extended',
    // prefix:'/css'
    src : './assests/scss',
    dest : './assests/css',
    debug : true,
    outputStyle :'extended',
    prefix : '/css'
}))


// set up the engine 
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment in prodecution mode
    secret : env.sessiom_cookie_key,
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
app.use(cors());


// Use express router
app.use('/',require('./routes')); 


app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server : ${port}`)
    }
    console.log(`Server is running on port ${port}`);
});

