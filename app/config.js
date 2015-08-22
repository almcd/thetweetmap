var config = {
    //port which app runs on (80 = production, 8080 = development)
    port: process.env.PORT || 8080,

    //twitter keys
    consumer_key: process.env.TWIT_C_KEY,
    consumer_secret: process.env.TWIT_CS_KEY,
    access_token: process.env.TWIT_A_TOKEN,
    access_token_secret: process.env.TWIT_AS_TOKEN

};

module.exports = config;