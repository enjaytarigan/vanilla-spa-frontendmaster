import { removeFromCart } from "../services/Order.js";

export class CartItem extends HTMLElement {
    connectedCallback() {
        const cartItem = JSON.parse(this.dataset.cartItem);
        this.innerHTML = "";

        const template = document.getElementById("cart-item-template");
        const content = template.content.cloneNode(true);
        this.appendChild(content);

        this.querySelector(".qty").textContent = `${cartItem.quantity}x`;
        this.querySelector(".name").textContent = cartItem.product.name;
        this.querySelector(
            ".price"
        ).textContent = `$${cartItem.product.price.toFixed(2)}`;
        this.querySelector(".delete-button").addEventListener(
            "click",
            (event) => {
                event.preventDefault();
                removeFromCart(cartItem.product.id);
            }
        );
    }
}

customElements.define("cart-item", CartItem);
