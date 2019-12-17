export const getBaseGraph = state => {
    if (!state.refs.anio || !state.data.length || !state.refs.titulos) return []
    const anios = state.refs.anio
    const ultimoAnio = anios[anios.length - 1]
    const datosUltimoAnio = state.data.filter(
        registro => registro.pk_anio === ultimoAnio.pk_anio
    )
    const groups = [
        {
            name: 'Inscriptos',
            hombres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Nuevos Inscriptos Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Nuevos Inscriptos Mujeres']),
                0
            ),
        },
        {
            name: 'Estudiantes',
            hombres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Estudiantes Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Estudiantes Mujeres']),
                0
            ),
        },
        {
            name: 'Reinscriptos',
            hombres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Reinscriptos Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Reinscriptos Mujeres']),
                0
            ),
        },
        {
            name: 'Egresados',
            hombres: datosUltimoAnio.reduce(
                (total, actual) => total + Number(actual['Egresados Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce((total, actual) => {
                const number = actual['Egresados Mujeres']
                if (number === '-') return total
                return total + Number(actual['Egresados Mujeres'])
            }, 0),
        },
    ]
    return groups
}

export const getBaseGraphIsStem = state => {
    if (!state.refs.anio || !state.data.length || !state.refs.titulos) return []
    const anios = state.refs.anio
    const ultimoAnio = anios[anios.length - 1]
    const datosUltimoAnio = state.data.filter(
        registro =>
            registro.pk_anio === ultimoAnio.pk_anio && registro['es Stem']
    )
    const groups = [
        {
            name: 'Inscriptos',
            hombres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Nuevos Inscriptos Varones']),
                0
            ),
            mujeres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Nuevos Inscriptos Mujeres']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
        },
        {
            name: 'Estudiantes',
            hombres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Estudiantes Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Estudiantes Mujeres']),
                0
            ),
        },
        {
            name: 'Reinscriptos',
            hombres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Reinscriptos Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce(
                (total, actual) =>
                    total + Number(actual['Reinscriptos Mujeres']),
                0
            ),
        },
        {
            name: 'Egresados',
            hombres: datosUltimoAnio.reduce(
                (total, actual) => total + Number(actual['Egresados Varones']),
                0
            ),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            mujeres: datosUltimoAnio.reduce((total, actual) => {
                const number = actual['Egresados Mujeres']
                if (number === '-') return total
                return total + Number(actual['Egresados Mujeres'])
            }, 0),
        },
    ]
    return groups
}

const getTotalesPorAnio = (id, data) => {
    const datosAnio = data.filter(
        registro => registro.pk_anio === id && registro['es Stem']
    )
    return datosAnio.reduce(
        (total, actual) => {
            let actMujeres = 0
            let actVarones = 0
            Object.keys(actual).forEach(key => {
                if (key.endsWith('Mujeres') && actual[key] !== '-') {
                    actMujeres += Number(actual[key])
                } else if (key.endsWith('Varones') && actual[key] !== '-') {
                    actVarones += Number(actual[key])
                }
            })
            return {
                hombres: total.hombres + actVarones,
                mujeres: total.mujeres + actMujeres,
            }
        },
        {
            hombres: 0,
            mujeres: 0,
        }
    )
}

export const getStemProgressGraph = state => {
    if (!state.refs.anio || !state.data.length || !state.refs.titulos) return []
    const anios = state.refs.anio
    return anios.map(anio => {
        return {
            name: anio.anio.toString(),
            hombresColor: 'lightskyblue',
            mujeresColor: 'hotpink',
            ...getTotalesPorAnio(anio.pk_anio, state.data),
        }
    })
}

export const getStemTopGraph = state => {
    if (!state.refs.anio || !state.data.length || !state.refs.titulos) return []
    const anios = state.refs.anio
    const ultimoAnio = anios[anios.length - 1]
    const titulos = state.refs.titulos.filter(t => t.esStem)
    const datosUltimoAnio = state.data.filter(
        registro =>
            registro.pk_anio === ultimoAnio.pk_anio && registro['es Stem']
    )
    const totalPorCarrera = []
    datosUltimoAnio.forEach(datos => {
        let actMujeres = 0
        let actVarones = 0
        Object.keys(datos).forEach(key => {
            if (key.endsWith('Mujeres') && datos[key] !== '-') {
                actMujeres += Number(datos[key])
            } else if (key.endsWith('Varones') && datos[key] !== '-') {
                actVarones += Number(datos[key])
            }
        })
        const carreraActual = titulos.find(t => datos.pk_titulo === t.pk_titulo)
        const pos = totalPorCarrera.findIndex(
            total => total.name === carreraActual.carrera
        )
        if (pos === -1) {
            totalPorCarrera.push({
                mujeres: actMujeres || 0,
                hombres: actVarones || 0,
                hombresColor: 'lightskyblue',
                mujeresColor: 'hotpink',
                name: carreraActual.carrera,
            })
        } else {
            totalPorCarrera[pos] = {
                ...totalPorCarrera[pos],
                mujeres: totalPorCarrera[pos].mujeres + actMujeres,
                hombres: totalPorCarrera[pos].hombres + actVarones,
            }
        }
    })
    return totalPorCarrera.sort((a, b) => (a.mujeres > b.mujeres ? -1 : 1))
}
