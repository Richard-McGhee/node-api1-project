const express = require("express")
const shortid = require("shortid")

const server = express()
server.use(express.json())

const users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    }
]

server.get("/", (req, res) => {
    res.status(200).json({ hello: "Server is Running" })
})

server.get("/api/users", (req, res) => {
    res.status(200).json({ data: users })
})

server.post("/api/users", (req, res) => {
    const { name, bio } = req.body
    if(!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(name && bio){
        users.push({
            id: shortid.generate(),
            name,
            bio,
        })
        res.status(201).json({ data: users })
    } else{
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

const port = 666
server.listen(port, () => console.log("Server is Running"))