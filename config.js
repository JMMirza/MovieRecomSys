var config = {
    server_port: 20000,
    mongo_uri: "mongodb://localhost/movierecommendation",
    secret: "0xc106ece52802f2cd3fba36defbcc9d708bcad751efe6246d21e32ed16844bc6b",
    nodemailerPass:"Adanali2018",
    nodemailerEmail:"edummy304@gmail.com",
    url:`http://localhost:${this.server_port}`,
    FACEBOOK_CLIENT_ID:"324612812813427",
    FACEBOOK_CLIENT_SECRET:"2117dc9c69f2b1dcc5c586764a729b0d",
    SESSION_SECRET:"3fgfvhbjnvfjd78vdkfjnvjdfhm89nvd",
    CallBackUrl:`http://localhost:${this.server_port}/api/login/facebook/callback`
};
module.exports = config;
