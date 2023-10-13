import React, { useEffect, useState } from 'react'
import Layout from '../component/layout'
import axios from 'axios'
import { Users } from '../types/user'

const Home: React.FC = () => {
    const [users, setUsers] = useState<Users[]>([])


    useEffect(() => {
        axios.get('http://127.0.0.1:3000/users/')
            .then(function (response) {
                console.log(response.data.data)
                setUsers(response.data.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])


    const HandlerClickDelete = (nim: number) => {
        axios.delete(`http://127.0.0.1:3000/users/${nim}`)
            .then(() => {
                // Penghapusan berhasil dan atur ulang data pengguna
                setUsers((prevUsers) => prevUsers.filter((user) => user.nim !== nim));
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <Layout>
            <div className="w-full h-fit ">
                <div className="overflow-x-auto px-10 flex ">
                    <table className="overflow-y-scroll table table-zebra mx-auto rounded-t-none rounded-b-xl w-fit min-w-[1000px] shadow-md mb-10 ">
                        {/* head */}
                        <thead className='font-semibold border-b-2 border-black text-xl' >
                            <tr>
                                <th>Nim</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-scroll'>
                            {users.map((user: Users, index: number) => {
                                return (
                                    <tr key={index}>
                                        <th>{user.nim}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className='gap-3 flex flex-row'>
                                            <button className='btn btn-success'>Edit</button>
                                            <button className='btn btn-error' onClick={(e) => {
                                                e.preventDefault();
                                                window.confirm(`yakin nih hapus ${user.name} dari data?`) &&
                                                    HandlerClickDelete(user.nim);

                                            }
                                            }>Delete</button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Home