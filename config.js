var config = {
    server_port: 20000,
    mongo_uri: "mongodb://admin:sstW0VbIi2jBikmP@cluster0-shard-00-00.gqpis.mongodb.net:27017,cluster0-shard-00-01.gqpis.mongodb.net:27017,cluster0-shard-00-02.gqpis.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14jhwi-shard-0&authSource=admin&retryWrites=true&w=majority",
    secret: "0xc106ece52802f2cd3fba36defbcc9d708bcad751efe6246d21e32ed16844bc6b",
    nodemailerPass: "Adanali2018",
    nodemailerEmail: "edummy304@gmail.com",
    url: `http://localhost:${this.server_port}`,
    FACEBOOK_CLIENT_ID: "",
    FACEBOOK_CLIENT_SECRET: "",
    TWITTER_CONSUMER_KEY:"",
    TWITTER_CONSUMER_SECRET: "",
    SESSION_SECRET: "3fgfvhbjnvfjd78vdkfjnvjdfhm89nvd",
    CallBackUrlFB: `http://localhost:3000/api/login/facebook/callback`,
    CallBackUrlTW: `http://localhost:3000/api/login/twiter/callback`
};
module.exports = config;