

import { getData } from "./api.js"

const header = document.querySelector("header");
const home = document.createElement("a")
home.textContent = "home"
home.id = home
const newStory = document.createElement("a")
newStory.textContent = "new story"
newStory.id = "story"
header.append(home, newStory)

const main = document.createElement("div")
document.body.appendChild(main)

home.addEventListener("click", () => {
    main.innerHTML = ""
    loadData()
})
newStory.addEventListener("click", () => {
    main.innerHTML = ""
    main.className = "mainStory"
    const title = document.createElement("h1")
    title.textContent = "create new story news "
    title.classList.add("newStory")

    const craetTitle = document.createElement("p")

    craetTitle.textContent = "title"
    const txtTitle = document.createElement("input")
    txtTitle.className = "inputTitle"
    txtTitle.type = "text"

    const author = document.createElement("input")
    author.type = "text"

    const file = document.createElement("input")
    file.type = "text"
    file.placeholder = "enter image URL"

    const titleDescription = document.createElement("p")
    titleDescription.textContent = "Description"
    const Description = document.createElement("textarea")
    Description.className = "Description"

    const saveBtn = document.createElement("button")
    saveBtn.classList.add("button")
    saveBtn.textContent = "Save Story"

    saveBtn.addEventListener("click", () => {
        const newStoryObj = {
            title: txtTitle.value,
            description: Description.value,
            image: file.value
        }

        const stories = JSON.parse(localStorage.getItem("news"))
        stories.articles.push(newStoryObj)
        localStorage.setItem("news", JSON.stringify(stories))

        alert("הכתבה נשמרה בהצלחה!")
    })
        main.append(title, craetTitle, txtTitle, file, titleDescription, Description,saveBtn)
    })

    function creatCard(title, nameReport, pic, txt) {

        main.className = "main"
        const div = document.createElement("div")
        div.classList.add("card")

        const titles = document.createElement("a")
        titles.textContent = title

        const reporter = document.createElement("p")
        reporter.textContent = `author: ${nameReport}`
        reporter.classList.add("report")

        const image = document.createElement("img")
        image.src = pic

        div.append(titles, reporter, image);
        main.appendChild(div)

        div.addEventListener("click", () => {
            main.innerHTML = ""
            creatpege(title, pic, txt)
        })
    }

    async function loadData() {
        const data = await getData()
        data.articles.forEach(article => {
            creatCard(
                article.title,
                article.author,
                article.urlToImage,
                article.description

            )
        });
    }
    loadData()




    function creatpege(title, pic, txt) {
        const newDiv = document.createElement("div")
        const titles = document.createElement("h1")
        titles.textContent = title

        const image = document.createElement("img")
        image.src = pic

        const text = document.createElement("p")
        text.textContent = txt

        main.className = "newMain"

        newDiv.className = "newCard"

        image.className = "newPic"
        titles.className = "newTitle"
        text.className = "text"

        newDiv.append(titles, image, text)
        main.appendChild(newDiv)
    }

