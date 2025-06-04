
<script setup>
import logo from '../assets/logo.png'

</script>

<template>
    <div class="app-header">
        <div class="text-container">
            <h1>Human <br> engagement & peace</h1>
            <h3>Deja atrás la procastinación y organizate con ToDo App!</h3>
            <button @click="$router.push('/auth/signup')" class="button-header">Comienza ya!</button>
        </div>
        <img :src="logo" alt="Logo" class="logo" />
    

    </div>
</template>

<style scoped>
.app-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.text-container {
    min-width: 300px;
    max-width: 600px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: start;
    padding: 20px;

}
img.logo {
display: none;
}

</style>