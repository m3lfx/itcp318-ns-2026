import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './SideBar'
import { getToken } from '../Utils/helpers';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid, } from '@mui/x-data-grid'

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')

    const [loading, setLoading] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)

    let navigate = useNavigate()
    const getAdminProducts = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`${import.meta.env.VITE_API}/admin/products`, config)
            console.log(data)
            setProducts(data.products)
            setLoading(false)
        } catch (error) {

            setError(error.response.data.message)

        }
    }
    useEffect(() => {
        getAdminProducts()

        if (error) {
            toast.error(error, {
                position: 'bottom-right'
            });
        }

        if (deleteError) {
            toast.error(deleteError, {
                position: 'bottom-right'
            });
        }

        if (isDeleted) {
            toast.success('Product deleted successfully', {
                position: 'bottom-right'
            })
            navigate('/admin/products');

        }

    }, [error, deleteError, isDeleted,])

    const deleteProduct = async (id) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.delete(`${import.meta.env.VITE_API}/admin/product/${id}`, config)

            setIsDeleted(data.success)
            setLoading(false)
        } catch (error) {
            setDeleteError(error.response.data.message)

        }
    }
    const deleteProductHandler = (id) => {
        deleteProduct(id)
    }

    const columns = [
        {
            field: 'id',
            headerName: 'Product ID',
            flex: 1,
            renderCell: (params) => <span style={{ wordBreak: 'break-all' }}>{params.value}</span>
        },
        {
            field: 'name',
            headerName: 'Name',

            width: 130,
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 120,
            align: 'right',
            headerAlign: 'right'
        },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (

                <>
                    {console.log(params)}
                    <Link to={`/admin/product/${params.id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(params.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            )
        }
    ];

    const rows = products.map(product => ({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
    }));

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <div style={{ width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}

                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    disableSelectionOnClick
                                    getRowId={(row) => row.id}
                                    showToolbar
                                />
                            </div>
                        )}

                    </>
                </div>
            </div>

        </>
    )
}

export default ProductsList