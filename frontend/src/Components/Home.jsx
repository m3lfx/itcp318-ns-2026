import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Product from './Product/Product'
// import products from '../products.json'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MetaData from './Layout/MetaData'
import Loader from './Layout/Loader';
import axios from 'axios'
const Home = () => {
    // console.log(products)
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState([1, 1000]);
    const [loading, setLoading] = useState(true)
    let { keyword } = useParams();



    const getProducts = async (keyword = '', price) => {

        let link = `http://localhost:4001/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        // http://localhost:4001/api/v1/products?keyword=''
        // http://localhost:4001/api/v1/products?keyword=adid&price[gte]=100&price[lte]=1000
        let res = await axios.get(link)
        console.log(res.data.products)
        setProducts(res.data.products)
        setLoading(false)
    }

    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };

    function valuetext(price) {
        return `P${price.toString()}`;
    }
    // getProducts()
    useEffect(() => {
        getProducts(keyword, price)
    }, [keyword, price]);

    return (
        <>
            <MetaData title={'shop Here'} />
            {loading ? <Loader /> : (<div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    {/* <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                            // <Product product={product} />


                        ))}
                    </div> */}
                    <div className="row">
                        {keyword ? (
                            <>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <Box sx={{ width: 150 }}>
                                        <Slider
                                            getAriaLabel={() => 'Price Filter'}
                                            value={price}
                                            onChange={handleChange}
                                            valueLabelDisplay="on"
                                            getAriaValueText={valuetext}
                                            min={1}
                                            max={1000}

                                        />
                                    </Box>
                                    <div className="mt-5">
                                        <h4 className="mb-3">
                                            Categories
                                        </h4>

                                    </div>



                                </div>

                                <div className="col-6 col-md-9">
                                    <div className="row">
                                        {products.map(product => (
                                            <Product key={product._id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            products.map(product => (
                                <Product key={product._id} product={product} />
                            ))
                        )}

                    </div>
                </section>
            </div>)}





        </>
    )
}

export default Home