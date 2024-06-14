<template>
  <div>
    <div class="pb-3">
      <CButton color="success text-white " @click="showAddNew">
        <CIcon icon="cil-user-follow" height="20" />
        <span class="pl-1"> Add New Purchase</span>
      </CButton>
    </div>
    <div class="mb-2" v-if="isLoading">Loading...</div>
    <CTable v-else>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col" v-for="(th, index) in thead" :key="index">
            {{ th }}
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(purchase, index) in purchases" :key="purchase.id">
          <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ purchase.customer.name }}</CTableDataCell>
          <CTableDataCell>{{ purchase.item_name }}</CTableDataCell>
          <CTableDataCell>{{ purchase.amount }}</CTableDataCell>
          <CTableDataCell>{{ purchase.created_at }}</CTableDataCell>
          <CTableDataCell>{{ purchase.updated_at }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <div class="pagination">
      <CButton color="info" @click="prevPage" :disabled="isFirstPage">Previous</CButton>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <CButton color="info" @click="nextPage" :disabled="isLastPage">Next</CButton>
    </div>
    <AddPurchase :visible="isAdd" @closeModal="isAdd = false" />
  </div>


</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { usePurchaseStore } from '../../../stores/purchase';
const purchaseStore = usePurchaseStore();
import AddPurchase from "./CAddPurchase.vue";
const isAdd = ref(false);

const thead = ref([
  '#',
  'Customer Name',
  'Item Name',
  'Amount',
  'Created At',
  'Updated At',
]);

const purchases = computed(() => purchaseStore.purchases);
const isLoading = computed(() => purchaseStore.isLoading);

const showAddNew = () => {
  isAdd.value = true;
}

const currentPage = ref(1);
const totalPages = computed(() => purchaseStore.paginatorInfo.lastPage);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const fetchpurchaseData = async (page = 1) => {
  await purchaseStore.fetchPurchases({ first: 20, page });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchpurchaseData(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchpurchaseData(currentPage.value);
  }
};

onMounted(() => {
  fetchpurchaseData(currentPage.value);
});
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
}

.pagination button {
  margin: 0 0.5em;
}
</style>
