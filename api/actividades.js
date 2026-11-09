
export default async function handler(req, res) {
  try {
    const respuesta = await fetch(
      'https://app.nocodb.com/api/v3/data/pkaoaohy500u28b/mmbwpw98jtf1l7f/records?pageSize=25',
      {
        method: 'GET',
        headers: {
          'xc-token': process.env.NOCODB_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!respuesta.ok) {
  return res.status(respuesta.status).json({
    error: 'No se pudieron obtener los registros de NocoDB.',
    status: respuesta.status
  });
}
    const datos = await respuesta.json();

    return res.status(200).json(datos);

  } catch (error) {
    console.error('Error al consultar NocoDB:', error);

    return res.status(500).json({
      error: 'Error al conectar con la base de datos.'
    });
  }
}
