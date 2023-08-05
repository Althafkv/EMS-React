import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import Emsspinner from '../components/Emsspinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { registerContext } from '../components/ContextShare';

function Register() {

  const { registerData, setRegisterData } = useContext(registerContext)

  const navigate = useNavigate()

  // state hold all normal user inputs
  const [normalInput, setNormalInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  // to update state of normalInput
  const setUserInput = (e) => {
    const { name, value } = e.target
    setNormalInput({ ...normalInput, [name]: value })
  }
  // console.log(normalInput);

  // state to hold status
  const [status, setStatus] = useState("")

  const setStatusValue = (e) => {
    setStatus(e.value);
  }
  // console.log(status);

  // state to hold image
  const [image, setImage] = useState("")

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  }
  // console.log(image);

  // state to hold preview image
  const [preview, setPreview] = useState("")

  // console.log(preview);

  const [showspin, setShowspin] = useState(true)

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowspin(false)
    }, 1000);
  }, [image])

  const handleRegister = async (e) => {
    e.preventDefault()
    const { fname, lname, email, mobile, gender, location } = normalInput
    if (!fname || !lname || !email || !mobile || !gender || !status || !image || !location) {
      toast.error("Please Fill the form completly")
    } else {
      // toast.success("Success")
      // body
      const data = new FormData()
      data.append("user_profile", image)
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("location", location)
      data.append("status", status)
      // header
      const headerConfig = {
        "Content-Type": "multipart/form-data"
      }
      // make api call
      const response = await register(data, headerConfig)
      console.log(response);
      if (response.status === 200) {
        // reset all form inputs
        setNormalInput({
          ...normalInput,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        })
        setStatus("")
        setImage("")
        // share server response to home page via context api
        setRegisterData(response.data)
        // navigate to home page
        navigate('/')
      } else {
        if (response) {
          toast.warning(response.response.data)
        }
      }

    }
  }

  return (
    <>
      {
        showspin ? <div style={{ margin: "250px" }}><Emsspinner /></div> :
          <div className="d-flex justify-content-center">
            <div className="container mt-3">
              <h2 className="text-center mt-3">Register Employee Details</h2>
              <Card className='shadow rounded mt-4 p-3'>
                <div className="text-center mb-3">
                  <img width={'70px'} height={'70px'} src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"} alt="profile" />
                </div>
                <Form>
                  <Row>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name='fname'
                        placeholder="First Name"
                        value={normalInput.fname}
                        onChange={setUserInput}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name='lname'
                        placeholder="Last Name"
                        value={normalInput.lname}
                        onChange={setUserInput}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicemail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name='email'
                        placeholder="Email Address"
                        value={normalInput.email}
                        onChange={setUserInput}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name='mobile'
                        placeholder="Mobile Number"
                        value={normalInput.mobile}
                        onChange={setUserInput}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
                      <Form.Label>Select Gender</Form.Label>
                      <Form.Check type="radio"
                        label={'Male'}
                        name="gender"
                        value={'Male'}
                        aria-label="radio 1"
                        onChange={setUserInput}
                      />
                      <Form.Check type="radio"
                        label={'Female'}
                        name="gender"
                        value={'Female'}
                        aria-label="radio 2"
                        onChange={setUserInput}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
                      <Form.Label>Select Employee Status</Form.Label>
                      <Select options={options} onChange={setStatusValue} ></Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicprofile">
                      <Form.Label>Choose Profile Picture</Form.Label>
                      <Form.Control type="file" name='user_profile' onChange={setProfile} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclocation">
                      <Form.Label>Employee Location</Form.Label>
                      <Form.Control
                        type="text"
                        name='location'
                        placeholder="Employee Location"
                        value={normalInput.location}
                        onChange={setUserInput}
                      />
                    </Form.Group>
                    <div className='text-center p-3'>
                      <Button onClick={handleRegister} className='mt-2 w-25' variant='primary'>Register</Button>
                    </div>
                  </Row>
                </Form>
              </Card>
            </div>
          </div>
      }
      <ToastContainer />
    </>
  )
}

export default Register