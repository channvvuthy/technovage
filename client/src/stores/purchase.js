import { defineStore } from 'pinia';
import { handleQuery, handleMutation } from '../utils/graphqlUtils'; 
import { successMessage } from '../utils/message'; // Adjust path as needed

export const usePurchaseStore = defineStore('purchaseStore', {
  state: () => ({
    isLoading: false,
    purchases: [],
    paginatorInfo: {
      currentPage: 1,
      lastPage: 1, // Initialize with default values
    },
  }),

  actions: {
    async fetchPurchases({ first = 20, page = 1 } = {}) {
      this.isLoading = true;
      try {
        const query = `
          query FetchPurchases($first: Int!, $page: Int!) {
            purchases(first: $first, page: $page) {
              data{
                id,
                amount,
                item_name,
                created_at,
                updated_at,
                customer{
                  id,
                  name
                }
              },
              paginatorInfo {
                currentPage
                lastPage
              }
            }
          }
        `;

        const variables = { first, page };

        const data = await handleQuery(query, variables);
        this.purchases = [...data.purchases.data]; // Use spread operator to ensure reactivity
        this.paginatorInfo = { ...data.purchases.paginatorInfo };
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async createPurchase(customer_id, item_name, amount) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation CreatePurchase($customer_id: Int!, $item_name: String!, $amount: Float!) {
            createPurchase(customer_id: $customer_id, item_name:$item_name, amount: $amount,) {
              id,
              item_name,
              amount,
              created_at,
              updated_at,
              customer{
                id,
                name
              }
            }
          }
        `;
        const variables = { customer_id,item_name, amount };
        const { createPurchase } = await handleMutation(mutationQuery, variables);

        // Create a new array with the new customer added to ensure reactivity
        this.purchases = [...this.purchases, createPurchase];

        successMessage("Purchase has been created!");
        return createPurchase;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateCustomerScore(id, score) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation UpdateCustomerScore($id: ID!, $score: Int!) {
            updateCustomerScore(id: $id, score: $score)
          }
        `;
        const variables = { id, score };
        await handleMutation(mutationQuery, variables);

      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCustomer(id) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation DeleteCustomer($id: ID!) {
            deleteCustomer(id: $id) {
              id
            }
          }
        `;
        const variables = { id };
        await handleMutation(mutationQuery, variables);

        // Remove the customer from the customers array
        this.customers = this.customers.filter(customer => customer.id !== id);

        successMessage("Customer has been deleted!");
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
