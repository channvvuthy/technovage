<script setup>
import { onMounted } from 'vue';
import { useReportStore } from '../../stores/report';

const reportStore = useReportStore();

// Function to fetch all counts
const fetchAllCounts = () => {
  reportStore.fetchCountUsers();
  reportStore.fetchCountCustomers();
  reportStore.fetchCountPurchases();
};

onMounted(fetchAllCounts);
</script>

<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC class="mb-3" inverse color="info" :value="reportStore.countUsers.toString()"
        :title="reportStore.isUserLoading ? 'Counting users...' : 'Number registered users'">
        <template #icon>
          <CIcon icon="cilUser" height="36" />
        </template>
      </CWidgetStatsC>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC class="mb-3" inverse color="primary" :value="reportStore.countCustomers.toString()"
        :title="reportStore.isCustomerLoading ? 'Counting customers...' : 'Number of customers'">
        <template #icon>
          <CIcon icon="cilUserFollow" height="36" />
        </template>
      </CWidgetStatsC>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC class="mb-3" inverse color="danger" :value="reportStore.countPurchases.toString()"
        :title="reportStore.isPurchaseLoading ? 'Counting purchase...' : 'Number of purchases'">
        <template #icon>
          <CIcon icon="cil-basket" height="36" />
        </template>
      </CWidgetStatsC>
    </CCol>
  </CRow>
</template>

<style>
.progress {
  display: none;
}
</style>
