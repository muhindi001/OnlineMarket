import React from 'react'

const MapLocation = ({ height = 320 }) => {
  // Dar es Salaam coordinates
  const lat = -6.7924
  const lon = 39.2083

  // OpenStreetMap embed bbox (minLon,minLat,maxLon,maxLat)
  const bbox = `${(lon - 0.108).toFixed(4)},${(lat - 0.1076).toFixed(4)},${(lon + 0.0917).toFixed(4)},${(lat + 0.0924).toFixed(4)}`
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Location — Dar es Salaam
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Centered on Dar es Salaam (lat: {lat}, lon: {lon})
      </p>

      <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <iframe
          title="Dar es Salaam map"
          src={embedSrc}
          style={{ width: '100%', height: `${height}px`, border: 0 }}
          loading="lazy"
        />
      </div>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=13/${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Open in OpenStreetMap
        </a>
      </div>
    </div>
  )
}

export default MapLocation