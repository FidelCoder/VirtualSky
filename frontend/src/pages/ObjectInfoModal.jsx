import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import generateCourses from "../pages/openai";
import InterestSelection from "../components/InterestSelection/InterestSelection";
import "./ObjectInfoModal.css";

const FreeCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [generatedCourseData, setGeneratedCourseData] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (selectedInterests.length > 0) {
      (async () => {
        const newGeneratedCourses = await generateCourses(selectedInterests);
        setGeneratedCourseData(newGeneratedCourses);
      })();
    }
  }, [selectedInterests]);

  const filteredCourses = generatedCourseData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="free-course">
      <Container>
        <InterestSelection
          setGeneratedCourseData={setGeneratedCourseData}
          setSelectedInterests={setSelectedInterests}
        />
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Our Courses</h2>
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
      </Container>
    </section>
  );
};

export default FreeCourse;
