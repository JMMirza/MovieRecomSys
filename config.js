var config = {
    mongo_uri: "mongodb://admin:sstW0VbIi2jBikmP@cluster0-shard-00-00.gqpis.mongodb.net:27017,cluster0-shard-00-01.gqpis.mongodb.net:27017,cluster0-shard-00-02.gqpis.mongodb.net:27017/MovieRecomSystem?ssl=true&replicaSet=atlas-14jhwi-shard-0&authSource=admin&retryWrites=true&w=majority",
    secret: "0xc106ece52802f2cd3fba36defbcc9d708bcad751efe6246d21e32ed16844bc6b",
    nodemailerPass: "Adanali2018",
    nodemailerEmail: "edummy304@gmail.com",
    url: `http://localhost:3000`,
    FACEBOOK_CLIENT_ID: "318137040089536",
    FACEBOOK_CLIENT_SECRET: "d25f52fe32769949eb124b241eb9b3a7",
    TWITTER_CONSUMER_KEY:"DyLk7MJ90XoZkYSq9koHpNugs",
    TWITTER_CONSUMER_SECRET: "P72ZCuDX4xrNL2051dfKwUEoZCcretibo6vaRFwVBhCth61zBy",
    SESSION_SECRET: "3fgfvhbjnvfjd78vdkfjnvjdfhm89nvd",
    CallBackUrlFB: `http://localhost:3000/api/login/facebook/callback`,
    CallBackUrlTW: `http://localhost:3000/api/login/twiter/callback`
};
module.exports = config;