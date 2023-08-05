import React from 'react'
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { base_url } from '../services/base_url';

function Hometable({ displayData, removeEmployee }) {
    // console.log(displayData);
    return (
        <div className='container mt-5'>
            <Row>
                <div className="col">
                    <h3 className='fw-bold text-center mb-3'>All Employee List</h3>
                    <Card className='shadow'>
                        <Table>
                            <thead>
                                <tr className='table-primary rounded'>
                                    <th>No</th>
                                    <th>Employee Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Status</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    displayData.length > 0 ? displayData.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.fname} {item.lname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>
                                                <span className={item.status === 'Active' ? "btn btn-primary" : "btn btn-danger"}>{item.status}</span>
                                            </td>
                                            <td>
                                                <img width={'50px'} height={'50px'} src={`${base_url}/uploads/${item.profile}`} alt="profile" />
                                            </td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <Link to={`/view/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}><i class="fa-regular fa-eye text-warning"></i> View</Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Link to={`/edit/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}><i class="fa-solid fa-user-pen text-primary"></i> Edit</Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'black' }}>
                                                            <div onClick={() => removeEmployee(item._id)}><i class="fa-solid fa-trash text-danger me-1"></i> Delete</div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )) :

                                        <div className='text-center p-5 text-danger w-100'>Sorry Nothing to display</div>
                                }
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default Hometable