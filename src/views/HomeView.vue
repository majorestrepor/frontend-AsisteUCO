<template>
  <div class="asisteuco-app">
    <header class="app-header">
      <div class="header-content">
        <img src="/Logo_Mesa-de-trabajo-1-1.png" alt="Logo UCO" class="header-logo" />
        <div class="titles">
          <h1 class="app-title">AsisteUCO</h1>
          <p class="app-subtitle">Gestión de Asistencias Universitarias</p>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="control-panel">
        <div class="control-group">
          <label class="control-label">Seleccione el grupo:</label>
          <select v-model="selectedGrupoId" @change="loadEstudiantes" class="course-select">
            <option disabled value="">Seleccione un grupo</option>
            <option v-for="grupo in grupos" :key="grupo.id" :value="grupo.id">
              {{ grupo.materia.nombre }} - {{ grupo.profesor.nombresCompletos }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Seleccione la fecha:</label>
          <div class="date-input-container">
            <input type="date" v-model="selectedDate" :max="today" class="date-picker" />
          </div>
        </div>
      </div>

      <div class="student-list">
        <div v-if="estudiantesGrupo.length === 0" class="empty-state">
          <p>No hay estudiantes registrados en este grupo</p>
        </div>

        <div class="student-item" v-for="eg in estudiantesGrupo" :key="eg.id">
          <div class="student-info">
            <div class="student-name">{{ eg.estudiante.nombresCompletos }}</div>
          </div>
          <div class="attendance-controls">
            <button
              @click="markPresent(eg.id)"
              class="attendance-btn present"
              :class="{ active: asistenciaMap[eg.id] === true }"
            >
              Presente
            </button>
            <button
              @click="markAbsent(eg.id)"
              class="attendance-btn absent"
              :class="{ active: asistenciaMap[eg.id] === false }"
            >
              Ausente
            </button>
          </div>
        </div>
      </div>

      <div class="action-container">
        <button
          class="action-btn"
          @click="submitAttendance"
          :disabled="Object.keys(asistenciaMap).length === 0"
        >
          Guardar Asistencias
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getGrupos,
  getEstudiantesPorGrupo,
  registrarAsistencia,
} from '@/services/attendanceService'

interface Grupo {
  id: string
  materia: { nombre: string }
  profesor: { nombresCompletos: string }
}

interface EstudianteGrupo {
  id: string
  estudiante: { nombresCompletos: string }
}

interface RegistrarAsistenciaPayload {
  grupoId: string
  fecha: string
  estudiantes: { estudianteGrupoId: string; asistio: boolean }[]
}

const grupos = ref<Grupo[]>([])
const estudiantesGrupo = ref<EstudianteGrupo[]>([])
const selectedGrupoId = ref<string>('')

const today = new Date().toISOString().split('T')[0]
const selectedDate = ref<string>(today)

const asistenciaMap = ref<Record<string, boolean>>({})

const loadEstudiantes = async () => {
  if (!selectedGrupoId.value) return
  estudiantesGrupo.value = await getEstudiantesPorGrupo(selectedGrupoId.value)
  asistenciaMap.value = {}
}

const markPresent = (id: string) => {
  asistenciaMap.value[id] = true
}

const markAbsent = (id: string) => {
  asistenciaMap.value[id] = false
}

const submitAttendance = async () => {
  const payload: RegistrarAsistenciaPayload = {
    grupoId: selectedGrupoId.value,
    fecha: selectedDate.value,
    estudiantes: Object.entries(asistenciaMap.value).map(([estudianteGrupoId, asistio]) => ({
      estudianteGrupoId,
      asistio,
    })),
  }
  await registrarAsistencia(payload)
  alert('Asistencias guardadas correctamente')
}

onMounted(async () => {
  grupos.value = await getGrupos()
  if (grupos.value.length > 0) {
    selectedGrupoId.value = grupos.value[0].id
    await loadEstudiantes()
  }
})
</script>

<style>
:root {
  --verde-100: #f0fdf4;
  --verde-200: #bbf7d0;
  --verde-300: #86efac;
  --verde-500: #22c55e;
  --verde-600: #16a34a;
  --verde-700: #15803d;
  --amarillo-100: #fef9c3;
  --amarillo-300: #fde047;
  --amarillo-500: #facc15;
  --amarillo-600: #eab308;
  --gris-100: #f9fafb;
  --gris-300: #d1d5db;
  --gris-500: #6b7280;
  --gris-700: #374151;
  --gris-800: #1f2937;
  --blanco: #ffffff;
  --sombra-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --sombra: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --sombra-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --sombra-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.asisteuco-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--amarillo-100), var(--verde-500));
}

.app-header {
  background: linear-gradient(135deg, var(--amarillo-300), var(--verde-700));
  color: var(--blanco);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: var(--sombra-lg);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  flex-wrap: wrap;
}

.header-logo {
  width: 150px;
  height: auto;
  object-fit: contain;
}

.titles {
  flex: 1;
}

.app-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  color: var(--gris-800);
}

.app-subtitle {
  font-size: 1.1rem;
  color: var(--gris-800);
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  /* FONDO CON COLOR */
  background: var(--verde-600); /* Degradado verde claro */

  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.control-group {
  flex: 1;
  min-width: 250px;
}

.control-label,
.student-name {
  color: var(--gris-800);
}

.course-select,
.date-picker {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--verde-800);
  border-radius: 8px;
  background-color: var(--blanco);
  box-shadow: var(--sombra-sm);
  font-size: 1rem;
}

.student-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.student-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--verde-800);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: var(--sombra);
}

.student-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.student-name {
  font-size: 1.1rem;
  font-weight: 500;
}

.attendance-controls {
  display: flex;
  gap: 0.5rem;
}

.attendance-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: var(--sombra-sm);
}

.attendance-btn.present {
  background-color: var(--verde-200);
  color: var(--verde-700);
}

.attendance-btn.present.active {
  background-color: var(--verde-700);
  color: var(--blanco);
}

.attendance-btn.absent {
  background-color: #fde2e2;
  color: #b91c1c;
}

.attendance-btn.absent.active {
  background-color: #dc2626;
  color: var(--blanco);
}

.action-container {
  margin-top: 2rem;
  text-align: right;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #eab308; /* amarillo fuerte */
  color: #1f2937;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: var(--sombra-md);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  background-color: #eab308; /* amarillo más claro al pasar el mouse */
  transform: scale(1.03);
}

.action-btn:disabled {
  background-color: #eab308; /* amarillo pálido cuando está desactivado */
  color: #000000;
  cursor: not-allowed;
  opacity: 0.6;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--gris-700);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .control-panel {
    flex-direction: column;
  }

  .action-container {
    text-align: center;
  }
}
</style>
