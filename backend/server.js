import app from './app.js'
import dotenv from 'dotenv'
import { connectMongoDatabase } from './config/db.js';

dotenv.config({path: 'backend/config/config.env'})
connectMongoDatabase()

process.on('uncaughtException', (err)=>{
    console.log(`Error :${err.message}`)
    console.log(`Server is shutting down due to uncaught exception errors`)
    process.exit(1)
})

const port = process.env.PORT || 3000;


// app.get("/api/v1/products", getAllProducts)
// app.post("/api/v1/products", createProduct)


const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})



process.on('unhandledRejection', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log('server is shutting down due to unhandled promise rejection')
    server.close(()=>{
        process.exit(1)
    })
})

