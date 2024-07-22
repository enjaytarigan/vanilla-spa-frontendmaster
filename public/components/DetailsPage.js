import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

export class DetailsPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("details-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        const loadCss = async () => {
            const style = document.createElement("style");
            const res = await fetch("/components/DetailsPage.css");
            const css = await res.text();
            style.textContent = css;
            this.root.appendChild(style);
        };
        loadCss();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        let isNotFound = this.dataset.productId == null;

        if (!isNotFound) {
            this.product = await getProductById(this.dataset.productId);
            isNotFound = this.product == null;
        }

        if (isNotFound) {
            alert("Product Not Found");
            return;
        }

        this.root.querySelector("h2").textContent = this.product.name;
        this.root.querySelector(
            "img"
        ).src = `/data/images/${this.product.image}`;
        this.root.querySelector(".description").textContent =
            this.product.description;
        this.root.querySelector(".price").textContent =
            "$" + this.product.price.toFixed(2);
        this.root.querySelector("button").addEventListener("click", () => {
            addToCart(this.product.id);
            // $app.router.go("/order");
        });
    }
}

customElements.define("details-page", DetailsPage);
