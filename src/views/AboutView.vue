<template>
  <div class="about-view">
    <div class="header">
      <h1>ℹ️ Acerca del Sistema</h1>
      <p class="subtitle">Sistema de Gestión de Asistencias Universitarias</p>
    </div>

    <div class="content">
      <section class="info-section">
        <h2>📌 Propósito</h2>
        <p>
          Sistema desarrollado para facilitar el registro y control de asistencias en la Facultad de
          Ingeniería de la Universidad Católica de Oriente.
        </p>
      </section>

      <section class="info-section">
        <h2>🛠️ Tecnologías Utilizadas</h2>
        <ul class="tech-list">
          <li>Vue.js 3 (Composition API)</li>
          <li>TypeScript</li>
          <li>Pinia para gestión de estado</li>
          <li>Vue Router para navegación</li>
          <li>Vite como build tool</li>
        </ul>
      </section>

      <section class="info-section">
        <h2>📅 Versión Actual</h2>
        <p>Sistema en versión 1.0.0 (Julio 2023)</p>
      </section>

      <div class="back-link">
        <RouterLink to="/" class="nav-link"> ← Volver al registro de asistencias </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  font-size: 2rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
}

.content {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h2 {
  color: #3498db;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.tech-list {
  padding-left: 1.5rem;
}

.tech-list li {
  margin-bottom: 0.5rem;
}

.back-link {
  margin-top: 2rem;
  text-align: center;
}

.nav-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: #ebf5fb;
}
</style>
