
<script setup>
import fondo from '../assets/fondo.png'
</script>

<template>
    <div class="app-header">
        <div class="text-container">
            <h1>Human <br> engagement & peace</h1>
            <h3>Deja atrás la procastinación y organizate con ToDo App!</h3>
            <button @click="$router.push('/auth/signup')" class="button-header">Comienza ya!</button>
        </div>
        <img :src="fondo" alt="Fondo" class="fondo">

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
img.fondo {
display: none;
}
@media screen and (min-width: 600px) {
    img.fondo {
        display: block;
        height: auto;
    }
    
}
</style>