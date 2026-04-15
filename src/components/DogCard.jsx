/**
 * DogCard.jsx
 * Componente que muestra un perrito con:
 *  - Nombre (del dogs-info.json)
 *  - Imagen limitada a 400x400 px con borde
 *  - Habilidades (del mismo json)
 */
function DogCard({ imageUrl, nombre, habilidades }) {
  return (
    <div className="dog-card">
      {/* Nombre del perrito */}
      <h2 className="dog-name">{nombre}</h2>

      {/* Imagen 400×400 con borde */}
      <div className="dog-image-wrapper">
        <img src={imageUrl} alt={`Foto de ${nombre}`} className="dog-image" />
      </div>

      {/* Habilidades */}
      <div className="dog-skills">
        <span className="dog-skills-label">Habilidades</span>
        <ul className="dog-skills-list">
          {habilidades.map((h) => (
            <li key={h} className="dog-skill-tag">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DogCard
