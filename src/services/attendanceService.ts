import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getGrupos = async () => api.get('/grupos').then((r) => r.data)

export const getEstudiantesPorGrupo = async (grupoId: string) =>
  api.get(`/grupos/${grupoId}/estudiantes`).then((r) => r.data)

export const registrarAsistencia = async (payload: {
  grupoId: string
  fecha: string
  estudiantes: { estudianteGrupoId: string; asistio: boolean }[]
}) => api.post('/asistencias', payload).then((r) => r.data)
