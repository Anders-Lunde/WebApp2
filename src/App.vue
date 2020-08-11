<template>
  <div id="app">
    <div v-if="$store.state.showNavBar === true" id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/morfologi">Morfologi</router-link>|
      <router-link to="/ordforraad">Ordforraad</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 0.1rem;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
