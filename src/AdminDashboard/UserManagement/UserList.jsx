import React from 'react';
import { useGetusersQuery, useUpdateUserRoleMutation } from '../../redux/api/baseApi';
import { Link } from 'react-router-dom';

const UserList = () => {

    const { data: userList, isLoading } = useGetusersQuery()
    const [makeAdmin, { data: updateStauts, isLoading: updateLoading }] = useUpdateUserRoleMutation()
    const elements = Array.from({ length: 7 });


    const handleMakeAdmin = (email) => {
        console.log(email, "email")
        makeAdmin({ email })
    }
    console.log(userList)
    return (
        <div>
            <div>

                {isLoading ? elements?.map((_, index) => (
                    <div key={index} className="grid my-10  grid-cols-9 font-medium ">
                        <div className="skeleton w-10 h-10 "></div>
                        <h1 className="skeleton w-52 h-6 rounded-sm col-span-3"></h1>

                        <h1 className="col-span-3 skeleton w-32 h-6 rounded-sm"></h1>
                        <div className="col-span-2">
                            <h1 className="skeleton w-36 h-10"></h1>
                        </div>
                    </div>
                )) : ""}
                <div className="">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead hidden={isLoading}>
                                <tr>
                                    <th>Index</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    userList?.map((item, index) => <tr>
                                        <th>{index + 1}</th>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td onClick={() => handleMakeAdmin(item?.email)} title='click to make admin'> <button className='btn btn-primary max-w-48 px-2 w-full btn-md border-none outline-none rounded-md bg-primary  ' >{updateLoading ? "Making Admin ..." : item?.role || "Make Admin"}</button></td>
                                    </tr>)
                                }

                                {/* row 3 */}

                            </tbody>
                        </table>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default UserList;