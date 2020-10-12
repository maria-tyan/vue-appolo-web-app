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
            class="button-close" @click="closeOverlay"
          />

          <!-- Loading -->
          <div v-if="loading" class="loading">
            Loading...
          </div>

          <!-- Error -->
          <div v-else-if="error" class="error">
            An error occurred. You must run the server to see results.
          </div>

          <!-- Result -->
          <div v-else-if="data" class="result">
            <h3 class="title">
              Multiplying request results:
            </h3>
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

<style lang="less">
  .card {
    position: relative;
    background: #003755;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 50px;
    width: 100%;
    height: 500px;
    max-width: 500px;
    margin: 0 auto;
  }

  .button-close {
    position: absolute;
    left: auto;
    right: 0;
    top: 0;
    padding: 20px;
    cursor: pointer;
    z-index: 2;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #d7e9f1;
    color: #003755;
  }

  .title {
    font-weight: 400;
    font-style: italic;
    font-size: 40px;
    font-family: Georgia;
    margin: 0 0 20px;
  }

  .text {
    color: #d7e9f1;
    font-family: Verdana;
    font-size: 16px;
    margin: 0 0 40px;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__input {
      margin: 0 10px;
      padding: 0;
      background-color: white;
      border: 1px solid rgba(0,0,0,.13);
      border-radius: 6px;
      font-size: 18px;
      font-weight: 700;
      width: 200px;
      height: 50px;
      border-radius: 50px;
      font-size: 16px;
      color: #003755;
      outline: none;
      transition: box-shadow .3s;
      text-align: center;

      &:hover {
        box-shadow: 0 0 11px rgba(white,.13);
      }

      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      &[type=number] {
        -moz-appearance: textfield;
      }
    }

    &__button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background-color: #009edd;
      color: white;
      border-radius: 50px;
      border: none;
      width: 200px;
      height: 50px;
      padding: 0;
      margin: 10px;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      transition: all .5s ease-in;
      outline: none;
      cursor: pointer;
      overflow: hidden;
      transition: all .3s;

      &:hover {
        box-shadow: 0 4px 4px rgba(white,.13);
      }

      &:disabled {
        cursor: default;
        opacity: .5;
      }
    }
  }

  .animated-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-enter-active,
    &-leave-active {
      transition: all .25s ease;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
