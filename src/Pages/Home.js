import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Emsspinner from '../components/Emsspinner'
import { deleteContext, registerContext, updateContext } from '../components/ContextShare'
import { allemployees, deleteEmployee } from '../services/allApis'

function Home() {

  const { updateData, setUpdateData } = useContext(updateContext)
  const { deleteData, setDeleteData } = useContext(deleteContext)
  const [search, setSearch] = useState("")
  // console.log(search);
  const { registerData, setRegisterData } = useContext(registerContext)
  const navigate = useNavigate()
  const [showspin, setShowspin] = useState(true)
  const adduser = () => {
    navigate("/register")
  }

  useEffect(() => {
    getallusers()
    setTimeout(() => {
      setShowspin(false)
    }, 1000);
  }, [search])

  const [users, setUsers] = useState([])

  const getallusers = async () => {
    const result = await allemployees(search)
    setUsers(result.data)
  }
  // console.log(users);

  // delete user
  const removeEmployee = async (id) => {
    const response = await deleteEmployee(id)
    console.log(response);
    if (response.status === 200) {
      setDeleteData(response.data)
      getallusers()
    } else {
      console.log("Error : ", response);
    }
  }

  
  return (

    <>
      {
        registerData ? <Alert variant="success" onClose={() => setRegisterData("")} dismissible>
          {registerData.fname.toUpperCase()} Successfully Registered
        </Alert> : ""
      }
      {
        deleteData ? <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {deleteData.fname.toUpperCase()} Successfully Deleted
        </Alert> : ""
      }
      {
        updateData ? <Alert variant="success" onClose={() => setUpdateData("")} dismissible>
          {updateData.fname.toUpperCase()} Successfully Updated
        </Alert> : ""
      }
      <div className='container mt-5'>
        <div style={{ marginTop: "70px" }} className="main-div">
          <div className="search-add d-flex justify-content-between">
            <div className="search col-md-4">
              <Form className='d-flex'>
                <Form.Control type="TEXT" placeholder="Search" className='me-2' onChange={e => setSearch(e.target.value)} />
                <Button className='btn btn-success'>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
              </Form>
            </div>
            <div className="add-btn">
              <Button onClick={adduser} className='btn btn-info'>
                <i class="fa-solid fa-user-plus"></i> Add
              </Button>
            </div>
          </div>
          <div className="table-div mt-5">
            {
              showspin ?
                <div style={{ margin: "180px" }}><Emsspinner /></div> :
                <Hometable displayData={users} removeEmployee={removeEmployee} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home