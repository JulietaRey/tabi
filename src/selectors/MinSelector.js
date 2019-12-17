export const getBaseSelector = (state, stem, invertir) => {
  if (
    !state.refs.genero ||
    !state.refs.disciplina ||
    !state.refs.tipo ||
    !state.refs.grado
  ) {
    return []
  }

  const data = state.data
  const ultimoAnio = data.filter(data => data.anio === 2018)

  const disciplinas = state.refs.disciplina.map(dis => {
    return {
      pk_disciplina: dis.pk_disciplina,
      name: dis.disciplina_descripcion,
      mujeres: 0,
      hombres: 0,
      hombresColor: 'lightskyblue',
      mujeresColor: 'hotpink',
      stem: dis.stem,
    }
  })
  ultimoAnio.forEach(empleado => {
    const pos = disciplinas.findIndex(
      d => d.pk_disciplina === empleado.pk_disciplina
    )
    if (pos === -1) return
    if (empleado.pk_sexo === 1) {
      // mujer
      disciplinas[pos].mujeres += 1
    } else {
      disciplinas[pos].hombres += 1
    }
  })
  const ordenadas = !invertir
    ? disciplinas.sort((a, b) => (a.mujeres > b.mujeres ? -1 : 1))
    : disciplinas.sort((a, b) => (a.mujeres > b.mujeres ? 1 : -1))
  const ret = stem ? disciplinas.filter(d => d.stem === 'true') : ordenadas
  return ret.filter(r => r.mujeres || r.hombres)
}


export const getGradoGraph = (state) => {
  if (
    !state.refs.genero ||
    !state.refs.disciplina ||
    !state.refs.tipo ||
    !state.refs.grado
  ) {
    return []
  }
  const data = state.data
  const ultimoAnio = data.filter(data => data.anio === 2018)

  const disciplinas = state.refs.disciplina;

  const grados = state.refs.grado.map(g => {
    return {
      pk_grado: g.pk_grado,
      name: g.descripcion,
      mujeres: 0,
      hombres: 0,
      hombresColor: 'lightskyblue',
      mujeresColor: 'hotpink',
    }
  })
  ultimoAnio.forEach(empleado => {
    const dis = disciplinas.find(d => d.pk_disciplina === empleado.pk_disciplina)
    if (dis && dis.stem === 'false') {
      return;

    }
    const pos = grados.findIndex(
      d => d.pk_grado === empleado.pk_grado
    )
    if (pos === -1) return
    if (empleado.pk_sexo === 1) {
      // mujer
      grados[pos].mujeres += 1
    } else {
      grados[pos].hombres += 1
    }
  })
  return grados;
}
