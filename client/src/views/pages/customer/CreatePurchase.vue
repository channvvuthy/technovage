<template>
    <CModal :visible="visibleLiveDemo" @close="closeModal" aria-labelledby="LiveDemoExampleLabel">
        <form @submit.prevent="createPurchase">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Create Purchase</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <input type="hidden" name="customer_id" :value="customer.id">
                <div class="mb-2">
                    <CFormInput type="text" name="item_name" label="Item Name" />
                </div>
                <div class="mb-2">
                    <CFormInput type="number" name="amount" label="Amount" @keyup="onChangeAmount" />
                </div>

                <div class="mb-2">
                    <CFormInput type="number" disabled name="score" label="Score" v-model="score" />
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="closeModal">
                    Close
                </CButton>
                <CButton color="primary" type="submit" :disable="isPurchasing">
                    {{ isPurchasing ? 'Processing...' : 'Purchase' }}
                </CButton>
            </CModalFooter>
        </form>
    </CModal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, onMounted } from 'vue';
import { extractFormData } from '../../../utils/form.js';
import { makeRequiredOnly, validateFields } from '../../../utils/validate.js';
import { useCustomerStore } from '../../../stores/customer';
import { usePurchaseStore } from '../../../stores/purchase';
const customerStore = useCustomerStore();
const purchaseStore = usePurchaseStore();
const score = ref(0);

const isPurchasing = computed(() => purchaseStore.isLoading);

const emit = defineEmits(['closeModal'])

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    customer: {
        type: Object,
        default: () => { },
    },
});

const fetchCustomerData = async (page = 1) => {
    await customerStore.fetchCustomers({ first: 500, page });
};

onMounted(() => {
    fetchCustomerData()
})

const calculateScore = (amount) => {
    const score = Math.floor(amount / 10);
    return score;
}

const onChangeAmount = (e) => {
    score.value = calculateScore(e.target.value);
}

const visibleLiveDemo = ref(props.visible);

watch(() => props.visible, (newVal) => {
    visibleLiveDemo.value = newVal;
});

const createPurchase = async (e) => {

    const { customer_id, item_name, amount } = extractFormData(e, ['customer_id', 'item_name', 'amount']);
    const validationFields = makeRequiredOnly(
        [
            { 'field': 'customer_id', 'val': customer_id, },
            { 'field': 'item_name', 'val': item_name, },
            { 'field': 'amount', 'val': amount, },
        ]
    );
    const isErrors = validateFields(validationFields);

    if (!isErrors.length) {
        await purchaseStore.createPurchase(parseInt(customer_id), item_name, parseFloat(amount));
        await purchaseStore.updateCustomerScore(parseInt(customer_id), parseFloat(score.value));
        customerStore.getRewardsFromPurchase(customer_id, score.value);
        score.value = 0;
        closeModal();
    }
}

const closeModal = () => {
    visibleLiveDemo.value = false;
    emit('closeModal', false);
};
</script>
