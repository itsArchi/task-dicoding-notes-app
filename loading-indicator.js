document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  const noteTitle = noteForm.querySelector("custom-input[type='text']");
  const noteBody = noteForm.querySelector("custom-input[type='textarea']");
  const noteList = document.getElementById("note-list");

  const apiBaseURL = "https://notes-api.dicoding.dev/v2";

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${apiBaseURL}/notes`);
      const data = await response.json();
      renderNotes(data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const renderNotes = (notes) => {
    noteList.innerHTML = "";
    notes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("created-at", note.createdAt);
      noteList.appendChild(noteElement);
    });
  };

  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const newNote = {
        title: noteTitle.value,
        body: noteBody.value,
      };
      const response = await fetch(`${apiBaseURL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();
      if (data.status === "success") {
        await fetchNotes();
        noteForm.reset();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  });

  fetchNotes();
});
