import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


router.route("/").get((req, res) => {
    res.send("hello from Dalleee")
})

router.route("/").post(async (req, res) => {
    try{
        const { prompt } = req.body;
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo: image});

    } catch (err) {
        console.log("There is a error shivam", err)
        res.status(500).send(err?.response.data.error.message);
    }
})

export default router;