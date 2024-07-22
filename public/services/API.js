const API = {
    url: "./data/menu.json",
    async fetchMenu() {
        const response = await fetch(this.url);
        return response.json();
    },
};

export default API;
