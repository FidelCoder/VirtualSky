// export default ObjectInfoModal;
import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import axios from "axios";
import "./ObjectInfoModal.css";
import styles from "./ObjectInfoModal.css";
import generateCourses from './openai';
import { useMemo } from "react";



const interestsList = [
  "Astronomy",
  "Astrobiology",
  "Astrophysics",
  "Space Exploration",
  "Cosmology",
];

const Model = ({ url }) => {
  const gltf = useMemo(() => {
    if (!url) {
      console.error("URL is not defined for this model.");
      return null;
    }
    return useLoader(GLTFLoader, url);
  }, [url]);

  if (!gltf) {
    return null;
  }

  return <primitive object={gltf.scene} dispose={null} />;
};


const FreeCourseCard = ({ item }) => {
  return (
    <div className={`free-course-card ${styles.freeCourseCard}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight />
        <Suspense fallback={null}>
          <Model url={item.modelUrl} />
        </Suspense>
      </Canvas>
      <div className="free-course-card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">
          Students: {item.students}k | Rating: {item.rating}/5
        </p>
      </div>
    </div>
  );
};



const InterestSelection = ({ onInterestSelected }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestChange = (event) => {
    const { options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedInterests(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onInterestSelected(selectedInterests);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
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
            <div className="interest-tile">
              {interest}
            </div>
          </Col>
        ))}
      </Row>
    </form>
  );
};

const FreeCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [submittedInterests, setSubmittedInterests] = useState([]);
  const [generatedCourseData, setGeneratedCourseData] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInterestSelection = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  

  const handleSubmitInterests = () => {
    console.log('Submitted interests:', selectedInterests);
    setSubmittedInterests(selectedInterests);
    setSelectedInterests([]);
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

          <Col lg="12" className="mb-4">
            <InterestSelection
              selectedInterests={selectedInterests}
              onInterestSelected={handleInterestSelection}
              onSubmitInterests={handleSubmitInterests}
            />
          </Col>

          <Col lg="12" className="mb-4">
            <Row>
              {submittedInterests.map((interest, index) => (
                <Col key={index} lg="3" md="4" className="interest-grid">
                  {interest}
                </Col>
              ))}
            </Row>
          </Col>

          {filteredCourses.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <FreeCourseCard item={item} />
              <div className="text-center mt-3">
                <button className="btn btn-primary">Enroll</button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FreeCourse;

  
//modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf",

//###################################################################
// import React, { useState, Suspense } from "react";
// import { Container, Row, Col } from "reactstrap";
// import { Canvas } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useLoader } from "@react-three/fiber";
// import { useHistory } from 'react-router-dom';
// import LoginPromptModal from "./LoginPromptModal"
// import courseImg01 from "../assests/images/web-development.png";
// // ... other imports
// import "./ObjectInfoModal.css";

// const ObjectInfoModal = ({ isLoggedIn }) => {
//   const [isPromptOpen, setIsPromptOpen] = useState(false);

//   const togglePrompt = () => {
//     setIsPromptOpen(!isPromptOpen);
//   };

// const history = useHistory();

// const redirectToAuth = () => {
//   setIsPromptOpen(false);
//   // Redirect to the authentication page
//   history.push('/auth');
// };

// const [isModalOpen, setIsModalOpen] = useState(false);

// const handleClick = () => {
//   if (!isLoggedIn) {
//     togglePrompt();
//   } else {
//     // Show ObjectInfoModal content when the user is logged in
//     setIsModalOpen(true);
//   }
// };

// // Close the modal
// const closeModal = () => {
//   setIsModalOpen(false);
// };

// // ...

// return (
//   <>
//     <button onClick={handleClick}>Open Info Modal</button>
//     <LoginPromptModal
//       isOpen={isPromptOpen}
//       toggle={togglePrompt}
//       redirectToAuth={redirectToAuth}
//     />
//     {isModalOpen && (
//       <ObjectInfoModalContent closeModal={closeModal} />
//     )}
//     <FreeCourse />
//   </>
// );

//   // Add Modal code ##################################
//   const freeCourseData = [
//     {
//       id: "01",
//       title: "Basic Web Development Course",
//       imgUrl: courseImg01,
//       students: 5.3,
//       rating: 1.7,
//       modelUrl: "path/to/3d-model-01.gltf",
//     },
//     // ... other courses with their respective model URLs
//   ];

//   const Model = ({ url }) => {
//     const gltf = useLoader(GLTFLoader, url);
//     return <primitive object={gltf.scene} dispose={null} />;
//   };

//   const FreeCourseCard = ({ item }) => {
//     return (
//       <div className="free-course-card">
//         <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
//           <ambientLight />
//           <Suspense fallback={null}>
//             <Model url={item.modelUrl} />
//           </Suspense>
//         </Canvas>
//         <div className="free-course-card-body">
//           <h5 className="card-title">{item.title}</h5>
//           <p className="card-text">
//             Students: {item.students}k | Rating: {item.rating}/5
//           </p>
//         </div>
//       </div>
//     );
//   };

//   const FreeCourse = () => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleSearch = (event) => {
//       setSearchTerm(event.target.value);
//     };

//     const filteredCourses = freeCourseData.filter((item) =>
//       item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//       <section id="free-course">
//         <Container>
//           <Row>
//             <Col lg="12" className="text-center mb-5">
//               <h2 className="fw-bold">Our Courses</h2>
//             </Col>
    
//             <Col lg="12" className="mb-4">
//               <form onSubmit={(event) => event.preventDefault()}>
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search for courses..."
//                     value={searchTerm}
//                     onChange={handleSearch}
//                   />
//                   <button className="btn btn-primary" type="submit">
//                     Search
//                   </button>
//                 </div>
//               </form>
//             </Col>
    
//             {filteredCourses.map((item) => (
//               <Col lg="3" md="4" className="mb-4" key={item.id}>
//                 <FreeCourseCard item={item} />
//                 <div className="text-center mt-3">
//                   <button className="btn btn-primary">Enroll</button>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>
//     );
//   };
// };
// export default ObjectInfoModal;
