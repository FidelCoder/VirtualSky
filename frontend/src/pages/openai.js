// openai.js
import axios from 'axios';

const generateCourses = async (interests) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
        {
          prompt: `Generate a list of courses based on the following interests: ${interests.join(
            ", "
          )}`,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
  
      const generatedCourses = response.data.choices[0].text.trim().split("\n");
      console.log('API response:', response.data);
      console.log('Generated courses:', generatedCourses);
  
      return generatedCourses.map((course) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: course,
      }));
    } catch (error) {
      console.error("Error generating courses:", error);
      return [];
    }
  };
  

export default generateCourses;
