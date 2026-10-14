import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './SideBar'

// import axios from 'axios';
// import { getToken, errMsg, successMsg } from '../Utils/helpers';
import { DataGrid, } from '@mui/x-data-grid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'


const UsersList = () => {
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)
    const errMsg = (message = '') => toast.error(message, {
        position: 'bottom-right'
    });
    const successMsg = (message = '') => toast.success(message, {
        position: 'bottom-right'
    });
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    // const [allUsers, setAllUsers] = useState([])
    // const [isDeleted, setIsDeleted] = useState('')
    let navigate = useNavigate();
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${getToken()}`
    //     }
    // }
    // const listUsers = async () => {
    //     try {

    //         const { data } = await axios.get(`${import.meta.env.VITE_API}/admin/users`, config)
    //         setAllUsers(data.users)
    //         setLoading(false)

    //     } catch (error) {
    //         setError(error.response.data.message)

    //     }
    // }
    // const deleteUser = async (id) => {
    //     try {
    //         const { data } = await axios.delete(`${import.meta.env.VITE_API}/admin/user/${id}`, config)
    //         setIsDeleted(data.success)
    //         setLoading(false)

    //     } catch (error) {
    //         setError(error.response.data.message)

    //     }
    // }

    // useEffect(() => {
    //     listUsers();
    //     if (error) {
    //         errMsg(error);
    //         setError('')
    //     }
    //     if (isDeleted) {
    //         successMsg('User deleted successfully');
    //         navigate('/admin/users');

    //     }

    // }, [error, isDeleted,])

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            errMsg(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            successMsg('User deleted successfully');
            // navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, error, isDeleted, navigate])


    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const columns = [
        {
            field: 'id',
            headerName: 'User ID',
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
            field: 'email',
            headerName: 'Email',
            width: 120,
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: 'role',
            headerName: 'Role',
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
                    <Link to={`/admin/user/${params.id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(params.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            )
        }
    ];
    const rows = users.map(user => ({
        id: user._id,
        name: user.name,

        email: user.email,
        role: user.role,
    }));

    return (
        <>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Users</h1>
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

export default UsersList

