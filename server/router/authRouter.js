const Router = require("express")
const router = new Router()
const controller = require("../controllers/authController")
const {body} = require("express-validator")

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min:4, max:15})
    ,controller.registration)
router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.get("/activate/:link", controller.activate)
router.get("/refresh", controller.refresh)
router.get("/users", controller.getUsers)

module.exports = router