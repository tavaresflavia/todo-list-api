const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const dataUrl = "./data/todoList.json"

function readList() {
    const todoListData = fs.readFileSync(dataUrl);
    return JSON.parse(todoListData);
}

function writeList(newTodoListData) {
    fs.writeFileSync(dataUrl, JSON.stringify(newTodoListData));
}

router.route("/")
    .get((req, res) => {
        const currentList = readList();
        res.json(currentList);
    })

    .post((req, res) => {
        const currentList = readList();
        const {title, priority, dueDate, isFun} = req.body;
        if (!title || !priority || !dueDate) {
            return res.status(400);
        }

        const newListItem = {
            id: uuid(),
            title: title,
            priority: priority,
            dueDate: dueDate,
            isFun: isFun
        }
        currentList.push(newListItem);
        writeList(currentList);
        res.status(204).send("Done!");
    })

router.route("/:id")
    .delete((req, res) => {
        const taskId = req.params.id;
        const currentList = readList();
        const newList = currentList.filter( (el) => el.id !== taskId);
        writeList(newList);
        res.status(200).send();
    })

module.exports = router;