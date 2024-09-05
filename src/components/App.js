import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:4000/questions");
    const data = await response.json();
    setQuestions(data);
  };

  const handleAddQuestion = async (newQuestion) => {
    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });
    const createdQuestion = await response.json();
    setQuestions([...questions, createdQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
      )}
    </main>
  );
}

export default App;
