
export async function getData() {
    const storage = localStorage.getItem("news")
    if (storage) {
        return JSON.parse(storage)
    }
    else {
        const data = await fetch(`https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey=${config.api}`)
        const result = await data.json()

        localStorage.setItem("news", JSON.stringify(result))
        return result
    }
}