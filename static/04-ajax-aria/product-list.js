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
                        return `<li><span id="product-${key}">${this.products[key].name} (${this.products[key].price}€)</span> <button id="addToCart-${key}" aria-label="Add ${this.products[key].name} to cart, costs ${this.products[key].price}€">Add to cart</button></li>`;
                    }, this).join("")}
                </ul>
            </div>`;

        // Attach handlers
        Object.keys(this.products).map(function(key) {
            document.getElementById(`product-${key}`).addEventListener("mouseenter", function () {
                this.mouseEnter(key);
            }.bind(this));
            document.getElementById(`addToCart-${key}`).addEventListener("click", function () {
                alert("Added to cart");
            }.bind(this));
        }, this);
    }
    mouseEnter(productId) {
        const event = new CustomEvent("hoverProduct", { "detail": { "productId" : productId } });
        setTimeout(() => { this.dispatchEvent(event); }, 100); // delay required for making screen reader work for product info
    }
    disconnectedCallback() {
        this.log("disconnected");
    }
    log(...args) {
        console.log("product-list", ...args);
    }
}

window.customElements.define("product-list", ProductList);
