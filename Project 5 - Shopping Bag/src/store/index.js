import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    loadBag(state, products) {
      state.productsInBag = products;
    },
    addProductToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },
    removeProductFromBag(state, productId) {
      state.productsInBag = state.productsInBag.filter(item => item.id != productId);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    }
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        commit('loadProducts', response.data);
      });
    },
    loadBag({ commit }) {
      const productsInBag = localStorage.getItem('productsInBag');
      if (productsInBag)
        commit('loadBag', JSON.parse(productsInBag));
    },
    addProductToBag({ commit }, product) {
      commit('addProductToBag', product);
    },
    removeProductFromBag({ commit }, productId) {
      if (confirm('Tem certeza que deseja remover o item do carrinho?')) {
        commit('removeProductFromBag', productId);
      }
    }
  },
  modules: {
  }
})
