import { clientInterface } from '@/interfaces/client'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
    state: () => ({
        items: null,
        item: null,
        loading: false
    }),
    getters: {},
    actions: {
        async getItems() {
            console.log('fetch clients')
            this.loading = true
            try {
                const response = await this.$http.get('/clients')
                this.items = response.data
                this.loading = false
            } catch (error) {
                console.error(error)
                this.loading = false
            }
        },

        async setItem(id) {
            if (id === 'new') {
                this.item = { ...clientInterface }
            } else {
                this.loading = true
                try {
                    const response = await this.$http.get('/clients/' + id)
                    this.item = response.data
                    this.loading = false
                } catch (error) {
                    console.error(error)
                    this.loading = false
                }
            }
        },

        async updateItem(form) {
            this.loading = true
            try {
                const response = await this.$http.patch('/clients/' + form.id, form)
                console.log(response.data)
                this.loading = false
            } catch (error) {
                console.error(error)
                this.loading = false
            }
        },
        async createItem(form) {
            this.loading = true
            try {
                const response = await this.$http.post('/clients', form)
                console.log(response.data)
                // this.item = { ...response.data }
                this.loading = false
            } catch (error) {
                console.error(error)
                this.loading = false
            }
        },

        async deleteItem(id) {
            this.loading = true
            try {
                const response = await this.$http.delete('/clients/' + id)
                console.log(response.data)
                this.loading = false
            } catch (error) {
                console.error(error)
                this.loading = false
            }
        }
    }
})
