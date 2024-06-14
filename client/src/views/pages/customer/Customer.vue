<template>
  <div>
    <div class="pb-3 d-flex">
      <div style="width:100%">
        <CButton color="success text-white " @click="showAddNew">
          <CIcon icon="cil-user-follow" height="20" />
          <span class="pl-1"> Add New Customer</span>
        </CButton>
      </div>

      <div class="d-flex justify-content-end">
        <CFormInput type="text" name="q" placeholder="Search..." style="width:300px;" v-model="q"
          @keyup.enter="onSearch" />
      </div>
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
        <CTableRow v-for="(customer, index) in customers" :key="customer.id">
          <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ customer.name }}</CTableDataCell>
          <CTableDataCell>{{ customer.phone_number }}</CTableDataCell>
          <CTableDataCell>{{ customer.registration_date }}</CTableDataCell>
          <CTableDataCell>{{ customer.address }}</CTableDataCell>
          <CTableDataCell>{{ customer.score }}</CTableDataCell>
          <CTableDataCell>{{ customer.created_at }}</CTableDataCell>
          <CTableDataCell>{{ customer.updated_at }}</CTableDataCell>
          <CTableDataCell>
            <div class="d-flex">
              <CButton color="info text-white text-xs" @click="editCustomer(customer)">Edit</CButton>
              <div style="width:10px;"></div>
              <CButton color="danger text-white" @click="confirmDelete(customer)">Delete</CButton>
              <div style="width:10px;"></div>
              <CButton color="success text-white" @click="createPurchase(customer)">Purchase</CButton>
              <div style="width:10px;"></div>
              <CButton color="primary text-white" @click="showCustomerDetail(customer)">Detail</CButton>
            </div>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <div class="pagination">
      <CButton color="info" @click="prevPage" :disabled="isFirstPage">Previous</CButton>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <CButton color="info" @click="nextPage" :disabled="isLastPage">Next</CButton>
    </div>
    <CreatePurchase :visible="isPurchase" @closeModal="isPurchase = false" :customer="customer" />
    <AddCustomer :visible="isAdd" @closeModal="isAdd = false" />
    <DeleteCustomer :visible="isDelete" @closeModal="isDelete = false" :id="customerId" />
    <EditCustomer :visible="isEdit" @closeModal="isEdit = false" :customer="customer" />
    <Detail :visible="isDetail" @closeModal="isDetail = false" :customer="customer" />
  </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useCustomerStore } from '../../../stores/customer';
const customerStore = useCustomerStore();
import AddCustomer from "./AddCustomer.vue";
import EditCustomer from "./EditCustomer.vue";
import DeleteCustomer from "./DeleteCustomer.vue";
import CreatePurchase from "./CreatePurchase.vue";
import Detail from "./Detail.vue";
const isAdd = ref(false);
const isPurchase = ref(false);
const isEdit = ref(false);
const isDetail = ref(false);
const isDelete = ref(false);
const customer = ref({});
const customerId = ref(null);
const q = ref("");

const thead = ref([
  '#',
  'Name',
  'Phone Number',
  'Registration Date',
  'Address',
  'Score',
  'Created At',
  'Updated At',
  'Action'
]);

const customers = computed(() => customerStore.customers);
const isLoading = computed(() => customerStore.isLoading);
const editCustomer = (currentCustomer) => {
  isEdit.value = true;
  customer.value = currentCustomer;
}

const showCustomerDetail = (currentCustomer) => {
  customer.value = currentCustomer;
  isDetail.value = true;
}

const createPurchase = (currentCustomer) => {
  customer.value = currentCustomer;
  isPurchase.value = true;
}

const confirmDelete = ({ id }) => {
  customerId.value = id;
  isDelete.value = true;
}

const showAddNew = () => {
  isAdd.value = true;
}

const currentPage = ref(1);
const totalPages = computed(() => customerStore.paginatorInfo.lastPage);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const fetchCustomerData = async (page = 1) => {
  await customerStore.fetchCustomers({ first: 20, page });
};
const searchCustomerData = async () => {
  if (q.value.trim()) {
    await customerStore.searchCustomers(q.value);
  } else {
    await fetchCustomerData(currentPage.value);
  }
};


const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCustomerData(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchCustomerData(currentPage.value);
  }
};

const onSearch = () => {
  searchCustomerData();
}

onMounted(() => {
  fetchCustomerData(currentPage.value);
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
