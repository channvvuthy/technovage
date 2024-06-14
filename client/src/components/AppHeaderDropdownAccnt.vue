<script setup>
import avatar from '@/assets/images/avatars/8.jpg'
import { useRouter } from 'vue-router';
const router = useRouter();

const itemsCount = 42

/**
 * The function is not complete yet. You need to log out of the server to remove the token.
 * Removes the authentication token from local storage, effectively logging the user out.
 *
 * @return {void} No return value.
 */
const logout = () => {
  localStorage.removeItem('auth-token');
  router.push({ name: "Login" });
}
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">


      <CDropdownItem>
        <CIcon icon="cil-user" /> Profile
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-settings" /> Settings
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Lock Account
      </CDropdownItem>
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>