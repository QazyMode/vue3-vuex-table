<template>
  <div
    class="invoice-box"
  >
    <h1 class="title">Vue Invoice Calc</h1>
    <div
      class="controls"
    >
      <div
        class="controls__inputs"
      >
        <a-input
          v-model:value="newItem.name"
          class="input-name"
          placeholder="Product name"
        />
        <a-input-number
          v-model:value="newItem.price"
          class="input-default"
          placeholder="Price"
        />
        <a-input-number
          v-model:value="newItem.qty"
          class="input-default"
          placeholder="Qty"
        />
      </div>
      <a-button
        type="primary"
        :disabled="requiredFieldsAreEmpty"
        @click.prevent="addProduct"
      >
        Add
      </a-button>
    </div>
    <Table
      :items="products"
      @set-selected="setSelected"
    />
    <div
      class="controls"
    >
      <a-button
        type="primary"
        :disabled="noSelectedIds"
        @click.prevent="deleteProduct"
      >
        Delete
      </a-button>
      <span
        class="controls__total"
      >
        Total: {{ convertToDollar(total) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ref,
} from 'vue';

import { useStore } from 'vuex';
import useConverter from '@/composables/converter';
import Table from '@/components/table.vue';

type Item = {
  name: string | null,
  price: number | null,
  qty: number | null,
}

export default defineComponent({
  name: 'VueInvoiceCalc',
  components: {
    Table,
  },
  setup() {
    const store = useStore();

    const newItem: Item = reactive({
      name: null,
      price: null,
      qty: null,
    });

    const {
      convertToDollar,
    } = useConverter();

    const selectedIds = ref([]);

    const noSelectedIds = computed(() => selectedIds.value.length === 0);
    const requiredFieldsAreEmpty = computed(() => !(newItem.name?.length > 0 && newItem.price > 0 && newItem.qty > 0));

    const setSelected = (ids) => {
      selectedIds.value = ids;
    };

    const addProduct = () => {
      store.commit('ADD_PRODUCT', newItem);
      Object.keys(newItem).forEach((i) => {
        newItem[i] = null;
      });
    };

    return {
      newItem,
      total: computed(() => store.getters.totalSum),
      products: computed(() => store.getters.products),
      addProduct,
      deleteProduct: () => store.commit('DELETE_PRODUCTS', selectedIds.value),
      convertToDollar,
      setSelected,
      noSelectedIds,
      requiredFieldsAreEmpty,
    };
  },
});
</script>

<style lang="scss" scoped>
.invoice-box {
  max-width: 1000px;
  margin: 100px auto;
}

.title {
  font-size: 38px;
  text-align: left;
  padding-left: 10px;
}

.input {
  &-name {
    width: 500px;
  }

  &-default {
    width: 10%;
    margin-left: 20px;
  }
}

.controls {
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  margin: 20px 0;

  &__inputs {
    display: flex;
    flex-flow: nowrap row;
    justify-content: flex-start;
  }

  &__total {
    margin-right: 15px;
  }
}
</style>
