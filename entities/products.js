let products = [{
    id: 100,
    description: "Milanesa",
    price: "100",
    image: "urlImage"
},
{
    id: 101,
    description: "Ensalada",
    price: "200",
    image: "urlImage"
},
{
    id: 102,
    description: "Tarta",
    price: "50",
    image: "urlImage"
},
{
    id: 103,
    description: "Carne",
    price: "180",
    image: "urlImage"
}
]

let favorites = [{
    id:1,
    product_id: 100
},
{
    id:2,
    product_id: 102

},
{
    id:3,
    product_id: 103  
}
]

module.exports.products = products;
module.exports.favorites = favorites;
