class ShoppingCart extends HTMLElement {
    connectedCallback() {
        this.refresh = this.refresh.bind(this);
        this.products = {};
        this.cart = [];
        this.total = 0;

        this.log("connected");
        this.refresh();

        handleEvent(this, "addToCart", function (event) {
            this.addToCart(event.productId);
        }.bind(this));
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

        // calculate total
        this.total = 0;
        this.cart.forEach(function (item) {
            this.total += this.products[item].price;
        }, this);

        // render component
        this.innerHTML = `
            <div id="shopping-cart">
                <h2>Shopping Cart</h2>
                <ul>
                    ${this.cart.map(function (key, pos) {
            return `<li>${this.products[key].name} (${this.products[key].price}€) <button id="removeFromCart-${pos}">X</button></li>`;
        }, this).join("")}
                </ul>
                Total: ${this.total} <button id="buy">Buy</button>
                <button id="clear">Clear cart</button>

            </div>`;

        // attach handlers
        this.cart.forEach(function (key, pos) {
            document.getElementById(`removeFromCart-${pos}`).addEventListener("click", function () {
                this.removeFromCart(pos);
            }.bind(this));
        }, this);

        document.getElementById("buy").addEventListener("click", function () {
            if (this.total > 0) {
                alert("Thanks for your " + this.total + "€. :)");
            } else {
                alert("Thanks for nothing!");
            }
            this.clearCart();
        }.bind(this));

        document.getElementById("clear").addEventListener("click", function () {
            this.clearCart();
        }.bind(this));
    }
    disconnectedCallback() {
        this.log("disconnected");
    }
    log(...args) {
        console.log("shopping-cart", ...args);
    }
    addToCart(productId) {
        this.cart.push(productId);
        this.render();
    }
    removeFromCart(pos) {
        this.cart.splice(pos, 1);
        this.render();
    }
    clearCart() {
        this.cart = [];
        this.render();        
    }
}

window.customElements.define("shopping-cart", ShoppingCart);