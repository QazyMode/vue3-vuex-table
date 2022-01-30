<template>
  <a-table
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :data-source="items"
    :pagination="false"
    row-key="id"
  />
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from 'vue';

import useConverter from '@/composables/converter';

const {
  convertToDollar,
} = useConverter();

const columns = [
  {
    title: 'Product name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    customRender: ({ text }) => convertToDollar(text),
  },
  {
    title: 'Qta',
    dataIndex: 'qty',
  },
  {
    title: 'Sum',
    dataIndex: 'sum',
    align: 'right',
    customRender: ({ text }) => convertToDollar(text),
  },
];

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['set-selected'],
  setup(props, context) {
    const state = reactive<{
      selectedRowKeys: number[];
    }>({
      selectedRowKeys: [],
    });

    const onSelectChange = (selectedRowKeys: number[]) => {
      state.selectedRowKeys = selectedRowKeys;
      context.emit('set-selected', selectedRowKeys);
    };

    return {
      columns,
      ...toRefs(state),
      onSelectChange,
    };
  },
});
</script>
