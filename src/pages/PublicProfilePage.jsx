import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPublicProfile, getPublicNotes } from "../services/profileService";
import NotesChat from "../components/notes/NotesChat";

const PublicProfilePage = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // pagination state for public notes
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchPublicNotes = useCallback(
    async (nextPage = page, nextLimit = pageSize) => {
      try {
        const notesData = await getPublicNotes(userId, {
          page: nextPage,
          limit: nextLimit,
        });
        setNotes(notesData.notes || []);
        if (typeof notesData.total === "number") setTotal(notesData.total);
        if (typeof notesData.page === "number") setPage(notesData.page);
        if (typeof notesData.limit === "number") setPageSize(notesData.limit);
      } catch (err) {
        console.error("Failed to fetch public notes:", err);
        setError("Failed to load public notes.");
      } finally {
        setLoading(false);
      }
    },
    [userId, page, pageSize]
  );

  useEffect(() => {
    const fetchProfileAndNotes = async () => {
      try {
        const profileData = await getPublicProfile(userId);
        setProfile(profileData.user);
        await fetchPublicNotes(1, pageSize);
      } catch (err) {
        console.error("Failed to fetch public profile or notes:", err);
        setError("Failed to load profile or notes.");
      }
    };

    fetchProfileAndNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const handlePrev = () => {
    if (page > 1) fetchPublicNotes(page - 1, pageSize);
  };
  const handleNext = () => {
    if (page < totalPages) fetchPublicNotes(page + 1, pageSize);
  };
  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value) || 10;
    setPageSize(newSize);
    fetchPublicNotes(1, newSize);
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen  bg-[url('/bg02.jpg')] bg-cover">
      <div className="min-h-screen max-w-5xl mx-auto px-6 py-10 bg-[#F9FAFB] border-2 rounded-2xl">
        <h1
          className="text-4xl font-bold text-black mb-6 border-2 rounded-lg bg-green-200 py-4  text-center"
          style={{
            background:
              "linear-gradient(90deg, #A5D8FF, #B2F2BB, #FFD8A8, #D0BFFF)",
          }}
        >
          {profile.fullName}'s Public Profile
        </h1>
        <p className="text-black pl-2 ">Email: {profile.email}</p>
        <NotesChat userId={userId} />
        <h2 className="text-2xl font-bold text-black mb-6 border-2  rounded-lg bg-[#D9D2FF] py-2 px-2 text-center">
          Public Notes
        </h2>
        {notes.length === 0 ? (
          <p className="text-black  text-lg">No public notes available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gradient-to-br from-[#E8F8FF] to-[#F3EEFF] border-1 border-[#E5E7EB] rounded-xl p-6   transition-all duration-200"
                >
                  <h3 className="text-2xl font-bold mb-3 text-black border-2  rounded-lg bg-gray-50 px-2 py-1 truncate">
                    {note.title}
                  </h3>
                  <p className="text-black text-base  bg-gray-50 border-2  rounded-lg px-2 py-2 mt-2  line-clamp-4 overflow-y-auto">
                    {note.content}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-orange-200 border-2  text-black text-xs font-bold px-3 py-1 rounded-full  "
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={page <= 1}
                className={`px-4 py-2 border-1  rounded-lg font-bold ${
                  page <= 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 cursor-pointer"
                }`}
              >
                Prev
              </button>
              <span className="text-black ">
                Page {page} of {Math.max(1, Math.ceil((total || 0) / pageSize))}
              </span>
              <button
                onClick={handleNext}
                disabled={
                  page >= Math.max(1, Math.ceil((total || 0) / pageSize))
                }
                className={`px-4 py-2 border-1  rounded-lg  font-bold ${
                  page >= Math.max(1, Math.ceil((total || 0) / pageSize))
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 cursor-pointer"
                }`}
              >
                Next
              </button>
              <label className="ml-4 text-black ">
                Page size:
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="ml-2 p-2 border-2  rounded bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PublicProfilePage;
