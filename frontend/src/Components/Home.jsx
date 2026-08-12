import React, { useState, useEffect } from 'react'
import Product from './Product/Product'
// import products from '../products.json'
import MetaData from './Layout/MetaData'
import axios from 'axios'
const Home = () => {
    // console.log(products)
    const [products, setProducts] = useState([])

    const getProducts = async () => {

        let link = `http://localhost:4001/api/v1/products`

        let res = await axios.get(link)
        console.log(res.data.products)
        setProducts(res.data.products)

        // setLoading(false)
    }
    // getProducts()
    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <MetaData title={'shop Here'} />

            <div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            // <Product key={product._id} product={product} />
                            <Product product={product} />


                        ))}
                    </div>
                </section>
            </div>




        </>
    )
}

export default Home