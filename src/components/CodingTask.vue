<template>
  <div class="card">
    <transition name="animation" mode="out-in">
      <div
        v-if="animate"
        class="animation"
      >
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
          >
            Submit form
          </button>
        </form>
      </div>
    </transition>

    <ApolloQuery
      :query="require('../graphql/Persons.gql')"
    >
      <div slot-scope="{ result: { loading, error, data } }">

        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div
            v-for="person of data.persons"
            :key="person.val1"
            class="person"
          >
            {{ person.val2 }}
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </div>
    </ApolloQuery>
    <button class="form__button button" @click="showForm">
      Show form
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1,
      animate: true,
    };
  },
  computed: {
    isDisabled() {
      return !(this.number > 0 && this.number <= 10);
    },
  },
  methods: {
    showForm() {
      this.animate = !this.animate;
    },
  },
};
</script>

<style lang="less">
  .card {
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

      // .numeric-input {
      //   outline: none;
      //   border: 0px solid transparent !important;
      //   border-radius: 50px !important;
      //   font-size: 16px;
      //   color: #003755;
      //   height: 100%;
      //   transition: box-shadow .3s;

      //   &:hover {
      //     box-shadow: 0 0 11px rgba(white,.13);
      //   }
      // }
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

  .animation-enter-active, .animation-leave-active {
    transition: all .5s ease;
  }
  .animation-enter, .animation-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
