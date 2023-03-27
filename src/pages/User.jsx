import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import EditUser from "../components/EditUser"
import Loader from "../components/Loader"
import ErrorDisplay from "./ErrorDisplay"

export default function User() {
    const user = useSelector((state) => state.user)
    const userToken = useSelector(state => state.auth.userToken)
    const navigate = useNavigate()

    useEffect(() => {
        // if no user token is found in the store, then go to the login page
        if (!userToken) {
            navigate('/login')
        }
    }, [userToken, navigate])

    return (
        <React.Fragment>
            {user.error ?
                <ErrorDisplay /> :
                <main className="main bg-dark">
                    {user.status === 'fetching' || user.status === 'updating' ?
                        <Loader /> :
                        <React.Fragment>
                            <div className="user-header">
                                <h1>Welcome back<br />{user.firstName + ' ' + user.lastName}!</h1>
                                <EditUser />
                            </div>
                            <h2 className="sr-only">Accounts</h2>
                            <section className="account">
                                <div className="account-content-wrapper">
                                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                                    <p className="account-amount">$2,082.79</p>
                                    <p className="account-amount-description">Available Balance</p>
                                </div>
                                <div className="account-content-wrapper cta">
                                    <button className="user-transaction-button">View transactions</button>
                                </div>
                            </section>
                            <section className="account">
                                <div className="account-content-wrapper">
                                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                                    <p className="account-amount">$10,928.42</p>
                                    <p className="account-amount-description">Available Balance</p>
                                </div>
                                <div className="account-content-wrapper cta">
                                    <button className="user-transaction-button">View transactions</button>
                                </div>
                            </section>
                            <section className="account">
                                <div className="account-content-wrapper">
                                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                                    <p className="account-amount">$184.30</p>
                                    <p className="account-amount-description">Current Balance</p>
                                </div>
                                <div className="account-content-wrapper cta">
                                    <button className="user-transaction-button">View transactions</button>
                                </div>
                            </section>
                        </React.Fragment>
                    }
                </main>
            }
        </React.Fragment>
    )
}