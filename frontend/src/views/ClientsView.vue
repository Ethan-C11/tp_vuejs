<template>
  <div class="bills">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des clients</h1>
      </div>
      <div class="col text-end">
        <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter un client
        </button>
      </div>
    </div>

    <ClientTableList v-if="!loading && clients">
      <ClientTableRow
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @edit="$router.push({ name: 'edit-client', params: { id: $event.id } })"
        @delete="deleteClient($event.id)"
      />
    </ClientTableList>

    <div v-else>Loading...</div>

    <AppDebug :datas="clients" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import ClientTableRow from "@/components/tables/ClientTableRow.vue";
import {useClientStore} from "@/stores/client.js";
import ClientTableList from "@/components/tables/ClientTableList.vue";
export default {
  components: {
    ClientTableList,
    ClientTableRow,
  },
  computed: {
    ...mapState(useClientStore, {
      clients: 'items',
      loading: 'loading'
    })
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.getClients,
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  // async mounted() {
  //   await this.getBills()
  // },
  methods: {
    ...mapActions(useClientStore, {
      deleteClient: 'deleteItem',
      getClients: 'getItems'
    })
  }
}
</script>
