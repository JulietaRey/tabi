const getLocalidadesParaProvincia = (idProvincia, data) => {
  const localidades = []
  data.forEach(lugar => {
    if (lugar.id_provincia === idProvincia) {
      localidades.push({
        id: lugar.pk_lugar,
        name: lugar.localidad,
        tot: 0,
      })
    }
  })
  return localidades
}

export const getGraphByGenre = state => {
  if (!state.refs.genero || !state.refs.lugar) {
    return []
  }
  const genero = state.refs.genero
  const lugares = state.refs.lugar

  const datos = state.data

  const structure = genero.map(gen => {
    return {
      name: gen.genero,
      id: gen.pk_genero,
      children: lugares.map(l => ({
        name: l.provincia,
        children: getLocalidadesParaProvincia(l.id_provincia, lugares),
      })),
    }
  })

  datos.forEach(d => {
    const genero = structure
      .find(c => c.id === d.pk_genero)
    const prov = genero.children.find(prov => prov.children.find(lugar => lugar.id === d.pk_lugar))
    const lugar = prov.children.find(l => l.id === d.pk_lugar);
    lugar.tot = lugar.tot + 1
  })

  return {
    name: 'root',
    children: structure,
  }
}
