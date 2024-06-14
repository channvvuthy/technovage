<template>
  <div class="bwrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <form @submit.prevent="onRegister">
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Name" autocomplete="name" name="name" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autocomplete="email" name="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput type="password" placeholder="Password" autocomplete="new-password" name="password" />
                </CInputGroup>

                <div class="d-grid">
                  <CButton color="success" type="submit">{{ userStore.isLoading ? 'Processing...' :
                    'Create Account' }}</CButton>
                </div>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<script setup>
import { extractFormData } from '../../utils/form.js';
import { makeRequiredOnly, validateFields } from '../../utils/validate.js';
import { useUserStore } from '../../stores/user';
const userStore = useUserStore();
import { useRouter } from 'vue-router';
const router = useRouter();


const onRegister = async (e) => {
  const { email, password, name } = extractFormData(e, ['name', 'email', 'password']);
  const validationFields = makeRequiredOnly(
    [
      { 'field': 'name', 'val': name, },
      { 'field': 'email', 'val': email, },
      { 'field': 'password', 'val': password }
    ]
  );
  const isErrors = validateFields(validationFields);

  if (!isErrors.length) {
    await userStore.createUser(name, email, password);
    router.push({ name: "Login" });
  }
}
</script>