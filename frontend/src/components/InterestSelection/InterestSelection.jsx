import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import axios from "axios";
import generateCourses from "../../pages/openai";

const InterestSelection = ({ setGeneratedCourseData, setSelectedInterests }) => {
  const [userInterests, setUserInterests] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchUserInterests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/interests`);
      console.log("API response data:", response.data);
      setUserInterests(response.data);
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };

  useEffect(() => {
    fetchUserInterests();
  }, []);

  const createMyCourses = async () => {
    const interests = userInterests.map((interestObj) => interestObj.interest);
    const newGeneratedCourses = await generateCourses(interests);
    setGeneratedCourseData(newGeneratedCourses);
    setSelectedInterests(interests);
  };

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
          <div className="text-center mt-4">
            <Button color="primary" onClick={createMyCourses}>
              Create My Courses
            </Button>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default InterestSelection;
