export const getBaseEuroGraph = state => {
  if (
    !state.refs.anio ||
    !state.refs.edad ||
    !state.refs.genero ||
    !state.refs.pais ||
    !state.refs.rubro
  ) {
    return []
  }

  const data = state.data
  const ultimoAnio = data.filter(
    data =>
      data.UNIT === 'Thousand' &&
      data.pk_anio === state.refs.anio[state.refs.anio.length - 1].pk_anio
  )

  const paises = state.refs.pais.map(p => ({
    pk_pais: p.pk_pais,
    name: p.GEO,
    hombres: 0,
    mujeres: 0,
    hombresColor: 'lightskyblue',
    mujeresColor: 'hotpink',
  }))

  ultimoAnio.forEach(pais => {
    const p = paises.find(p => pais.pk_pais === p.pk_pais);
    if (pais.pk_edad === 1) {
      if (pais.pk_genero === 1) {
        p.hombres += Number(pais.Value.toFixed(0))
      } else {
        p.mujeres += Number(pais.Value.toFixed(0))
      }
    }
  })

  return paises.sort((a, b) => a.name > b.name ? -1 : 1);
}

export const getPaises = state => {
  return state.refs.pais || []
}

export const getProgressGraph = state => {
  if (
    !state.refs.anio ||
    !state.refs.edad ||
    !state.refs.genero ||
    !state.refs.pais ||
    !state.refs.rubro
  ) {
    return []
  }

  const result = [];
  state.refs.pais.forEach(pais => {
    state.refs.anio.forEach(anio => {
      result.push({
        pk_anio: anio.pk_anio,
        name: anio.TIME,
        pk_pais: pais.pk_pais,
        mujeres: 0,
        hombres: 0,
        hombresColor: 'lightskyblue',
        mujeresColor: 'hotpink',
      })
    })
  })

  state.data.forEach(item => {
    const toUpdate = result.find(i => i.pk_anio === item.pk_anio && i.pk_pais === item.pk_pais);
    if (item.pk_edad === 1) {
      if (item.pk_genero === 1) {
        toUpdate.hombres += Number(item.Value.toFixed(0))
      } else {
        toUpdate.mujeres += Number(item.Value.toFixed(0))
      }
    }
  })
  return result;

}