(function fragments() {

    class ProductList extends HTMLElement {
        connectedCallback() {
            this.refresh = this.refresh.bind(this);
            this.products = {};

            this.log('connected');
            this.refresh();
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

            Object.keys(this.products).forEach(function (key, pos) {
                document.getElementById(`addToCart-${pos}`).addEventListener("click", function () {
                    fireEvent(this, 'addToCart', { 'productId': key });
                }.bind(this));
            }, this);
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
