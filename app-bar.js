class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .app-bar {
            color: #fff;
            font-size: 18px;
            text-align: center;
          }
        </style>
        <div class="app-bar">
          <h2>Notes App</h2>
        </div>
      `;
  }
}

customElements.define("app-bar", AppBar);
