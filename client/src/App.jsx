function App() {
  return (
    <div className='App'>
      <h1>Mi Aplicación del Clima</h1>
      <p>Esta es una versión simplificada para pruebas de despliegue</p>

      <p>API URL: {import.meta.env.VITE_API_URL || 'No configurada'}</p>
    </div>
  )
}

export default App
