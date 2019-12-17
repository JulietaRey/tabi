import React, { Component, Fragment } from 'react'
import {
    Grid,
    Button,
    Slider,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux'
import {
    getBaseSelector,
    getGradoGraph,
    getProgressGraph,
} from '../selectors/MinSelector'

class Graphs extends Component {
    state = {
        showOnlyStem: false,
        showCant: 20,
        showInv: false,
        showGrado: false,
        showDisciplina: true,
    }

    getDataToShow = () => {
        const {
            baseGraph,
            baseStemGraph,
            baseStemInvGraph,
            baseInvGraph,
        } = this.props
        const { showOnlyStem, showCant, showInv } = this.state
        if (showInv) {
            if (showOnlyStem) return baseStemInvGraph.slice(0, showCant)
            return baseInvGraph.slice(0, showCant)
        }
        if (showOnlyStem) return baseStemGraph.slice(0, showCant)
        return baseGraph.slice(0, showCant)
    }

    toggleStem = () => {
        this.setState(state => ({
            showOnlyStem: !state.showOnlyStem,
        }))
    }

    changeBaseLength = (e, val) => {
        this.setState({
            showCant: val,
        })
    }

    toggleInv = () => {
        this.setState(state => ({
            showInv: !state.showInv,
        }))
    }

    showDisciplina = () => {
        this.setState({
            showDisciplina: true,
            showGrado: false,
        })
    }
    showGrado = () => {
        this.setState({
            showDisciplina: false,
            showGrado: true,
        })
    }

    render() {
        return (
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={8} style={{ height: '700px' }}>
                    {this.state.showDisciplina && (
                        <ResponsiveBar
                            colors={({ id, data }) => data[`${id}Color`]}
                            margin={{
                                top: 60,
                                right: 80,
                                bottom: 60,
                                left: 280,
                            }}
                            axisBottom={{
                                legend: 'Disciplina',
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                legend: 'Cantidad',
                                legendPosition: 'middle',
                            }}
                            groupMode={'grouped'}
                            width={1200}
                            height={700}
                            layout={'horizontal'}
                            data={this.getDataToShow()}
                            indexBy={'name'}
                            keys={['hombres', 'mujeres']}
                            padding={0.2}
                            labelTextColor="inherit:darker(1.4)"
                            labelSkipWidth={16}
                            labelSkipHeight={16}
                        />
                    )}
                    {this.state.showGrado && (
                        <ResponsiveBar
                            colors={({ id, data }) => data[`${id}Color`]}
                            margin={{
                                top: 60,
                                right: 80,
                                bottom: 60,
                                left: 280,
                            }}
                            axisBottom={{
                                legend: 'Grado academico',
                                legendPosition: 'middle',
                                tickRotation: -15,
                            }}
                            axisLeft={{
                                legend: 'Cantidad',
                                legendPosition: 'middle',
                            }}
                            groupMode={'grouped'}
                            width={1200}
                            height={700}
                            layout={'vertical'}
                            data={this.props.gradoGraph}
                            indexBy={'name'}
                            keys={['hombres', 'mujeres']}
                            padding={0.2}
                            labelTextColor="inherit:darker(1.4)"
                            labelSkipWidth={16}
                            labelSkipHeight={16}
                        />
                    )}
                </Grid>
                <Grid
                    item
                    container
                    xs={4}
                    spacing={1}
                    alignContent={'flex-start'}
                    alignItems={'flex-start'}
                >
                    {this.state.showGrado ? null : (
                        <Fragment>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label={'Mostrar solo Stem'}
                                    onChange={this.toggleStem}
                                    control={<Checkbox />}
                                />
                                <FormControlLabel
                                    label={'Invertir orden'}
                                    onChange={this.toggleInv}
                                    control={<Checkbox />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Slider
                                    fullWidth
                                    defaultValue={20}
                                    max={
                                        this.state.showOnlyStem
                                            ? this.props.baseStemGraph.length
                                            : this.props.baseGraph.length
                                    }
                                    min={2}
                                    onChange={this.changeBaseLength}
                                />
                            </Grid>
                        </Fragment>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant={'contained'}
                            fullWidth
                            color={'primary'}
                            disabled={this.state.showDisciplina}
                            onClick={this.showDisciplina}
                        >
                            Mostrar por disciplina
                        </Button>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            fullWidth
                            disabled={this.state.showGrado}
                            onClick={this.showGrado}
                        >
                            Mostrar por grado
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    baseGraph: getBaseSelector(state),
    baseInvGraph: getBaseSelector(state, false, true),
    baseStemGraph: getBaseSelector(state, true),
    baseStemInvGraph: getBaseSelector(state, true, true),
    gradoGraph: getGradoGraph(state),
})

export default connect(mapStateToProps)(Graphs)
