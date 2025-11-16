import { Link } from "react-router-dom";
import { useState } from "react";
import { updateNoteVisibility } from "../../services/notesService";

const NoteCard = ({ note, onDelete }) => {
  const [isPublic, setIsPublic] = useState(note.isPublic); // Local state for visibility

  const handleToggleVisibility = async () => {
    try {
      const updatedNote = await updateNoteVisibility(note._id, !isPublic);
      setIsPublic(updatedNote.note.isPublic); // Update local state to trigger re-render
    } catch (err) {
      console.error("Failed to update note visibility:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#E8F8FF] to-[#F3EEFF] border-2 border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200">
      <div>
        {/* Title */}
        <h2 className="text-xl font-bold mb-3 text-[#111827] border-2 border-[#E5E7EB] rounded-lg bg-[#FFFFFF] px-2 py-1  truncate">
          {note.title}
        </h2>

        {/* Content */}
        <p className="text-black text-base  bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-lg px-2 py-2 mt-2  line-clamp-4 overflow-y-auto">
          {note.content}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {note.isPinned && (
            <span className="bg-[#F3F4F6] border-2 border-[#E5E7EB] text-black text-xs font-bold px-3 py-1 rounded-lg ">
              📌 Pinned
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-200 border-[#E5E7EB] text-black text-xs font-bold px-3 py-1 rounded-lg "
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 text-xs text-black ">
        {/* Created Date */}
        <span className=" px-2 py-1">
          Created on: {new Date(note.createdOn).toLocaleDateString()}
        </span>

        {/* Actions */}
        <div className="flex-col space-x-2 space-y-2 items-center">
          <div className="flex gap-x-1">
            <Link
              to={`/notes/${note._id}`}
              className="font-bold text-blue-700 bg-white border-2 border-[#E5E7EB] rounded px-2 py-1  hover:bg-blue-200 transition"
            >
              View
            </Link>
            <Link
              to={`/notes/${note._id}`}
              className="font-bold text-green-700 bg-white border-2 border-[#E5E7EB] rounded px-2 py-1  hover:bg-green-200 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(note._id)}
              className="cursor-pointer font-bold text-red-700 bg-white border-2 border-[#E5E7EB] rounded px-2 py-1  hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
          <button
            onClick={handleToggleVisibility}
            className={`cursor-pointer font-bold border-2 border-[#E5E7EB] rounded-lg px-2 py-1  transition ${
              isPublic
                ? "bg-[#D0BFFF] text-[#e4226c] hover:bg-[#D0BFFF]"
                : "bg-[#D0BFFF] text-[#111827] hover:bg-[#a389eb]"
            }`}
          >
            {isPublic ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
