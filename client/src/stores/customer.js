import { defineStore } from 'pinia';
import { handleQuery, handleMutation } from '../utils/graphqlUtils'; 
import { successMessage } from '../utils/message'; // Adjust path as needed

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    isLoading: false,
    customers: [],
    paginatorInfo: {
      currentPage: 1,
      lastPage: 1, // Initialize with default values
    },
  }),

  actions: {
    async fetchCustomers({ first = 20, page = 1 } = {}) {
      this.isLoading = true;
      try {
        const query = `
          query FetchCustomers($first: Int!, $page: Int!) {
            customers(first: $first, page: $page) {
              data {
                id
                name
                phone_number
                registration_date
                score
                address,
                purchases{
                  item_name,
                  amount
                },
                created_at
                updated_at,
              }
              paginatorInfo {
                currentPage
                lastPage
              }
            }
          }
        `;

        const variables = { first, page };

        const data = await handleQuery(query, variables);
        this.customers = [...data.customers.data]; // Use spread operator to ensure reactivity
        this.paginatorInfo = { ...data.customers.paginatorInfo };
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    getRewardsFromPurchase(customerId, score) {
      this.customers = this.customers.map(item => {
        if (item.id === customerId) {
          return {
            ...item,
            score: parseInt(item.score, 10) + parseInt(score, 10)
          };
        }
        return item;
      });
    },
    async createCustomer(name, phone_number, address) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation CreateCustomer($name: String!, $phone_number: String!, $address: String!) {
            createCustomer(name: $name, phone_number: $phone_number, address: $address) {
              id
              name
              phone_number
              address
              registration_date
              score
              created_at
              updated_at
            }
          }
        `;
        const variables = { name, phone_number, address };
        const { createCustomer } = await handleMutation(mutationQuery, variables);

        // Create a new array with the new customer added to ensure reactivity
        this.customers = [...this.customers, createCustomer];

        successMessage("A customer has been created!");
        return createCustomer;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateCustomer(id, name, phone_number, address) {
      this.isLoading = true;
      try {
        const mutationQuery = `
          mutation UpdateCustomer($id: ID!, $name: String!, $phone_number: String!, $address: String!) {
            updateCustomer(id: $id, name: $name, phone_number: $phone_number, address: $address) {
              id
              name
              phone_number
              address
              registration_date
              score
              created_at
              updated_at
            }
          }
        `;
        const variables = { id, name, phone_number, address };
        const { updateCustomer } = await handleMutation(mutationQuery, variables);

        // Find the index of the existing customer
        const index = this.customers.findIndex(customer => customer.id === id);

        if (index !== -1) {
          // Create a new array with the updated customer data
          this.customers = [
            ...this.customers.slice(0, index),
            updateCustomer,
            ...this.customers.slice(index + 1)
          ];
        }

        successMessage("A customer has been updated!");
        return updateCustomer;
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

    async searchCustomers(query) {
      this.isLoading = true;
      try {
        const searchQuery = `
          query SearchCustomers($query: String!) {
            searchCustomers(query: $query) {
              id
              name
              phone_number
              registration_date
              score
              address
              created_at
              updated_at
            }
          }
        `;

        const variables = { query };
        const { searchCustomers } = await handleQuery(searchQuery, variables);

        this.customers = [...searchCustomers]; // Update customers state with search results
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
