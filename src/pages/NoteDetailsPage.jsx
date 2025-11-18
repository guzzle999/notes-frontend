import React, { useEffect, useState } from "react";
import { getNoteById, updateNote } from "../services/notesService";

const NoteDetailsPage = ({noteId, onNoteUpdated}) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
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
      const updated = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags back to an array
      };
      await updateNote(noteId, updated); // Call the update endpoint
      setNote(updated); // Update the local state
      setIsEditing(false); // Exit edit mode
      if (onNoteUpdated) onNoteUpdated();
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  if (!note)
    return <p className="text-center mt-10 text-red-500">Note not found</p>;

  return (
    <div
      className="w-full bg-white/5 z-50
                 flex items-center justify-center p-4"
    >

      {/* EDIT MODE */}
      {isEditing ? (
        <div className="bg-white border-2 rounded-2xl p-4 ">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg bg-[#D0BFFF]/50 font-bold text-2xl mb-6 text-black"
            placeholder="Title"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg bg-[#FFC9DE]/50   text-black mb-6 min-h-[150px]"
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
            className="bg-[#B2F2BB] border-2 text-black font-bold px-6 py-3 rounded-lg hover:bg-[#A5D8FF] transition-all duration-200 cursor-pointer"
          >
            Save Note
          </button>
        </div>
      ) : (

      /* VIEW MODE */
      <div
          className="bg-white border-2 rounded-xl p-4 w-full relative
               max-w-sm sm:max-w-md lg:max-w-xl
               max-h-[90vh] overflow-y-auto"
        >
          <h1 className="text-2xl font-bold mb-6 border-2 rounded-lg text-[#111827] bg-[#D0BFFF]/50 py-3 px-2 ">
            {note.title}
          </h1>
          <p className="text-[#6B7280] text-lg  bg-yellow-50 border-2 rounded-lg px-2 py-2 mb-6 ">
            {note.content}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {note.isPinned && (
                <span className="bg-[#FFD8A8]/70 border-1 text-black text-xs font-bold px-3 py-1 rounded-sm ">
                  📌 Pinned
                </span>
              )}
            </div>
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 border-2 text-black text-xs font-bold px-3 py-1 rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer bg-[#B2F2BB] border-2 border-[#E5E7EB] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#A5D8FF] transition-all duration-200"
          >
            Edit Note
          </button>
      </div>
      )}
    </div>
  );
};

export default NoteDetailsPage;
