class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  async handleArchive() {
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this.getAttribute('id')}/archive`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.status === "success") {
        this.dispatchEvent(new CustomEvent('note-archived', { detail: { id: this.getAttribute('id') } }));
      }
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  }

  render() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = new Date(this.getAttribute("created-at")).toLocaleDateString();

    this.shadowRoot.innerHTML = `
      <style>
        .note-item {
          background-color: #fff;
          padding: 16px;
          border-radius: 8px;
          height: 260px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 16px;
        }
        .actions {
          display: flex;
          justify-content: space-between;
        }
        button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
      </style>
      <div class="note-item">
        <h3>${title}</h3>
        <p>${body}</p>
        <p>${createdAt}</p>
        <div class="actions">
          <button class="archive-btn">Archive</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.archive-btn').addEventListener('click', () => this.handleArchive());
  }
}

customElements.define("note-item", NoteItem);
