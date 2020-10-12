<template>
  <div class="card">
    <transition name="animated-block" mode="out-in">
      <div
        v-if="showForm"
        class="animated-block"
      >
        <h1 class="title">
          Hello!
        </h1>
        <p class="text">
          Please, choose a valid value between 1 and 10.
        </p>
        <form class="form" @submit.prevent>
          <input
            v-model.number="number"
            type="number"
            class="form__input"
          />
          <button
            class="form__button button"
            type="submit"
            :disabled="isDisabled"
            @click="submitForm"
          >
            Submit form
          </button>
        </form>
      </div>
      <ApolloQuery
        v-else
        class="overlay"
        :query="require('../graphql/Request.gql')"
        :variables="{ input1: number }"
      >
        <div slot-scope="{ result: { loading, error, data } }">
          <font-awesome-icon
            icon="times"
            class="overlay__button-close" @click="closeOverlay"
          />

          <!-- Loading -->
          <div v-if="loading" class="loading">
            <p class="text">
              Loading...
            </p>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="error">
            <p class="text">
              An error occurred.
            </p>
            <p class="text">
              You must run the server to see results.
            </p>
          </div>

          <!-- Result -->
          <div v-else-if="data" class="result">
            <h3 class="title">
              Results
            </h3>
            <p class="text">
              Multiplying request results
            </p>
            <div
              class="result__info"
            >
              {{ data.request[0] * data.request[1] }}
            </div>
          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">No results :(</div>
        </div>
      </ApolloQuery>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1,
      showForm: true,
    };
  },
  computed: {
    isDisabled() {
      return !(this.number > 0 && this.number <= 10);
    },
  },
  methods: {
    closeOverlay() {
      this.showForm = true;
    },
    submitForm() {
      this.showForm = false;
    },
  },
};
</script>
