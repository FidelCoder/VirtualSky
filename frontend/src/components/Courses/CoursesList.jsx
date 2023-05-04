import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get the userId from local storage
        const response = await axios.get(`http://localhost:5000/fetchCourses?userId=${userId}`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const renderCourses = () => {
    const courseRows = [];

    for (let i = 0; i < courses.length; i += 3) {
      courseRows.push(
        <Row key={i}>
          {courses.slice(i, i + 3).map((course) => (
            <Col key={course._id} lg="4" md="6" className="mb-4">
              <div className="course-card">
                <div className="course-card-body">
                  <h5 className="course-card-title">{course.title}</h5>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      );
    }

    return courseRows;
  };

  return (
    <Container>
      <h2>My Courses</h2>
      {courses.length > 0 ? renderCourses() : <p>No courses found.</p>}
    </Container>
  );
};

export default CoursesList;
