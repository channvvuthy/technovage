<template>
    <CModal :visible="visibleLiveDemo" @close="closeModal" aria-labelledby="LiveDemoExampleLabel">
        <form @submit.prevent="createCustomer">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Edit Customer</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div class="mb-2">
                    <CFormInput type="text" name="name" label="Name" :value="customer.name"/>
                </div>
                <div class="mb-2">
                    <CFormInput type="text" name="phone_number" label="Phone Number" :value="customer.phone_number"/>
                </div>
                <div class="mb-2">
                    <CFormInput type="text" name="address" label="Address" :value="customer.address"/>
                </div>

                <div class="mb-2">
                    <CFormInput type="text" name="address" label="Score" disabled :value="customer.score"/>
                </div>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="closeModal">
                    Close
                </CButton>
                <CButton color="primary" type="submit" :disable="isLoading">{{isLoading ? 'Processing...' : 'Save changes' }}
                </CButton>
            </CModalFooter>
        </form>
    </CModal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue';
import { extractFormData } from '../../../utils/form.js';
import { makeRequiredOnly, validateFields } from '../../../utils/validate.js';
import { useCustomerStore } from '../../../stores/customer.js';
const customerStore = useCustomerStore();

const isLoading = computed(() => customerStore.isLoading);

const emit = defineEmits(['closeModal'])

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    customer: {
        type: Object,
        default: () => {}
    }
});

const visibleLiveDemo = ref(props.visible);

watch(() => props.visible, (newVal) => {
    visibleLiveDemo.value = newVal;
});

const createCustomer = async (e) => {

    const { name, phone_number, address } = extractFormData(e, ['name', 'phone_number', 'address']);
    const validationFields = makeRequiredOnly(
        [
            { 'field': 'name', 'val': name, },
            { 'field': 'phone_number', 'val': phone_number, },
            { 'field': 'address', 'val': address }
        ]
    );
    const isErrors = validateFields(validationFields);

    if (!isErrors.length) {
        await customerStore.updateCustomer(props.customer.id, name, phone_number, address);
        closeModal();
    }
}

const closeModal = () => {
    visibleLiveDemo.value = false;
    emit('closeModal', false);
};
</script>
