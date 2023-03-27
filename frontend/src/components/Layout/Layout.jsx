import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      {/* <HeroSection id="hero" />
      <CompanySection id="company" />
      <AboutUs id="about" />
      <Courses id="courses" />
      <ChooseUs id="choose" />
      <Features id="features" />
      <FreeCourse id="free-course" />
      <section id="courselist">
        <CourseList />
      </section>
      <Testimonials id="testimonials" />
      <Newsletter id="newsletter" />
      <Footer id="footer" /> */}
    </Fragment>
  );
};

export default Layout;