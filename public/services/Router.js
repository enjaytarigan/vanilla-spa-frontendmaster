export const Router = {
    init() {
        document.querySelectorAll("a.navlink").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const route = event.target.getAttribute("href");
                Router.go(route);
            });
        });

        // Process initial URL
        Router.go(location.pathname);
    },
    go(route, { addToHistory = true } = {}) {
        if (addToHistory === true) {
            history.pushState({ route }, "", route);
        }

        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.dataset.productId = route.substring(
                        route.lastIndexOf("-") + 1
                    );
                }
                break;
        }

        if (pageElement) {
            // document.querySelector("main").children[0].remove();
            const cache = document.querySelector("main");
            cache.innerHTML = "";
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            // 404
            document.querySelector("main").innerHTML = "Oups, 404!";
        }
    },
};
