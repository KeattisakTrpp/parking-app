import { Router } from "express"
import * as userController from '../controllers/user.controller'

export const userRouter = Router()

userRouter.route('/').get(userController.getAll)
userRouter.route('/signup').post(userController.create)
userRouter.route('/book').post(userController.book)
userRouter.route('/login').post(userController.login)
userRouter.route('/park').get(userController.getPark)
userRouter.route('/park/:date').get(userController.getParkByDate)
userRouter.route('/checkin').post(userController.checkIn)
userRouter.route('/checkout').post(userController.checkOut)
userRouter.route('/:id').get(userController.findById)
userRouter.route('/:id/car').post(userController.addCar)
userRouter.route('/confirm/:id').get(userController.verify)
