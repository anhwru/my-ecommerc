<template>
  <div id="my-container">
    <b-popover
      target="cart"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
    >
      <template #title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        Shopping Cart
      </template>

      <b-container fluid>
        <b-table
          :items="cartItem"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          stacked="md"
          show-empty
          small
          @filtered="onFiltered"
          responsive="sm"
        >
          <template #cell(name)="row">
            <b-row>
              <b-col cols="4" @click="row.toggleDetails">
                <b-img class="img_cart" :src="row.item.url" />
              </b-col>
              <b-col cols="8" class="product_detail">
                <b-row cols="12"
                  ><strong class="product_name">{{
                    row.item.name
                  }}</strong></b-row
                >
                <b-row cols="12"
                  ><span class="mr-2">Color: Red</span>
                  <span>Origin: Japan </span></b-row
                >
              </b-col>
            </b-row>
          </template>
          <template #cell(quantity)="{ item }">
            <b-row cols="12" class="m-auto">
              <b-form-spinbutton
                v-model="item.quantity"
                min="1"
                max="100"
                @change="totalPrice(item)"
              ></b-form-spinbutton>
            </b-row>
          </template>
          <template #cell(price)="{ item }">
            <b-row cols="12" class="m-auto">
              <span>{{
                Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price)
              }}</span>
            </b-row>
          </template>
          <template #cell(total)="{ item }">
            <b-row cols="12" class="m-auto">
              <span>{{
                Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalPrice(item))
              }}</span>
            </b-row>
          </template>
          <template #cell(actions)="row">
            <b-row cols="12" class="m-auto justify-content-center">
              <b-button
                class="del_product"
                variant="out-line"
                @click="row.toggleDetails"
              >
                <BIconTrash variant="danger" @click="getNewList()" />
              </b-button>
            </b-row>
          </template>
        </b-table>

        <b-col sm="12" md="12" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0 justify-content-center"
          ></b-pagination>
        </b-col>
      </b-container>
    </b-popover>
  </div>
</template>

<script>
import { BIconTrash } from "bootstrap-vue";
export default {
  data() {
    return {
      popoverShow: false,
      tableVariants: ["dark"],
      striped: false,
      bordered: true,
      borderless: false,
      outlined: false,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false,
      headVariant: "dark",
      tableVariant: "",
      noCollapse: false,
      fields: [
        {
          key: "name",
          label: "Name & color",
        },
        {
          key: "price",
          label: "Price",
          class: "text-center",
        },
        {
          key: "quantity",
          label: "Quantity",
          class: "text-center",
        },
        {
          key: "total",
          label: "Total",
          class: "text-center align-ct",
        },
        { key: "actions", label: "Actions", class: "text-center" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],

      items: [
        {
          id: 212,
          name: "CBR250RR",
          url: "https://img.indianautosblog.com/2020/07/24/2021-honda-cbr250rr-red-with-stripes-bbed.jpg",
          price: 7200,
          quantity: 1,
        },
        {
          id: 621,
          name: "CBR1000 RRR",
          url: "https://www.tamiyausa.com/media/CACHE/images/products/honda-cbr1000rr-r-fireblade-sp-none-6-9c2d/e1601299bc10a442af521bbc7c0ef15d.jpg",
          price: 30000,
          quantity: 1,
        },
      ],
    };
  },

  mounted() {
    this.totalRows = this.cartItem.length;
  },

  methods: {
    totalPrice(item) {
      const { quantity, price } = item;
      return quantity * price;
    },
    onClose() {
      this.popoverShow = false;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },

  computed: {
    cartItem() {
      return JSON.parse(localStorage.getItem("mycart"));
    },
  },

  watch: {},
};
</script>
<style scoped lang="scss">
.popover {
  max-width: 100%;
  padding: 0;
}
.img_cart {
  width: 100%;
  height: 60px;
  object-fit: contain;
}
.table-sm th,
.table-sm td {
  vertical-align: middle !important;
}
.b-form-spinbutton {
  height: 1.5rem !important;
  box-shadow: none !important;
  outline: none;
  font-size: 0.75rem !important;
}

.del_product {
  outline: none;
  border: none;
  box-shadow: none;
}
.align-ct .row {
  justify-content: center;
}
.product_name {
  font-size: 12px;
}
i.page-item.disabled.flex-fill {
  width: 30px !important;
  flex: 0 !important;
}

span.page-link {
  width: 30px;
}
bdi {
  font-size: 0.75rem !important;
}
</style>
