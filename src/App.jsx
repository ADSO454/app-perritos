import { useState, useEffect } from 'react'
import DogCard from './components/DogCard'
import StateItem from './components/StateItem'
import './styles/App.css'
import './styles/spinner.css'

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random'

/**
 * App – Componente principal
 *
 * Hooks usados:
 *  - useState: imagen, carga, error, contador, info del perrito
 *  - useEffect: fetch a Dog API (imagen aleatoria)
 *  - useEffect: fetch a dogs-info.json (nombres y habilidades)
 */
function App() {
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)

  // Información del perrito actual (nombre + habilidades)
  const [dogInfo, setDogInfo] = useState(null)
  // Lista completa del JSON local
  const [dogsData, setDogsData] = useState([])

  /**
   * useEffect 1 – Carga el JSON de nombres UNA sola vez al montar.
   * Array de dependencias: [] → solo al montar
   */
  useEffect(() => {
    async function loadDogsInfo() {
      try {
        const res = await fetch('/dogs-info.json')
        const data = await res.json()
        setDogsData(data.perritos)
      } catch {
        // Si falla el JSON local, continúa sin nombres
        setDogsData([])
      }
    }
    loadDogsInfo()
  }, [])

  /**
   * useEffect 2 – Fetch a la Dog API cada vez que isLoading cambia a true.
   * Array de dependencias: [isLoading]
   */
  useEffect(() => {
    if (!isLoading) return

    let cancelled = false

    async function fetchRandomDog() {
      setError(null)
      try {
        const response = await fetch(DOG_API_URL)
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()

        if (!cancelled) {
          setImageUrl(data.message)
          setCount((prev) => {
            // Selecciona info aleatoria del JSON local usando el nuevo contador
            if (dogsData.length > 0) {
              const idx = Math.floor(Math.random() * dogsData.length)
              setDogInfo(dogsData[idx])
            }
            return prev + 1
          })
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setIsLoading(false)
        }
      }
    }

    fetchRandomDog()
    return () => {
      cancelled = true
    }
  }, [isLoading, dogsData])

  function handleNuevoPerrito() {
    setIsLoading(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Perritos Aleatorios</h1>
        <p className="subtitle">
          Demostración: <code>useState</code> + <code>useEffect</code>
        </p>
      </header>

      <main className="app-main">
        {/* CARGANDO */}
        {isLoading && (
          <div className="state-box loading">
            {/* <div className="spinner" aria-label="Cargando" /> */}
            <span className="loader"></span>
            <p>Buscando perrito...</p>
          </div>
        )}

        {/* ERROR */}
        {!isLoading && error && (
          <div className="state-box error" role="alert">
            <span className="error-icon">⚠️</span>
            <p>
              <strong>Error:</strong> {error}
            </p>
            <button className="btn btn-retry" onClick={handleNuevoPerrito}>
              Reintentar
            </button>
          </div>
        )}

        {/* ÉXITO – componente DogCard */}
        {!isLoading && !error && imageUrl && dogInfo && (
          <DogCard imageUrl={imageUrl} nombre={dogInfo.nombre} habilidades={dogInfo.habilidades} />
        )}
      </main>

      {/* Contador fuera del componente DogCard */}
      {!isLoading && !error && <div className="dog-counter">Perrito #{count} visitado</div>}

      <div className="app-actions">
        <button className="btn btn-primary" onClick={handleNuevoPerrito} disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Nuevo'}
        </button>
      </div>

      {/* Panel didáctico de estado */}
      <div className="state-panel">
        <h3>Estado React (useState)</h3>
        <div className="state-grid">
          <StateItem
            label="isLoading"
            value={String(isLoading)}
            type={isLoading ? 'active' : 'inactive'}
          />
          <StateItem label="error" value={error ?? 'null'} type={error ? 'error' : 'inactive'} />
          <StateItem
            label="imageUrl"
            value={imageUrl ? 'URL recibida' : 'null'}
            type={imageUrl ? 'active' : 'inactive'}
          />
          <StateItem label="count" value={count} type="neutral" />
        </div>
      </div>
    </div>
  )
}

export default App
