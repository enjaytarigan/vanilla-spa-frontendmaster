import { Router } from "../services/Router.js";

export class OrderPage extends HTMLElement {
    #user = {
        name: "",
        phone: "",
        email: "",
    };

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        const section = document.createElement("section");

        this.root.appendChild(section);
        const loadCss = async () => {
            const style = document.createElement("style");
            const res = await fetch("/components/OrderPage.css");
            const css = await res.text();
            style.textContent = css;
            this.root.appendChild(style);
        };

        loadCss();
    }

    connectedCallback() {
        window.addEventListener("appcartchange", () => {
            this.render();
        });

        this.render();
    }

    render() {
        if ($app.store.cart.length == 0) {
            this.root.querySelector(
                "section"
            ).innerHTML = `<p class="empty">Your order is empty</p>`;
        } else {
            this.root.querySelector("section").innerHTML = "";
            const section = this.root.querySelector("section");
            let html = `
                <h2>Your order</h2>
                <ul></ul>
            `;

            section.innerHTML = html;
            const template = document.getElementById("order-form-template");
            const content = template.content.cloneNode(true);

            section.appendChild(content);

            let total = 0;
            for (const item of $app.store.cart) {
                const cartItem = document.createElement("cart-item");
                cartItem.dataset.cartItem = JSON.stringify(item);
                section.querySelector("ul").append(cartItem);
                total += item.product.price * item.quantity;
            }

            this.root.querySelector("ul").innerHTML += `
              <li>
                  <p class='total'>Total</p>
                  <p class='price-total'>$${total.toFixed(2)}</p>
              </li>  
            `;
        }

        this.setFormBindings(this.root.querySelector("form"));
    }

    setFormBindings(form) {
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                alert(`Thanks for your order ${this.#user.name}.`);
                this.#user.name = "";
                this.#user.email = "";
                this.#user.phone = "";
                // TODO Send the data to the server
                $app.store.cart = [];
                Router.go("/", { addToHistory: true });
            });

            // Set double data binding
            this.#user = new Proxy(this.#user, {
                set(target, property, value) {
                    target[property] = value;
                    form.elements[property].value = value;
                    return true;
                },
            });
            Array.from(form.elements).forEach((element) => {
                element.addEventListener("change", (event) => {
                    this.#user[element.name] = element.value;
                });
            });
        }
    }
}

customElements.define("order-page", OrderPage);
