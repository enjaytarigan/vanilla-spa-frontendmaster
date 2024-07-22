import { loadMenu } from "./services/Menu.js";
import Store from "./services/Store.js";
import { Router } from "./services/Router.js";

// Load web components
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { ProductItem } from "./components/ProductItem.js";
import { CartItem } from "./components/CartItem.js";

window.$app = {};
$app.store = Store;
$app.router = Router;

window.addEventListener("DOMContentLoaded", function (e) {
    $app.router.init();
    loadMenu();
});

window.addEventListener("popstate", function (e) {
    $app.router.go(this.location.pathname);
});

window.addEventListener("appcartchange", function (e) {
    const badge = document.getElementById("badge");

    const qty = $app.store.cart.reduce((acc, c) => acc + c.quantity, 0);
    badge.textContent = qty;
    badge.hidden = qty === 0;
});
