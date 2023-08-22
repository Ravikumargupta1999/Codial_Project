
const developmet = {
    name : 'developmet',
    asset_path: '/assests',
    sessiom_cookie_key: 'blahsomething',
    db: 'codial_development',
    smtp : {
        service : "gmail",
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : "raviguptacode3217@gmail.com",
            pass : "yvvvjppljclyjwwn"
        }
    },
    google_client_id: "871165748594-3q98kjuvekg2pocoj9vlbc3sg2k8a0k5.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'

}

const production = {
    name: 'production'
}

module.exports = developmet;