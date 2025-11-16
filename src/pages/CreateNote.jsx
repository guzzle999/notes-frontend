import { useState } from "react";
import { createNote } from "../services/notesService";

const CreateNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // New state for tags
  const [isPinned, setIsPinned] = useState(false); // New state for pin state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newNote = await createNote({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // Convert tags string to array
        isPinned,
      });
      setTitle("");
      setContent("");
      setTags("");
      setIsPinned(false);
      if (onNoteAdded) onNoteAdded(newNote); // Trigger re-fetch or update notes
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6 bg-[#F3F4F6] border-4 border-[#E5E7EB]  rounded-2xl ">
      <h1 className="md:text-2xl text-xl font-bold text-[#111827] mb-8 rounded-lg bg-pink-200 py-3 text-center">
        Create a New Note
      </h1>

      {error && (
        <div className="bg-red-200 text-red-900 border-2 border-black rounded-lg px-4 py-2 mb-4 text-center  ">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-bold text-black">Title</label>
          <input
            type="text"
            className="w-full p-3  rounded-lg bg-white  focus:ring-2 focus:ring-pink-300  text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-bold text-black">Content</label>
          <textarea
            className="w-full p-3  rounded-lg bg-white  min-h-[150px] focus:ring-2 focus:ring-pink-300  text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-bold text-black">Tags</label>
          <input
            type="text"
            className="w-full p-3  rounded-lg bg-white  focus:ring-2 focus:ring-pink-300  text-black"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPinned"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="mr-2 border-2 border-black rounded cursor-pointer"
          />
          <label
            htmlFor="isPinned"
            className="font-bold text-[#111827] cursor-pointer"
          >
            Pin this note
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#B2F2BB] border-4 text-[#111827] font-bold py-3 rounded-lg  hover:bg-[#A5D8FF] transition-all duration-200 cursor-pointer"
        >
          {loading ? "Saving..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
