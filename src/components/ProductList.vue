<template>
  <div class="body-wrapper">
    <b-row class="justify-content-end">
      <b-button
        variant="outline-warning"
        class="no-outline mr-3"
        v-b-tooltip.hover
        title="Giỏ hàng"
        id="cart"
      >
        <BIconBasket />
      </b-button>

      <b-button
        variant="outline-danger"
        class="no-outline mr-5"
        v-b-tooltip.hover
        title="Ưa thích"
      >
        <BIconHeartFill />
      </b-button>
    </b-row>
    <MyCart />

    <div class="row col-lg-12 col-sm-12 col-md-12 p-0 m-0">
      <div
        class="col-md-3 col-lg-2 col-sm-6 col-xl-2 product-list-wrapper"
        v-for="(item, index) in productList"
        :key="index"
      >
        <div class="product">
          <img
            @click="selectProduct(index)"
            class="product_img"
            :src="item.url"
          />
          <b-row class="btn-action m-auto">
            <b-col class="px-1" cols="4">
              <b-button
                variant="warning"
                class="cart_add"
                @click="addItem(index)"
                v-b-tooltip.hover
                title="Thêm vào giỏ hàng"
              >
                <BIconCartPlus />
              </b-button>
            </b-col>
            <b-col class="px-1" cols="4">
              <b-button
                variant="danger"
                class="show_info"
                @click="addToWish(index)"
                v-b-tooltip.hover
                title="Thêm vào ưa thích"
              >
                <BIconHeart />
              </b-button>
            </b-col>
          </b-row>
          <strong class="product_name">{{ item.name }}</strong
          ><br />
          <b-row class="m-auto p-0">
            <b-col cols="6">
              <span class="price" :class="setDiscount(index)">{{
                Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price)
              }}</span>
            </b-col>
            <b-col cols="6">
              <span v-if="item.discount" class="final_price">{{
                calcFinalPrice(index)
              }}</span>
            </b-col>
          </b-row>

          <div v-if="item.discount" class="discount">{{ item.discount }}%</div>

          <div class="col-sm-6 col-lg-6 col-md-5"></div>
          <div class="col-sm-6 col-lg-6 col-md-7 star_rated">
            <b-form-rating
              variant="warning"
              v-model="productList[index].rated"
              readonly
              no-border
              size="sm"
            ></b-form-rating>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconCartPlus,
  BIconHeart,
  BIconBasket,
  BIconHeartFill,
} from "bootstrap-vue";
import MyCart from "./MyCart.vue";
export default {
  name: "ProductList",
  props: {
    msg: String,
  },
  data() {
    return {
      productList: [
        {
          id: 121,
          url: "https://freepngimg.com/convert-png/27428-nike-shoes-transparent-background",
          quantity: "3",
          name: "Sneaker Sport Light Blue",
          price: "1050",
          discount: 10,
          rated: "4.8",
        },
        {
          id: 125,
          url: "https://static.nike.com/a/images/t_default/0d82a8f5-561e-4f12-bac9-c4102e75b8c7/custom-nike-air-force-1-high-by-you-shoes.png",
          quantity: "0",
          name: "Nike Air Force 1",
          price: "580",
          discount: 14,
          rated: "4.2",
        },
        {
          id: 372,
          url: "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-PNG-Cutout.png",
          quantity: "6",
          name: "Nike Luke Cutout",
          price: "600",
          discount: 15,
          rated: "4.6",
        },
        {
          id: 937,
          url: "https://images.tcdn.com.br/img/img_prod/661406/tenis_nike_air_zoom_structure_21_11167_2_20181010104550.jpeg",
          quantity: "3",
          name: "Nike Black & White Sport Lite",
          price: "800",
          discount: 0,
          rated: "5.0",
        },
      ],
      myCart: [],
      wishList: [],
    };
  },
  methods: {
    setDiscount(index) {
      var checkDiscount = this.productList[index].discount;
      if (checkDiscount === 0) {
        return { break: false, show: false };
      } else {
        return { break: true, show: true };
      }
    },
    handleIcrement() {
      this.count = this.count + 1;
    },
    calcFinalPrice(index) {
      var finalPrice =
        this.productList[index].price -
        (this.productList[index].price * this.productList[index].discount) /
          100;
      var formatfinalPrice = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(finalPrice);
      return formatfinalPrice;
    },

    addItem(index) {
      if (this.productList[index].quantity > 0) {
        var exist_id = this.productList[index].id;
        let find_id = this.myCart.find((el) => el.id === exist_id);
        if (find_id) {
          this.$bvToast.toast(
            this.productList[index].name + " đã có trong giỏ hàng rồi",
            {
              title: `Opps!`,
              variant: "warning",
              solid: true,
            }
          );
        } else {
          this.myCart.push({
            id: this.productList[index].id,
            name: this.productList[index].name,
            url: this.productList[index].url,
            price: this.productList[index].price,
            quantity: 1,
          });
          localStorage.setItem("mycart", JSON.stringify(this.myCart));
          this.$bvToast.toast(
            this.productList[index].name + " đã được thêm vào giỏ hàng",
            {
              title: `Thành công`,
              variant: "success",
              solid: true,
            }
          );
        }
      } else {
        this.$bvToast.toast(
          this.productList[index].name + " hiện đã hết hàng",
          {
            title: `Lỗi`,
            variant: "danger",
            solid: true,
          }
        );
      }
    },
    addToWish(index) {
      var exist_id = this.productList[index].id;
      let find_id = this.wishList.find((el) => el.id === exist_id);
      if (find_id) {
        this.$bvToast.toast(
          this.productList[index].name +
            " sản phẩm đã có sẵn trong mục yêu thích rồi",
          {
            title: `Opps!`,
            variant: "warning",
            solid: true,
          }
        );
      } else {
        this.wishList.push({
          id: this.productList[index].id,
          name: this.productList[index].name,
          url: this.productList[index].url,
          price: this.productList[index].price,
          quantity: 1,
        });
        localStorage.setItem("wishlist", JSON.stringify(this.wishList));

        this.$bvToast.toast(
          this.productList[index].name + " đã được thêm vào danh mục yêu thích",
          {
            title: `Thành công`,
            variant: "success",
            solid: true,
          }
        );
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss" src="@/assets/css/productlist.scss"></style>
