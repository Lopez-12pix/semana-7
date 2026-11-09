import { useState, useEffect } from 'react';

export default function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/api/actividades')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const registros = datos.records || datos.list || [];
        
        setActividades(registros);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al conectar con NocoDB:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando datos desde el servidor en la nube...</p>;

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ color: '#0f4c81' }}>📋 Lista de Actividades (Desde NocoDB)</h3>
      {actividades.length === 0 ? (
        <p>No se encontraron registros o la tabla está vacía.</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {actividades.map((item, index) => {
            // Extraemos los campos desde 'item.fields' que es donde NocoDB almacena los datos de la fila
            const campos = item.fields || item;

            const titulo = campos.Title || 'Sin título';
            const duracion = campos.duration || 'Sin duración';
            const categoria = campos.category || 'General';
            const completado = campos.completed ?? false;

            return (
              <li key={item.id || index} style={{ marginBottom: '8px' }}>
                <strong>{titulo}</strong> — {duracion} 
                <span style={{ color: '#1b6ca8', marginLeft: '6px' }}>[{categoria}]</span>
                {completado ? ' ✅' : ' ⏳'}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}