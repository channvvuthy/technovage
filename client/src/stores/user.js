import { defineStore } from 'pinia';
import { handleMutation } from '../utils/graphqlUtils'; // Adjust path as needed

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoading: false,
    data: null,
    token: localStorage.getItem('auth-token') || null,
  }),

  actions: {
    async login(email, password, device) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation Login($email: String!, $password: String!, $device: String!) {
            login(email: $email, password: $password, device: $device)
          }
        `;
        const variables = { email, password, device };
        const { login } = await handleMutation(mutationQuery, variables);
        this.setToken(login);
      } finally {
        this.isLoading = false;
      }
    },

    async createUser(name, email, password) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation CreateUser($name: String!, $email: String!, $password: String!) {
            createUser(name: $name, email: $email, password: $password) {
              name
              email
            }
          }
        `;
        const variables = { name, email, password };
        const { createUser } = await handleMutation(mutationQuery, variables);
        return createUser;
      } finally {
        this.isLoading = false;
      }
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem('auth-token', token);
    },
  },
});
