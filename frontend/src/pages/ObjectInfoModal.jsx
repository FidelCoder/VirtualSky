import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
} from "reactstrap";
import axios from "axios";
import InterestSelection from "../components/InterestSelection/InterestSelection";
import CoursesList from "../components/Courses/CoursesList";
import "./ObjectInfoModal.css";

const generateCourses = async (interests, token, retries = 3) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/generateCourses',
      {
        interests: interests,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token from local storage
        },
      }
    );

    const generatedCourses = response.data.courses;

    console.log('Generated courses:', generatedCourses);

    return generatedCourses.map((course) => ({
      id: Math.random().toString(36).substr(2, 9),
      title: course,
    }));
  } catch (error) {
    console.error("Error generating courses:", error);

    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`);
      return generateCourses(interests, token, retries - 1);
    } else {
      console.log("Failed after multiple retries");
      return [];
    }
  }
};


const FreeCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [generatedCourseData, setGeneratedCourseData] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExploreDomain = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (selectedInterests.length > 0) {
      (async () => {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const newGeneratedCourses = await generateCourses(selectedInterests, token);
        setGeneratedCourseData(newGeneratedCourses);
        setShowModal(true); // Show the modal after generating courses
      })();
    }
  }, [selectedInterests]);
  
  const filteredCourses = generatedCourseData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // //////////////////////////////////////
  const saveCoursesToDatabase = async (courses) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const userId = localStorage.getItem('userId'); // Get the userId from local storage
  
      const response = await axios.post(
        'http://localhost:5000/saveCourses',
        {
          courses: courses,
          userId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Use the token from local storage
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Courses saved successfully.');
      } else {
        console.error('Error saving courses:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving courses:', error);
    }
  };
  

  return (
    <section id="free-course">
      <Container>
      <InterestSelection
          setGeneratedCourseData={setGeneratedCourseData}
          setSelectedInterests={setSelectedInterests}
          onExploreDomain={handleExploreDomain}
        />
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Courses Suggestions</h2>
          </Col>

          <Col lg="12" className="mb-4">
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for courses..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
          </Col>

          {filteredCourses.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <div className="course-card">
                <div className="course-card-body">
                  <h5 className="course-card-title">{item.title}</h5>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
          <ModalHeader toggle={() => setShowModal(false)}>
            Generated Courses
          </ModalHeader>
          <div className="modal-body">
            {generatedCourseData.map((course) => (
              <p key={course.id}>{course.title}</p>
            ))}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={() => {
                saveCoursesToDatabase(generatedCourseData);
                setShowModal(false);
              }}
            >
              Accept
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                // Don't save courses to the database
                setShowModal(false);
              }}
            >
              Reject
            </button>
          </div>
        </Modal>

</Container>
      <div>
        <div>My Custom Courses</div>
        <CoursesList />
      </div>
    </section>
  );
};

export default FreeCourse;
