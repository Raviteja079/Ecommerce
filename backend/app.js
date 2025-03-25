import express from 'express'
import product from "./routes/productRoutes.js"
import errorHandleMiddleware from './middleware/error.js'

const app = express()

//Middleware
app.use(express.json())

//Routes
app.use("/api/v1", product)

app.use(errorHandleMiddleware)

export default app;