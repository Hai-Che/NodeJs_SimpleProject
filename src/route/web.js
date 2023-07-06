import express from "express"
import homeController from "../controllers/homeController"

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)


    return app.use('/', router)
}

export default initWebRoute