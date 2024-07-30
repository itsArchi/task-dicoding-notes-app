document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  const noteTitle = noteForm.querySelector("custom-input[type='text']");
  const noteBody = noteForm.querySelector("custom-input[type='textarea']");
  const noteList = document.getElementById("note-list");
  const apiBaseURL = "https://notes-api.dicoding.dev/v2";
  const loadingIndicator = document.getElementById("loading-indicator");

  const showLoading = () => {
    loadingIndicator.style.display = "block";
  };

  const hideLoading = () => {
    loadingIndicator.style.display = "none";
  };

  const fetchNotes = async () => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes`);
      const data = await response.json();
      if (data.status === "success") {
        renderNotes(data.data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch notes. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const fetchArchivedNotes = async () => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes/archived`);
      const data = await response.json();
      if (data.status === "success") {
        renderNotes(data.data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching archived notes:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch archived notes. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const fetchSingleNote = async (noteId) => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes/${noteId}`);
      const data = await response.json();
      if (data.status === "success") {
        renderSingleNoteDetail(data.data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching single note:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch note. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const renderSingleNoteDetail = (note) => {
    const detailContainer = document.getElementById("note-detail");
    detailContainer.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.body}</p>
      <p>${new Date(note.createdAt).toLocaleDateString()}</p>
    `;
  };

  const addNote = async (title, body) => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      if (data.status === "success") {
        await fetchNotes(); 
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error adding note:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add note. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const archiveNote = async (noteId) => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes/${noteId}/archive`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.status === "success") {
        await fetchNotes(); 
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error archiving note:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to archive note. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const unarchiveNote = async (noteId) => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes/${noteId}/unarchive`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.status === "success") {
        await fetchNotes(); 
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error unarchiving note:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to unarchive note. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const deleteNote = async (noteId) => {
    showLoading();
    try {
      const response = await fetch(`${apiBaseURL}/notes/${noteId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status === "success") {
        await fetchNotes();
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete note. Please try again later.",
      });
    } finally {
      hideLoading();
    }
  };

  const renderNotes = (notes) => {
    noteList.innerHTML = "";
    notes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("id", note.id);
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("created-at", note.createdAt);
      noteElement.setAttribute("archived", note.archived);
      noteList.appendChild(noteElement);
    });

    setTimeout(() => {
      gsap.from(".note-item", {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
      });
    }, 0);
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
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add note. Please try again later.",
      });
    }
  });

  noteList.addEventListener("note-archived", async (event) => {
    const { id } = event.detail;
    console.log(`Note with ID ${id} archived`);
    await fetchNotes();
  });

  fetchNotes();
});
