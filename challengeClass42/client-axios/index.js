import axios from "axios"

const resolver = (condition) => condition ? 'status: GOOD' : 'status: FAIL'

const productsTest = async () => {
    const login = await axios({
        method: 'post',
        url: 'http://localhost:8080/auth/login',
        data: {
            username: "ezequielbibee.dev@gmail.com",
            password: "123",
        }
    })

    console.log('       >>>>>> GET "/api/products/?id <<<<<<\n')
    
    console.log('If you not put id in your request, you get all users')
    const request = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/products',
        headers: {
            'Authorization': `Bearer ${login.data.token}`
        }
    })
    const response = request.data
    console.log(`   + Should return an array :::::: ${resolver(Array.isArray(response))}`)
    console.log(`   + Should return an Array with 4 products :::::: ${resolver(response.length === 4)}\n`)

    console.log('If you put id in your request, you get one product object')
    const request2 = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/products/64636077b9b1d3648a4477fc',
        headers: {
            'Authorization': `Bearer ${login.data.token}`
        }
    })
    const response2 = request2.data
    console.log(`   + Should return a object :::::: ${resolver(typeof(response2) === 'object')}\n`)

    console.log('       >>>>>> POST "/api/products <<<<<< \n')

    console.log('if you send one product in body on request, a new product is added in list')
    const request3 = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/products',
        headers: {
            'Authorization': `Bearer ${login.data.token}`
        },
        data: {
            "prodName": "motito piola",
            "description": "Motomami",
            "code": 112233,
            "price": 140000,
            "photo": "https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/e/d/edge30-plata-frente.png",
            "stock": 5
        }
    })
    const response3 = request3.data
    console.log(typeof(response3.data))
    console.log(`   + Should added return a object :::::: ${resolver(typeof(response3) === 'object')}`)
    console.log(`   + Should status 200 :::::: ${resolver(request3.status === 200)}\n`)

    console.log('       >>>>>> PUT "/api/products/:id <<<<<<\n')

    console.log('If you put id in a request, it product is modified')
    const { prodName, description, code, price, photo, stock, _id } = response3.data
    const request4 = await axios({
        method: 'put',
        url: `http://localhost:8080/api/products/${_id}`,
        headers: {
            'Authorization': `Bearer ${login.data.token}`
        },
        data: { prodName, description, code, price, photo, stock }
    })
    const response4 = request4.data
    console.log(`   +Should return a object actualizated :::::: ${resolver(typeof(response4) === 'object')}`)
    console.log(`   +Should return status 200 :::::: ${resolver(request4.status === 200)} \n`)
 
    console.log(`       >>>>>> DELETE "/api/products/:id <<<<<<\n`)
    console.log('If you put id in a request, it product is deleted')
    const request5 = await axios({
        method: 'delete',
        url: `http://localhost:8080/api/products/${_id}`,
        headers: {
            'Authorization': `Bearer ${login.data.token}`
        },
    })
    console.log(`   +Should return status code 200 :::::: ${resolver(request5.status === 200)}`)

} 

productsTest()