/* const getCookie = (name) => {
    let value = `; ${document.cookie}`
    let parts = value.split(`; ${name}=`)
    if(parts.length === 2) return parts.pop().split(';').shift()
}

const sendRequest = async () => {
    const token = getCookie('token')
    const response = await fetch('/', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()
} */

const handleRouteCart = async () => {
    const req = await fetch(`http://localhost:8080/api/cart`, {
        method: 'POST',
    })
    window.location = `${req.url}`
}
const handleAddCartProduct = async (id) => {
    const res = await fetch(`http://localhost:8080/api/cart/${id}/products`,{
        method: 'POST',
    })
}
const handleDeleteCartProduct = async (id, idProd) => {
    const res = await fetch(`http://localhost:8080/api/cart/${id}/products/${idProd}`,{
        method: 'DELETE',
    })
    window.location.reload()
}
const handleDeleteCart = async (id) => {
    const res = await fetch(`http://localhost:8080/api/cart/${id}`,{
        method: 'DELETE',
    })
    window.location = `http://localhost:8080/api/products`
}
const handleBuyCart = async () =>{
    const req = await fetch(`http://localhost:8080/api/cart/buy`)
}