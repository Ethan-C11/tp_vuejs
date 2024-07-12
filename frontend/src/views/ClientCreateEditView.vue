<template>
  <div>
    <div class="client" v-if="!loading && client">
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Ajouter un client
          </h1>
          <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
        </div>
        <div v-if="!isNewClient" class="col text-end">
          <button @click="onDeleteClient(client)" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />
            Supprimer le client
          </button>
        </div>
      </div>

      <div class="alert alert-danger my-3" v-if="error">Un champ requière votre attention</div>

      <div class="row">
        <div class="col-md-12">
          <h2> Contact </h2>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="client.firstName"
              class="form-control"
              placeholder="John"
              :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstName" class="form-label">Prenom</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
              placeholder="Doe"
              v-model="client.lastName"
              :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom de famille</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="function"
                id="function"
                class="form-control"
                placeholder="Directeur"
                v-model="client.function"
                :class="{ 'is-invalid': !client.function }"
            />
            <label for="function" class="form-label">Fonction</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="phone"
                id="phone"
                class="form-control"
                placeholder="+33651187649"
                v-model="client.phone"
                :class="{ 'is-invalid': !client.phone }"
            />
            <label for="phone" class="form-label">Téléphone</label>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="email"
                id="email"
                class="form-control"
                placeholder="example.email@gmail.com"
                v-model="client.email"
                :class="{ 'is-invalid': !client.email }"
            />
            <label for="email" class="form-label">Adresse e-mail</label>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="companyName"
                id="companyName"
                class="form-control"
                placeholder="Aperture Science"
                v-model="client.companyName"
                :class="{ 'is-invalid': !client.companyName }"
            />
            <label for="companyName" class="form-label">Entreprise</label>
          </div>
        </div>
        <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
              type="date"
              name="date"
              id="date"
              class="form-control"
              placeholder="Date"
              format="yyyy-MM-dd"
              v-model="client.date"
              :class="{ 'is-invalid': !client.date }"
          />
          <label for="date" class="form-label">Ajouté le</label>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h2> Adresse </h2>
        </div>
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="address1"
                id="address1"
                v-model="client.address.address1"
                class="form-control"
                placeholder="6 Place Saint-Vincent"
                :class="{ 'is-invalid': !client.address.address1 }"
            />
            <label for="address1" class="form-label">Adresse 1</label>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="address2"
                id="address2"
                class="form-control"
                placeholder="Doe"
                v-model="client.address.address2"
            />
            <label for="address2" class="form-label">Adresse 2</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="postCode"
                id="postCode"
                class="form-control"
                placeholder="57000"
                v-model="client.address.postCode"
                :class="{ 'is-invalid': !client.address.postCode }"
            />
            <label for="postCode" class="form-label">Code Postal</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="city"
                id="city"
                class="form-control"
                placeholder="Metz"
                v-model="client.address.city"
                :class="{ 'is-invalid': !client.address.city }"
            />
            <label for="city" class="form-label">Ville</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="country"
                id="country"
                class="form-control"
                placeholder="France"
                v-model="client.address.country"
                :class="{ 'is-invalid': !client.address.country }"
            />
            <label for="email" class="form-label">Pays</label>
          </div>
        </div>
      </div>

      <p class="text-end">
        <button
          @click="onSave()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>

      <AppDebug :datas="client" />
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { clients } from '@/seeds/clients.js'
import { mapActions, mapState, mapWritableState } from 'pinia'
import {useClientStore} from "@/stores/client.js";
export default {
  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      error: false
    }
  },
  mounted() {
    // avant de monter le composant de la vue, on charge les données de la facture à éditer
    this.setClient(this.id)
  },
  computed: {
    ...mapState(useClientStore, {
      loading: 'loading'
    }),
    // le formulaire local 'client' est mappé sur la donnée du store 'item'
    // attention, pour pouvoir modifier les données d'un état du store (stae), il faut utiliser mpaWritableState plutôt que mapState (qui est pour la lecture seule)
    ...mapWritableState(useClientStore, {
      client: 'item'
    }),

    // ici on a une computed classique
    isNewClient() {
      return this.id === 'new'
    },

    formInvalid() {
      return (
        !this.client ||
        !this.client.firstName ||
        !this.client.lastName ||
        !this.client.companyName ||
        !this.client.date ||
        !this.client.function ||
        !this.client.email ||
        !this.client.address ||
        !this.client.phone
      )
    },
  },
  methods: {
    // pour pouvoir appeler une action du store, il faut l'importer et ici on lui donne un nom local différent 'setClient'
    ...mapActions(useClientStore, {
      setClient: 'setItem',
      updateClient: 'updateItem',
      createClient: 'createItem',
      deleteClient: 'deleteItem'
    }),

    onDeleteClient() {
      this.deleteClient(this.id)
      this.$router.push({ name: 'clients' })
    },
    onSave() {
      // si j'ai une erreur dans le formulaire
      if (this.formInvalid) {
        // gestion des erreurs ici
        this.error = true
      } else {
        this.error = false
        // on appelle la méthode de sauvegarde de la donnée du store
        if (this.isNewClient) {
          console.log('create', this.client)
          this.createClient(this.client)
        } else {
          console.log('update', this.client)
          this.updateClient(this.client)
        }
        // on revient sur la page précédente
        this.$router.push({ name: 'clients' })
      }
    }
  },

}
</script>
