import React, { useState, useEffect } from "react"
import { Loader, Cards, FormField } from "../Components"

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data
            .filter((post) => post)
            .map((post) => <Cards key={post._id} {...post} />)
    }

    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-lx uppercase">
            {title}
        </h2>
    )
}

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const [searchTimeout, setSearchTimeout] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)

            try {
                const response = await fetch(
                    "http://localhost:3000/api/v1/post",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                if (response.ok) {
                    const result = await response.json()
                    setAllPosts(result.data.reverse())
                }
            } catch (err) {
                alert(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [])

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPosts.filter(
                    (item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        item.prompt
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                )
                setSearchResult(searchResult)
            }, 500)
        )
    }

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[28px] sm:text-[32px]">
                    The Wacky Gallery
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Dive into a world of whimsical and hilarious images brought
                    to life by Closed AI. Prepare to laugh, gasp, and wonder at
                    the creativity on display!
                </p>
            </div>

            <div className="mt-8 mb-6">
                <FormField
                    lableName="Search posts"
                    type="text"
                    name="text"
                    placeholder="Search posts"
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className="-scroll-mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className="font-medium  text-[#666e75] text-xl mb-3">
                                Showing results for{" "}
                                <span className="text-[#222328]">
                                    {searchText}
                                </span>
                            </h2>
                        )}
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 grid-cols-1 gap-3">
                            {searchText ? (
                                <RenderCards
                                    data={searchResult}
                                    title="No search results found"
                                />
                            ) : (
                                <RenderCards
                                    data={allPosts}
                                    title="No posts found"
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Home
