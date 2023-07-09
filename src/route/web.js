import express from "express"
import homeController from "../controllers/homeController"

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.get('/update/user/:id', homeController.updateUserPage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user', homeController.updateUser)
    return app.use('/', router)
}

export default initWebRoute