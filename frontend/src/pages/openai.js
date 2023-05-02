import axios from 'axios';

const generateCourses = async (interests, retries = 3) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
      //"https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: `Generate two good courses based on the following interests: ${interests.join(
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
          //Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          //Authorization: `Bearer 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`
          Authorization: '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'
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

    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`);
      return generateCourses(interests, retries - 1);
    } else {
      console.log("Failed after multiple retries");
      return [];
    }
  }
};

export default generateCourses;
