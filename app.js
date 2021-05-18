const { response } = require('express');
const express = require('express');
const app = express();
require ('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');

// Middleware for env variables
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated()? 'Logged in' : 'Logged out');
})

app.get("/profile", requiresAuth(), (req, res) =>{
    res.send(JSON.stringify(req.oidc.user));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
