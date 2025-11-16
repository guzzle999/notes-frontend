import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../services/notesService";

const NoteDetailsPage = () => {
  const { noteId } = useParams(); // Get the note ID from the URL
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isPinned: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(noteId); // Fetch the note by ID
        setNote(data.note);
        setFormData({
          title: data.note.title,
          content: data.note.content,
          tags: data.note.tags.join(", "), // Convert tags array to a comma-separated string
          isPinned: data.note.isPinned,
        });
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Failed to load note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePin = () => {
    setFormData((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const handleSaveNote = async () => {
    try {
      const updatedNote = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags back to an array
      };
      await updateNote(noteId, updatedNote); // Call the update endpoint
      setNote(updatedNote); // Update the local state
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Failed to save note:", err);
      setError("Failed to save note. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 
                 flex items-center justify-center p-4"
    >
      {isEditing ? (
        <div className="bg-white border-2 rounded-2xl p-8 ">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg bg-[#FFD8A8]/50 font-bold text-2xl mb-6 text-black"
            placeholder="Title"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg bg-[#D0BFFF]/50   text-black mb-6 min-h-[150px]"
            placeholder="Content"
          ></textarea>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg bg-white   text-black mb-6"
            placeholder="Tags (comma-separated)"
          />
          <div className="flex items-center mb-6">
            <label className="mr-3 font-bold text-black">Pinned:</label>
            <input
              type="checkbox"
              checked={formData.isPinned}
              onChange={handleTogglePin}
              className="border-2 rounded cursor-pointer"
            />
          </div>
          <button
            onClick={handleSaveNote}
            className="bg-pink-300 border-2 text-black font-bold px-6 py-3 rounded-lg hover:bg-pink-400 transition-all duration-200 cursor-pointer"
          >
            Save Note
          </button>
        </div>
      ) : (
        <div
          className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl 
                   max-h-[90vh] overflow-y-auto 
                   border-4 border-[#D0BFFF] rounded-2xl p-2 md:p-3 shadow-2xl"
        >
          <div
            className="bg-white rounded-xl p-6 w-full relative
               max-w-sm sm:max-w-md lg:max-w-xl
               max-h-[90vh] overflow-y-auto"
          >
            <h1 className="text-2xl font-bold mb-6 border-2 rounded-lg bg-pink-200 py-3 px-2  text-black">
              {note.title}
            </h1>
            <p className="text-black text-lg  bg-yellow-50 border-2 rounded-lg px-2 py-2 mb-6 ">
              {note.content}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex flex-wrap gap-2">
                {note.isPinned && (
                  <span className="bg-yellow-200 border-2 text-black text-xs font-bold px-3 py-1 rounded-full ">
                    📌 Pinned
                  </span>
                )}
              </div>
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 border-2 text-black text-xs font-bold px-3 py-1 rounded-full  "
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="cursor-pointer bg-blue-300 border-2 border-[#E5E7EB] text-black font-bold px-6 py-3 rounded-lg hover:bg-blue-400 transition-all duration-200"
            >
              Edit Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailsPage;
