const express = require('express')

const router = express.Router()

let expenses = [
    {
        id: 1,
        title: "Картон 5 листов 50x50",
        amount: 200,
        paid: true,
    },
    {
        id: 2,
        title: "Блендер",
        amount: 4000,
        paid: false,
    },
]

router.get("/", (req,res) => {
    res.json(expenses)
})

router.post("/",(req,res)=>{
    const {title} = req.body

    const expense = {
        id: Date.now(),
        title: title.trim(),
        done: false
    }

    expenses.push(expense)

    res.status(201).json(expense)
})

router.delete("/:id", (req,res)=>{
    const expense = expenses.find(el => el.id == req.params.id)

    if(!expense)
        return res
            .status(404)
            .json({ error: `Задача с id: ${req.params.id} не была найдена`})
    else
        expenses = expenses.filter(el => el.id != req.params.id)

    res.status(204).end()
})

router.patch("/:id",(req,res)=>{
    const expense = expenses.find(el => el.id == req.params.id)

    if(!expense)
        return res
            .status(404)
            .json({ error: `Задача с id: ${req.params.id} не была найдена`})
    
    const expenseIndex = expenses.findIndex(
        el => el.id == req.params.id
    )

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...req.body}

    res.json(expenses[expenseIndex])
})


router.get("/:id",(req,res)=>{
    const found = expenses.find(
        el => el.id == req.params.id
    )

    if(!found)
        return res
            .status(404)
            .json({ error: `Задача с id: ${req.params.id} не была найдена`})

    res.json(found)
})

module.exports = router