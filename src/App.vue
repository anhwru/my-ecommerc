<template>
  <div id="app">
    <ProductList />
    <MyCart />
  </div>
</template>

<script>
import ProductList from "./components/ProductList";
import MyCart from "./components/MyCart";

export default {
  name: "App",
  components: {
    ProductList,
    MyCart,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
/* @font-face {
  font-family: "Merienda";
  src: local("Merienda"),
    url(./fonts/Merienda/Merienda-Regular.ttf)format("truetype");
} */
#app {
  font-family: "Poppins", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  font-family: "Poppins", sans-serif !important;
}
.b-form-spinbutton button.btn.btn-sm.border-0.rounded-0.py-0 {
  font-size: 0.5rem !important;
}
.b-form-spinbutton .btn-sm {
  font-size: 0.5rem !important;
}
.table-sm th,
.table-sm td {
  vertical-align: middle !important;
}
button.page-link {
  font-size: 10px !important;
}
li.page-item {
  font-size: 10px !important;
}
</style>
<style scoped lang="scss" src="@/assets/css/style.scss"></style>
