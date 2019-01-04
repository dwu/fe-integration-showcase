(function fragments() {

    class ProductList extends HTMLElement {
        connectedCallback() {
            this.refresh = this.refresh.bind(this);
            this.products = {};

            this.log('connected');
            this.refresh();

            window.addEventListener("ShoppingCart-addToCart", (event) => this.addToCart(event.detail.productId));
        }
        refresh() {
            this.log('refresh');
            axios.get('/api/products').then((response) => {
                this.products = response.data.items;
                this.render();
            });
        }
        render() {
            this.log('render');

            this.innerHTML = `
                <div id="product-list">
                    <h2>Product List</h2>
                    <ul>
                        ${Object.keys(this.products).map(function(key) {
                            return `<li>${this.products[key].name} (${this.products[key].price}€) <button onClick="productList_addToCart(${key})">Add to cart</button></li>`;
                        }, this).join('')}
                    </ul>

                </div>`;
        }
        disconnectedCallback() {
            this.log('disconnected');
        }
        log(...args) {
            console.log('product-list', ...args);
        }
    }

    window.customElements.define('product-list', ProductList);

}());

function productList_addToCart(productId) {
    const event = new CustomEvent('ProductList-addToCart', { 'detail': { 'productId' : productId } });
    window.dispatchEvent(event);
}
