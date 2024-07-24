class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  get value() {
    const element = this.shadowRoot.querySelector(
      this.getAttribute("type") === "textarea" ? "textarea" : "input"
    );
    return element ? element.value : "";
  }

  set value(val) {
    const element = this.shadowRoot.querySelector(
      this.getAttribute("type") === "textarea" ? "textarea" : "input"
    );
    if (element) {
      element.value = val;
    }
  }

  render() {
    const type = this.getAttribute("type");
    const placeholder = this.getAttribute("placeholder");

    if (type === "textarea") {
      this.shadowRoot.innerHTML = `
        <style>
          textarea {
            font-family: "Poppins", sans-serif;
            display: block;
            border: none;
            width: 50%;
            padding: 15px;
            margin-bottom: 10px;
            background-color: #fbf9f1;
          }
        </style>
        <textarea placeholder="${placeholder}"></textarea>
      `;
    } else {
      this.shadowRoot.innerHTML = `
        <style>
          input {
            font-family: "Poppins", sans-serif;
            display: block;
            border: none;
            width: 50%;
            padding: 15px;
            margin-bottom: 10px;
            background-color: #fbf9f1;
          }
        </style>
        <input type="${type}" placeholder="${placeholder}" />
      `;
    }
  }
}

customElements.define("custom-input", CustomInput);
