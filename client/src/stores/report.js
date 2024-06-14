import { defineStore } from 'pinia';
import { handleQuery } from '../utils/graphqlUtils'; // Adjust path as needed

export const useReportStore = defineStore('reportStore', {
  state: () => ({
    isCustomerLoading: false,
    isUserLoading: false,
    isPurchaseLoading: false,
    countCustomers: 0,
    countUsers: 0,
    countPurchases: 0,
  }),

  actions: {
    async fetchCountUsers() {
      this.isUserLoading = true;
      try {
        const query = `
          query {
            countUsers
          }
        `;
        const { countUsers } = await handleQuery(query);
        this.countUsers = countUsers;
      } finally {
        this.isUserLoading = false;
      }
    },

    async fetchCountCustomers() {
      this.isCustomerLoading = true;
      try {
        const query = `
          query {
            countCustomers
          }
        `;
        const { countCustomers } = await handleQuery(query);
        this.countCustomers = countCustomers;
      } finally {
        this.isCustomerLoading = false;
      }
    },

    async fetchCountPurchases() {
      this.isPurchaseLoading = true;
      try {
        const query = `
          query {
            countPurchases
          }
        `;
        const { countPurchases } = await handleQuery(query);
        this.countPurchases = countPurchases;
      } finally {
        this.isPurchaseLoading = false;
      }
    },
  },
});
