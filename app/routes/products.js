const express = require('express')

const router = express.Router()

let products = [
    {
        id: 1,
        title: "Картон 5 листов 50x50",
        price: 200,
        inStock: true,
    },
    {
        id: 2,
        title: "Блендер",
        price: 4000,
        inStock: false,
    },
]

router.get("/", (req,res) => {
    res.json(products)
})

router.post("/",(req,res)=>{
    const {title} = req.body

    const product = {
        id: Date.now(),
        title: title.trim(),
        done: false
    }

    products.push(product)

    res.status(201).json(product)
})

router.delete("/:id", (req,res)=>{
    const product = products.find(el => el.id == req.params.id)

    if(!product)
        return res
            .status(404)
            .json({ error: `Задача с id: ${req.params.id} не была найдена`})
    else
        products = products.filter(el => el.id != req.params.id)

    res.status(204).end()
})

router.patch("/:id",(req,res)=>{
    const product = products.find(el => el.id == req.params.id)

    if(!product)
        return res
            .status(404)
            .json({ error: `Задача с id: ${req.params.id} не была найдена`})
    
    const productIndex = products.findIndex(
        el => el.id == req.params.id
    )

    products[productIndex] = { ...products[productIndex], ...req.body}

    res.json(products[productIndex])
})


router.get("/:id",(req,res)=>{
    const found = products.find(
        el => el.id == req.params.id
    )

    if(!found)
        return res
            .status(404)
            .json({ error: `Задача с id: ${req.params.id} не была найдена`})

    res.json(found)
})

module.exports = router