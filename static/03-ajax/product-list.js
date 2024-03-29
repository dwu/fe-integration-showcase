class ProductList extends HTMLElement {
    connectedCallback() {
        this.refresh = this.refresh.bind(this);
        this.products = {};

        this.log("connected");
        this.refresh();
    }
    refresh() {
        this.log("refresh");
        axios.get("/api/products").then((response) => {
            this.products = response.data.items;
            this.render();
        });
    }
    render() {
        this.log("render");

        this.innerHTML = `
            <div id="product-list">
                <h2>Product List</h2>
                <ul>
                    ${Object.keys(this.products).map(function(key) {
                        return `<li id="product-${key}">${this.products[key].name} (${this.products[key].price}€) <button id="addToCart-${key}">Add to cart</button></li>`;
                    }, this).join("")}
                </ul>
            </div>`;

        // Attach handlers
        Object.keys(this.products).map(function(key) {
            document.getElementById(`product-${key}`).addEventListener("mouseenter", function () {
                this.mouseEnter(key);
            }.bind(this));
            // no handler for button click in this example
        }, this);
    }
    mouseEnter(productId) {
        const event = new CustomEvent("hoverProduct", { "detail": { "productId" : productId } });
        this.dispatchEvent(event);
    }
    disconnectedCallback() {
        this.log("disconnected");
    }
    log(...args) {
        console.log("product-list", ...args);
    }
}

window.customElements.define("product-list", ProductList);
