import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/MetaData'

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../Utils/helpers';

const Profile = () => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})


    const getProfile = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        try {
            const { data } = await axios.get(`http://localhost:4001/api/v1/me`, config)
            console.log(data.user)
            setUser(data.user)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("invalid user or password", {
                position: 'bottom-center'
            })
        }

    }

    useEffect(() => {

        getProfile()

    }, [])
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Your Profile'} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar ? user.avatar.url : null} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile