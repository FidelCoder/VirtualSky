// import axios from 'axios';

// const generateCourses = async (interests, retries = 3) => {
//   try {
//     const response = await axios.post(
//       //"https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
//       "https://api.openai.com/v1/engines/text-davinci-002/completions",
//       {
//         prompt: `Generate a course for each: ${interests.join(
//           ", "
//         )}`,
//         max_tokens: 100,
//         n: 1,
//         stop: null,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           //Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//           //Authorization: `Bearer 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`
//           Authorization: 'Bearer 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'
//         },
//       }
//     );

//     const generatedCourses = response.data.choices[0].text.trim().split("\n");
//     console.log('API response:', response.data);
//     console.log('Generated courses:', generatedCourses);

//     return generatedCourses.map((course) => ({
//       id: Math.random().toString(36).substr(2, 9),
//       title: course,
//     }));
//   } catch (error) {
//     console.error("Error generating courses:", error);

//     if (retries > 0) {
//       console.log(`Retrying... attempts left: ${retries}`);
//       return generateCourses(interests, retries - 1);
//     } else {
//       console.log("Failed after multiple retries");
//       return [];
//     }
//   }
// };

// export default generateCourses;


import axios from 'axios';

const generateCourses = async (interests, token, retries = 3) => {
  const openaiApiKey = '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'; // Add the OpenAI API key here

  try {
    // Call OpenAI API
    const response = await axios.post(
      //"https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: `Generate a good course for each: ${interests.join(
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
          Authorization: `Bearer ${openaiApiKey}`, // Use OpenAI API key
        },
      }
    );

    const generatedCourses = response.data.choices[0].text.trim().split("\n");
    console.log('API response:', response.data);
    console.log('Generated courses:', generatedCourses);

    // Save generated courses to your backend
    const savedCoursesResponse = await axios.post(
      'http://localhost:5000/courses',
      {
        courses: generatedCourses.map((course) => ({ title: course })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use token for your backend
        },
      }
    );

    console.log('Saved courses:', savedCoursesResponse.data);

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

export default generateCourses;
