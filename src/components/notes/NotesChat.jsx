import { useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const NotesChat = ({ userId }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      // Send the question to the backend
      const response = await api.post(`/mongo/answer-question/${userId}`, {
        question,
      });
      setAnswer(response.data.answer || "No answer available.");
    } catch (err) {
      console.error("Error answering question:", err);
      setError("Failed to get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 shadow-lg rounded-2xl p-8  my-6">
      <h2 className="text-2xl font-bold text-black mb-6 border-2  rounded-lg bg-[#FFCCE6]/50 py-2 px-2 text-center">
        Ask a Question About Notes
      </h2>
      <form onSubmit={handleAskQuestion} className="space-y-6">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the notes..."
          className="w-full p-3 border-2  rounded-lg bg-yellow-50   text-black"
          required
        />
        <Link
          type="submit"
          disabled={loading}
          className="bg-[#B2F2BB] text-#111827] hover:bg-[#A5D8FF] border-2  text-black font-bold px-4 py-2 rounded-lg  transition-all duration-200 w-full"
        >
          {loading ? "Asking..." : "Ask"}
        </Link>
      </form>

      {error && <p className="text-red-500 mt-4 ">{error}</p>}

      {answer && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-black">AI's Answer:</h3>
          <p className="text-black bg-[#FFF4A8] border-2  rounded-lg p-4  ">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesChat;
