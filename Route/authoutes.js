

const express = require("express")
const { handleLogin, handleResetPassword, welcome, handleForgotPassword, handleAllUsers, handleUserRegistration } = require("../controller")
const { validateRegistration } = require("../middleware")

const router = express.Router()


router.post("/login", handleLogin)

router.post("/forgot-password", handleForgotPassword)

router.patch("/reset-password", handleResetPassword)

router.get("/all-users", handleAllUsers)

router.post("/sign-up", validateRegistration, handleUserRegistration)

router.get("/", welcome)
