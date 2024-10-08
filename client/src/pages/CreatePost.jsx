import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { preview, download } from "../assets"
import { getRandomPrompt, downloadImage } from "../utils"
import { FormField, Loader } from "../Components"

const CreatePost = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        prompt: "",
        photo: "",
    })
    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const generatingImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true)
                const response = await fetch(
                    "https://closed-ai-backend.vercel.app/api/v1/dalle",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ prompt: form.prompt }),
                    }
                )

                const data = await response.json()
                setForm({
                    ...form,
                    photo: `data:image/jpeg;base64,${data.photo}`,
                })
            } catch (err) {
                console.log("There is a error shivam", err)
            } finally {
                setGeneratingImg(false)
            }
        } else {
            alert("please enter a prompt")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.prompt && form.photo) {
            setLoading(true)
            try {
                const response = await fetch(
                    "https://closed-ai-backend.vercel.app/api/v1/post",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(form),
                    }
                )
                await response.json()
                navigate("/")
            } catch (err) {
                alert(err)
            } finally {
                setLoading(false)
            }
        } else {
            alert("Please enter a prompt and generate an image")
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({ ...form, prompt: randomPrompt })
    }

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[28px] sm:text-[32px]">
                    Unleash Your Creativity
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Create fun and unique images with Closed AI and share them
                    with everyone!
                </p>
            </div>

            <form className="mt-8 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField
                        lableName="Your name"
                        type="text"
                        name="name"
                        placeholder="Shivam..."
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <FormField
                        lableName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="A photo of a white fur monster standing in a purple room..."
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center">
                        {form.photo ? (
                            <img
                                src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={preview}
                                alt={"preview"}
                                className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                        )}

                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-5">
                    <button
                        type="button"
                        onClick={generatingImage}
                        className="text-white bg-green-700 font-semibold rounded-md text-sm w-full sm:w-auto px-5 py-2"
                    >
                        {generatingImg ? "Generating..." : "Generate"}
                    </button>
                    {form.photo && (
                        <button
                            type="button"
                            onClick={() => downloadImage(form._id, form.photo)}
                            className="text-black font-semibold bg-[#F9FAFE] rounded-md text-sm w-full sm:w-auto px-3 py-2 border border-[#666e75] box-border"
                        >
                            Download Image
                        </button>
                    )}
                </div>

                <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px] ">
                        Once you have created the image, you can share it with
                        others in the wacky community gallery.
                    </p>
                    <button
                        type="submit"
                        className="mt-3 font-semibold text-white bg-[#FFAE00] rounded-md text-sm w-full sm:w-auto px-5 py-2"
                    >
                        {loading
                            ? "Sharing..."
                            : "Share with the wacky community"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost
