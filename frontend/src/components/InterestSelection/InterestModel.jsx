import React, { useState } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

const interestsList = [
  'Astronomy',
  'Astrobiology',
  'Astrophysics',
  'Space Exploration',
  'Cosmology',
];

const InterestSelection = ({ onInterestSelected, isOpen, onRequestClose, userId }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const history = useHistory();
  //const userId = localStorage.getItem('userId');

  const handleInterestChange = (event) => {
    const { options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedInterests(selectedOptions);
  };

  //const history = useHistory();
// 
  const handleSubmit = async (event) => {
    event.preventDefault();
    onInterestSelected(selectedInterests);
  };
  // 

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container className="mt-5">
        <Card className="shadow">
          <CardHeader className="bg-primary text-white">
            <h3>Select Your Interests</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <select
                  className="form-select"
                  multiple
                  value={selectedInterests}
                  onChange={handleInterestChange}
                >
                  {interestsList.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary" type="submit">
                  Submit Interests
                </button>
              </div>
              <Row className="selected-interests-grid mt-3">
                {selectedInterests.map((interest) => (
                  <Col
                    key={interest}
                    xs="6"
                    sm="4"
                    md="3"
                    lg="2"
                    className="mb-3 text-center"
                  >
                    <div
                      className="interest-tile p-2 rounded"
                      style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        border: '1px solid #f5c6cb',
                      }}
                    >
                      {interest}
                    </div>
                  </Col>
                ))}
              </Row>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Modal>
  );
};

export default InterestSelection;
