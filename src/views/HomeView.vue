<template>
  <div class="asisteuco-app">
    <!-- Encabezado -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">AsisteUCO</h1>
        <p class="app-subtitle">Gestión de Asistencias Universitarias</p>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="app-main">
      <!-- Panel de control -->
      <div class="control-panel">
        <div class="control-group">
          <label class="control-label">Seleccione el curso:</label>
          <select v-model="selectedCourse" class="course-select">
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.name }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Seleccione la fecha:</label>
          <input type="date" v-model="selectedDate" class="date-picker" :max="today" />
        </div>
      </div>

      <!-- Lista de estudiantes -->
      <div class="student-list-container">
        <div class="student-list">
          <div class="student-item" v-for="student in filteredStudents" :key="student.id">
            <div class="student-info">
              <span class="student-name">{{ student.name }}</span>
            </div>

            <div class="attendance-controls">
              <button
                @click="markPresent(student.id)"
                class="attendance-btn present"
                :class="{ active: student.present }"
              >
                <i class="fas fa-check"></i> Presente
              </button>

              <button
                @click="markAbsent(student.id)"
                class="attendance-btn absent"
                :class="{ active: !student.present }"
              >
                <i class="fas fa-times"></i> Ausente
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de acción -->
      <div class="action-container">
        <button class="action-btn" @click="submitAttendance">
          <i class="fas fa-save"></i> Guardar Asistencias
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Student {
  id: number
  name: string
  courseId: number
  present: boolean
}

interface Course {
  id: number
  name: string
}

const courses = ref<Course[]>([
  { id: 1, name: 'INGENIERÍA DE SOFTWARE II' },
  { id: 2, name: 'BASE DE DATOS AVANZADA' },
  { id: 3, name: 'ARQUITECTURA DE SISTEMAS' },
])

const students = ref<Student[]>([
  { id: 1, name: 'María González Pérez', courseId: 1, present: false },
  { id: 2, name: 'Carlos Mendoza Ruiz', courseId: 1, present: false },
  { id: 3, name: 'Lucía Ramírez Sánchez', courseId: 1, present: false },
  { id: 4, name: 'Pedro Castillo Jiménez', courseId: 2, present: false },
])

const selectedCourse = ref<number>(1)
const today = new Date().toISOString().split('T')[0]
const selectedDate = ref<string>(today)

const filteredStudents = computed(() => {
  return students.value.filter((s) => s.courseId === selectedCourse.value)
})

const markPresent = (id: number) => {
  const student = students.value.find((s) => s.id === id)
  if (student) student.present = true
}

const markAbsent = (id: number) => {
  const student = students.value.find((s) => s.id === id)
  if (student) student.present = false
}

const submitAttendance = () => {
  console.log('Asistencias guardadas:', {
    fecha: selectedDate.value,
    curso: selectedCourse.value,
    estudiantes: filteredStudents.value,
  })
  alert('Asistencias guardadas exitosamente')
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

:root {
  --primary: #1b5e20;
  --accent: #fbc02d;
  --background: #f1f8e9;
  --text-dark: #263238;
  --text-light: #ffffff;
  --success: #388e3c;
  --danger: #c62828;
  --white: #ffffff;
  --shadow: rgba(0, 0, 0, 0.1);
}

body {
  background-color: var(--background);
  color: var(--text-dark);
  font-family: 'Segoe UI', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

.asisteuco-app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

.app-header {
  background: var(--primary);
  color: var(--text-light);
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px var(--shadow);
  width: 100%;
  max-width: 800px;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
}

.app-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
}

.app-main {
  flex: 1;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control-panel,
.student-list,
.student-item,
.action-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.control-panel {
  background: var(--white);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 3px 12px var(--shadow);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 250px;
}

.course-select,
.date-picker {
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

.student-list-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.student-list {
  width: 100%;
}

.student-item {
  background: var(--white);
  border-radius: 10px;
  padding: 1.2rem 1.8rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px var(--shadow);
  transition: transform 0.2s;
}

.student-item:hover {
  transform: translateY(-2px);
}

.student-info {
  font-size: 1.2rem;
  font-weight: 500;
}

.attendance-controls {
  display: flex;
  gap: 1rem;
}

.attendance-btn {
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.attendance-btn.present {
  background-color: #e8f5e9;
  color: var(--success);
}

.attendance-btn.present.active {
  background-color: var(--success);
  color: var(--text-light);
}

.attendance-btn.absent {
  background-color: #ffebee;
  color: var(--danger);
}

.attendance-btn.absent.active {
  background-color: var(--danger);
  color: var(--text-light);
}

.action-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.action-btn {
  background-color: var(--primary);
  color: var(--text-light);
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 5px 15px var(--shadow);
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #2e7d32;
  transform: translateY(-3px);
}
</style>
