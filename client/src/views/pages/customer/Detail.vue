<template>
    <CModal :visible="visibleLiveDemo" @close="closeModal" aria-labelledby="LiveDemoExampleLabel">
        <CModalHeader>
            <CModalTitle id="LiveDemoExampleLabel">Customer Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="mb-3"><b>Name:</b> {{ customer.name }}</div>
            <div class="mb-3"><b>Phone Number:</b> {{ customer.phone_number }}</div>
            <div class="mb-3"><b>Registration Date:</b> {{ customer.registration_date }}</div>
            <div class="mb-3"><b>Score:</b> {{ customer.score }}</div>
            <div class="mb-3"><b>Purchased Histories</b></div>
            <div v-if="customer.purchases && customer.purchases.length" style="max-height:300px; overflow-y:scroll;">
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">
                                Item Name
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                                Amount
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(purchased, index) in customer.purchases" :key="index">
                            <CTableDataCell>{{ purchased.item_name }}</CTableDataCell>
                            <CTableDataCell>${{ purchased.amount }}</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>

            </div>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="closeModal">
                Close
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    customer: {
        type: Object,
        default: () => { }
    }
});

const visibleLiveDemo = ref(props.visible);

watch(() => props.visible, (newVal) => {
    visibleLiveDemo.value = newVal;
});

const emit = defineEmits(['closeModal']);

const closeModal = () => emit("closeModal");

</script>