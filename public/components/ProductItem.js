import { addToCart } from "../services/Order.js";

export class ProductItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const template = document.querySelector("#product-item-template");
        const content = template.content.cloneNode(true);

        this.appendChild(content);

        const product = JSON.parse(this.dataset.product);

        this.querySelector("h4").textContent = product.name;
        this.querySelector("p.price").textContent = product.price;
        this.querySelector("img").src = `data/images/${product.image} `;
        this.querySelector("a").addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() == "button") {
                addToCart(product.id);
            } else {
                $app.router.go("/product-" + product.id);
            }

            e.preventDefault();
        });
    }
}

customElements.define("product-item", ProductItem);
