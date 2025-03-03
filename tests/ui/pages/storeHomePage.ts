
export class StoreHomePage {
  // Url and selectors
  static readonly url: string = 'http://opencart.abstracta.us';
  static readonly selectors = {
    searchField: '#search input',
    searchButton: '#search span.input-group-btn',
    productLinks: '.product-thumb div div.caption h4 a',
    addToCartButton: '#button-cart',
    shoppingCartButton: '#cart-total',
    viewShoppingCartButton: 'strong:text(" View Cart")',
    ShoppingCartProductTable: 'div.table-responsive table.table-bordered',
    removeButton: 'button[data-original-title="Remove"]',
    contentText: '#error-not-found div #content p',
  };
}