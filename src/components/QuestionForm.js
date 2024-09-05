import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "correctIndex") {
      setFormData({
        ...formData,
        [name]: Number(value), // Convert to number for correctIndex
      });
    } else if (name.startsWith("answer")) {
      const index = Number(name.replace("answer", "")) - 1; // Get the index from name
      const newAnswers = [...formData.answers];
      newAnswers[index] = value; // Update the specific answer
      setFormData({
        ...formData,
        answers: newAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: formData.correctIndex,
    };

    // Call the onAddQuestion prop to send the new question to the API
    await onAddQuestion(newQuestion);

    // Reset form
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name={`answer${index + 1}`}
              value={answer}
              onChange={handleChange}
              required
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer || `Answer ${index + 1}`}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
