import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, CreatePost } from "./pages"
import { Header, Footer } from "./Components"
const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-post" element={<CreatePost />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
export default App
