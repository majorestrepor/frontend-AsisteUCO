import axios from 'axios'

export const getGrupos = async () => axios.get('/api/grupos').then((r) => r.data)

export const getEstudiantesPorGrupo = async (grupoId: string) =>
  axios.get(`/api/grupos/${grupoId}/estudiantes`).then((r) => r.data)

export const registrarAsistencia = async (payload: {
  grupoId: string
  fecha: string
  estudiantes: { estudianteGrupoId: string; asistio: boolean }[]
}) => axios.post('/api/asistencias', payload).then((r) => r.data)
