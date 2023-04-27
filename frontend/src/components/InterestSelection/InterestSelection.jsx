import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import axios from "axios";

const InterestSelection = () => {
  const [userInterests, setUserInterests] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchUserInterests = async () => {
    try {
      const response = await axios.get(`https://virtual-sky-servers-dkix.vercel.app/api/users/${userId}/interests`);
      console.log("API response data:", response.data); // Debug line
      setUserInterests(response.data);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };
  

  useEffect(() => {
    fetchUserInterests();
  }, []);

  useEffect(() => {
    console.log("Updated userInterests:", userInterests); // Debug line
  }, [userInterests]);

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <CardHeader className="bg-primary text-white">
          <h3>Your Interests</h3>
        </CardHeader>
        <CardBody>
          <Row className="selected-interests-grid mt-3">
            {userInterests.map((interest) => (
              <Col
                key={interest._id}
                xs="6"
                sm="4"
                md="3"
                lg="2"
                className="mb-3 text-center"
              >
                <div className="interest-tile p-2 rounded" style={{ backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
                  {interest.interest}
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default InterestSelection;
