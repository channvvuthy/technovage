<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <form @submit.prevent="onLogin">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autocomplete="email" name="email" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autocomplete="current-password"
                      name="password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type="submit"> {{ userStore.isLoading ? 'Processing...' :
                        'Login' }} </CButton>
                    </CCol>

                  </CRow>
                </form>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Join our community and discover a world of possibilities. Create your account to access exclusive content and personalized features.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3" @click="register">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
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

/**
 * Handles the login process asynchronously.
 *
 * @param {Event} e - The event object triggered by the login form submission.
 * @return {Promise<void>} - A promise that resolves when the login process is complete.
 */
const onLogin = async (e) => {
  const { email, password } = extractFormData(e, ['email', 'password']);
  const validationFields = makeRequiredOnly([{ 'field': 'email', 'val': email, }, { 'field': 'password', 'val': password }]);
  const isErrors = validateFields(validationFields);

  if (!isErrors.length) {
    await userStore.login(email, password, "web");
    router.push('/dashboard');
  }
}

const register = () => {
  router.push({ name: 'Register' })
}
</script>
