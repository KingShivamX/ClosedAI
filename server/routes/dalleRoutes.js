import express from "express"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

router.route("/").get((req, res) => {
    res.send("hello from Dalleee")
})

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        })
        if (aiResponse.data && aiResponse.data.length > 0) {
            const image = aiResponse.data[0].b64_json
            res.status(200).json({ photo: image })
        } else {
            res.status(500).json({ error: "Image generation failed." })
        }
    } catch (err) {
        console.log("There is an error, Shivam", err)
        res.status(500).send(
            err?.response?.data?.error?.message ||
                "An error occurred while generating the image."
        )
    }
})

export default router
