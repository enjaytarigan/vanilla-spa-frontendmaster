export class MenuPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");

        const loadCss = async () => {
            const res = await fetch("/components/MenuPage.css");
            const css = await res.text();
            style.textContent = css;
            this.root.appendChild(style);
        };

        loadCss();
    }

    connectedCallback() {
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("appmenuchange", () => {
            this.renderMenu();
        });

        this.renderMenu();
    }

    renderMenu() {
        this.root.querySelector("#menu").innerHTML = "";
        if ($app.store.menu) {
            for (const category of $app.store.menu) {
                const liCategory = document.createElement("li");
                liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class='category'>
                    </ul>
                 `;

                for (const product of category.products) {
                    const productItem = document.createElement("product-item");
                    productItem.dataset.product = JSON.stringify(product);
                    liCategory.querySelector("ul").appendChild(productItem);
                }

                this.root.querySelector("#menu").appendChild(liCategory);
            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }
}

customElements.define("menu-page", MenuPage);
