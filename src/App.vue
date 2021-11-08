<template>
  <div id="nav" class="h2">
    <span>
      <router-link to="/">Home</router-link>
    </span>
    <span>
      <router-link to="/products">Products</router-link>
    </span>
    <span>
      <router-link to="/detail">Detail</router-link>
    </span>
    <span>
      <router-link to="/category">Category</router-link>
    </span>
    <span>
      <router-link to="/about">About</router-link>
    </span>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

span {
  padding: 15px;
}
</style>
