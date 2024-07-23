class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = new Date(
      this.getAttribute("created-at")
    ).toLocaleDateString();

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
        </style>
        <div class="note-item">
          <h3>${title}</h3>
          <p>${body}</p>
          <p>${createdAt}</p>
        </div>
      `;
  }
}

customElements.define("note-item", NoteItem);
