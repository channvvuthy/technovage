<template>
    <CModal :visible="visibleLiveDemo" @close="closeModal" aria-labelledby="LiveDemoExampleLabel">
        <form @submit.prevent="deleteCustomer">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Confirm Message</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Are you confident in your decision to delete this item?
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="closeModal">
                    Close
                </CButton>
                <CButton color="danger text-white" type="submit" :disable="isLoading">{{ isLoading ? 'Processing...' :
                    'Delete' }}
                </CButton>
            </CModalFooter>
        </form>
    </CModal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue';
import { useCustomerStore } from '../../../stores/customer.js';
const customerStore = useCustomerStore();

const isLoading = computed(() => customerStore.isLoading);

const emit = defineEmits(['closeModal'])

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    id: {
        type: Number,
        default: () => 0
    }
});

const visibleLiveDemo = ref(props.visible);

watch(() => props.visible, (newVal) => {
    visibleLiveDemo.value = newVal;
});

const deleteCustomer = async () => {
    await customerStore.deleteCustomer(props.id);
    closeModal();

}

const closeModal = () => {
    visibleLiveDemo.value = false;
    emit('closeModal', false);
};
</script>
