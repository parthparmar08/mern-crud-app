const express = require('express');
const jwt = require("jsonwebtoken");
const routes = express.Router();
const JWT_SECRET = "secretkey"

const { display1, display2, display3, insert1, update1, delete1, aggregate1, aggregate2,aggregate3,aggregate4,login1 } = require("../controllers/empControllers");
const Emp = require('../models/Emp');

//Login Check Middleware function 
async function checkAuth(req, res, next) {
    try {
        const token = req.headers["key1"];
        if (!token) {
            console.log("token not found");
        }
        const decoded = await jwt.verify(token, JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Auth failed" });
    }
}


//Role Check Middleware
async function checkRole(req, res, next) {
    try {
        //console.log(req.userData);
        data = await Emp.findById({ _id: req.userData.id });
        //console.log(data.role);
        if (data.role == 'admin') {
            next();
            // next() -It will run or execute the code after all the middleware function is finished.
        } else if (data.role == 'employee') {
            if (req.url == '/display') {
                next();
            } else {
                return res.json({ message: "You do not have permission to access this route" })
            }
        } else {
            return res.json({ message: "You do not have permission to access this route" })
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const data = await Emp.findById({ _id: req.userData.id });
        if (data.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ message: "You are Not Admin So You Don't Access this Route" });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

const checkEmployee = async (req, res, next) => {
    try {
        const data = await Emp.findById({ _id: req.userData.id });
        if (data.role === 'employee') {
            next();
        } else {
            return res.status(401).json({ message: "You are Employee So You Don't Aceess this Route" });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

routes.get('/display',display1)
routes.get('/displaybyid',display2)
routes.get('/displaybyname',display3)
routes.post('/insert',insert1)
routes.put('/update',update1)
routes.delete('/delete',delete1)
routes.post('/login', login1)


// routes.post('/insert', checkAuth, checkAdmin, insert1)
// routes.put('/update/:id', checkAuth, checkAdmin, update1)
// routes.delete('/delete/:id', checkAuth, checkAdmin, delete1)


//Aggregation
routes.post('/agg1', aggregate1)
routes.get('/agg2', aggregate2)
routes.get('/agg3', aggregate3)
routes.get('/agg4', aggregate4)

module.exports = routes;
