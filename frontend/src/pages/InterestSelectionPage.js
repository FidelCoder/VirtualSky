import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";



const interestsList = [
  "Astronomy",
  "Astrobiology",
  "Astrophysics",
  "Space Exploration",
  "Cosmology",
];

const InterestSelectionPage = ({ onInterestSelected }) => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const { userId } = authCtx;
  
    const handleInterestChange = (event) => {
      const { options } = event.target;
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setSelectedInterests(selectedOptions);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      console.log("Submitting interests:", selectedInterests);
    
      const userId = localStorage.getItem("userId");
      console.log("User ID retrieved from localStorage:", userId);
    
      try {
        const response = await axios.post(
          `https://virtual-sky-servers-dkix.vercel.app/api/users/${userId}/interests`,
          {
            interests: selectedInterests,
          }
        );
    
        console.log("API response:", response);
    
        // You can access the updated user data from the response
        const updatedUser = response.data.user;
        console.log("Updated user data:", updatedUser);
    
        history.push("/profile");
      } catch (error) {
        console.error("Error saving interests:", error);
      }
    };
    
      
      

  return (
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
                  <div className="interest-tile p-2 rounded" style={{ backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
                    {interest}
                  </div>
                </Col>
              ))}
            </Row>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default InterestSelectionPage;
