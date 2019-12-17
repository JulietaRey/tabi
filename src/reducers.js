import CET from './data/CET.json'
import cientoOnce from './data/111k.json'
import eurostat from './data/eurostat.json'
import MinCyT from './data/MinCyT.json_0.json'
import titulos from './data/CETRefs/titulo.js_0.json'
import anio from './data/CETRefs/anio'
import genero from './data/111Refs/genero.json'
import lugar from './data/111Refs/lugar.json'
import disciplina from './data/MinCyTRefs/disciplina.json'
import grado from './data/MinCyTRefs/grado.json'
import tipo from './data/MinCyTRefs/tipo.json'
import generoMin from './data/MinCyTRefs/genero.json'
import anioEuro from './data/eurostatRefs/anio.json'
import edad from './data/eurostatRefs/edad.json'
import generoEuro from './data/eurostatRefs/genero.json'
import pais from './data/eurostatRefs/pais'
import rubro from './data/eurostatRefs/rubro'

export default (state = {
  data: CET.data,
  refs: {
    titulos: titulos.data,
    anio
  },
}, action) => {
  switch (action.type) {
    case 'LOAD_CET':
      return {
        data: CET.data,
        refs: {
          titulos: titulos.data,
          anio
        },
      }
    case 'LOAD_111':
      return {
        data: cientoOnce.data,
        refs: {
          genero,
          lugar
        },
      }
    case 'LOAD_MIN':
      return {
        data: MinCyT.data,
        refs: {
          disciplina: disciplina.data,
          genero: generoMin.data,
          grado: grado.data,
          tipo: tipo.data
        },
      }
    case 'LOAD_EUROSTAT':
      return {
        data: eurostat.data,
        refs: {
          anio: anioEuro.data,
          edad: edad.data,
          genero: generoEuro.data,
          pais: pais.data,
          rubro: rubro.data
        },
      }
    default:
      return state
  }
}
