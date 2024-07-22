import API from "./API.js";

export async function loadMenu() {
    $app.store.menu = await API.fetchMenu();
}

export async function getProductById(productId) {
    if ($app.store.menu == null) {
        await loadMenu();
    }

    for (const category of $app.store.menu) {
        for (const product of category.products) {
            if (product.id == productId) {
                return product;
            }
        }
    }

    return null;
}
