<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          v-model="username"
          id="username"
          required
          class="outline mb-5"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          class="outline mb-5"
        />
      </div>
      <button type="submit" class="border-2 border-black">Login</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import api from "./api.js";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const token = await api.login(this.username, this.password);
        localStorage.setItem("authToken", token);
        this.$emit("login-success");
      } catch (error) {
        this.error = "Invalid username or password";
        console.error("Login error:", error);
      }
    },
  },
};
</script>

<style></style>
