import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getToken } from '../Utils/helpers'

const OrderDetails = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [order, setOrder] = useState({})

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    let { id } = useParams();

    const getOrderDetails = async (id) => {
        try {

            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`${import.meta.env.VITE_API}/order/${id}`, config)
            console.log(data)
            setOrder(data.order)

            setLoading(false)


        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        getOrderDetails(id)

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }, [error, id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {order._id}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user && user.name}</p>
                            <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default OrderDetails