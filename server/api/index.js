import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

import connectDB from "../database/connect.js"
import postRoutes from "../routes/postRoutes.js"
import dalleRoutes from "../routes/dalleRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)

app.get("/", async (req, res) => {
    res.send("hello from Closed AI")
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(3000, () => console.log("Server has started at port 3000"))
    } catch (err) {
        console.log("There is a error shivam", err)
    }
}
startServer()
