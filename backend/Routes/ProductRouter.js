const express = require("express");
const ensureAuthenticated = require("../Middlewares/Auth"); 

const router = require("express").Router();
router.get("/", ensureAuthenticated, (req, res) => {
    console.log(" -- - -- - - -- logged in user -- - -- - - -- ", req.user);
    res.status(200).json([
        {
            name:"mobile",
            price: 10000
        },
        {
            shadi:"ABHISEK",
            price: 100
        }
    ])
});

module.exports = router;