import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Emsspinner from '../components/Emsspinner';
import { useParams } from 'react-router-dom';
import { viewemployee } from '../services/allApis';
import { base_url } from '../services/base_url';

function View() {

  const { id } = useParams()
  console.log(id);

  const [showspin, setShowspin] = useState(true)

  useEffect(() => {
    viewUser()
    setTimeout(() => {
      setShowspin(false)
    }, 1000);
  }, [])

  const [view, setView] = useState({})

  const viewUser = async () => {
    const { data } = await viewemployee(id)
    setView(data)
  }
  console.log(view);

  return (
    <>
      {
        showspin ? <div style={{ margin: "250px" }}><Emsspinner /></div> :
          <div className="container mt-5">
            <Card className='shadow rounded col-lg-6 mx-auto'>
              <Card.Body>
                <div className="profile d-flex justify-content-center">
                  <img width={'140px'} height={'140px'} src={`${base_url}/uploads/${view.profile}`} alt="profile" />
                </div>
                <div className="text-center mt-3">
                  <h3 className='mb-4'>{view.fname} {view.lname}</h3>
                  <div className='p-2'>
                    <h5><i class="fa-solid fa-envelope"></i> : <span className='ms-1'>{view.email}</span></h5>
                    <h5><i class="fa-solid fa-phone"></i> : <span className='ms-1'>{view.mobile}</span></h5>
                    <h5><i class="fa-solid fa-venus-mars"></i> : <span className='ms-1'>{view.gender}</span></h5>
                    <h5><i class="fa-solid fa-chart-line"></i> : <span className='ms-1'>{view.status}</span></h5>
                    <h5><i class="fa-solid fa-location-dot"></i> : <span className='ms-1'>{view.location}</span></h5>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
      }
    </>
  )
}

export default View