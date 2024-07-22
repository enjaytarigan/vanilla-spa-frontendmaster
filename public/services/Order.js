import { getProductById } from "./Menu.js";

export async function addToCart(productId) {
    const product = await getProductById(productId);

    if (product == null) {
        return;
    }

    const productInCart = $app.store.cart.find(
        (c) => c.product.id === productId
    );

    if (productInCart == null) {
        $app.store.cart = [
            ...$app.store.cart,
            { product: product, quantity: 1 },
        ];
    } else {
        $app.store.cart = $app.store.cart.map((c) => {
            c.quantity += 1;
            return c;
        });
    }
}

export async function removeFromCart(productId) {
    $app.store.cart = $app.store.cart.filter((c) => c.product.id != productId);
}
