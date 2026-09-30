import React, { useState, useEffect } from 'react'


import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './SideBar'
// import Toast from '../Layout/Toast'
import Swal from 'sweetalert2'
import { getUser, getToken, errMsg } from '../Utils/helpers'
import axios from 'axios'
import { DataGrid, } from '@mui/x-data-grid'



const ProductReviews = () => {
    const [productId, setProductId] = useState('')
    const [error, setError] = useState('')
    const [listReviews, setListReviews] = useState([])
    const [deleteError, setDeleteError] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    const [user, setUser] = useState(getUser())

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }

    const getProductReviews = async (id) => {
        try {

            const { data } = await axios.get(`${import.meta.env.VITE_API}/reviews?id=${id}`, config)
            setListReviews(data.reviews)

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const deleteReview = async (id, productId) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API}/reviews?id=${id}&productId=${productId}`, config)
            setIsDeleted(data.success)

        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    }

    const deleteReviewHandler = (id) => {
        Swal.fire({
            title: 'Delete Review',
            icon: 'info',
            text: 'Do you want to delete this review',
            confirmButtonText: 'Delete',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReview(id, productId)
            }
        })

    }
    useEffect(() => {
        if (error) {

            setError('')
        }

        if (deleteError) {

            setDeleteError('')
        }

        if (productId !== '') {
            getProductReviews(productId)
        }

        if (isDeleted) {
            errMsg('Review deleted successfully', 'success');
            setIsDeleted(false)
        }
    }, [error, productId, isDeleted, deleteError])

    const submitHandler = (e) => {
        e.preventDefault();
        getProductReviews(productId)
    }

    const columns = [
        {
            field: 'id',
            headerName: 'Review ID',
            flex: 1,
            renderCell: (params) => <span style={{ wordBreak: 'break-all' }}>{params.value}</span>
        },
        {
            field: 'rating',
            headerName: 'Rating',

            width: 130,
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'comment',
            headerName: 'Comment',
            width: 120,
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'user',
            headerName: 'User',
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
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(params.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            )
        }
    ];

    const rows = listReviews.map(review => ({
        id: review._id,
        comment: review.comment,
        rating: review.rating,
        user: review.user,
    }));



    return (
        <>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
                                    </button>
                                </ form>
                            </div>
                        </div>
                        {listReviews && listReviews.length > 0 ? (
                            <DataGrid
                                rows={rows}
                                columns={columns}

                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 25]}
                                disableSelectionOnClick
                                getRowId={(row) => row.id}
                                showToolbar
                            />
                        ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}

export default ProductReviews