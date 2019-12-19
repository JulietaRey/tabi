import React, { Component, Fragment } from 'react'
import {
    Grid,
    Button,
    Slider,
    Typography,
    Select,
    MenuItem,
} from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux'
import {
    getBaseEuroGraph,
    getPaises,
    getProgressGraph,
} from '../selectors/eurostatSelector'

class Graphs extends Component {
    state = {
        showCant: [0, this.props.baseGraph.length],
        showProgress: false,
        showAll: true,
        country: 1,
    }

    getDataToShow = () => {
        const { baseGraph, progressGraph } = this.props
        const { showAll } = this.state
        return showAll
            ? baseGraph.slice(this.state.showCant[0], this.state.showCant[1])
            : progressGraph.filter(item => item.pk_pais === this.state.country)
    }

    changeBaseLength = (e, val) => {
        this.setState({
            showCant: val,
        })
    }

    showProgress = () => {
        this.setState(state => ({
            showAll: false,
            showProgress: true,
        }))
    }

    showAll = () => {
        this.setState(state => ({
            showAll: true,
            showProgress: false,
        }))
    }

    changeCountry = ({ target: { value } }) => {
        this.setState({
            country: value,
        })
    }

    render() {
        const { paises } = this.props
        return (
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={8} style={{ height: '700px' }}>
                    <ResponsiveBar
                        colors={({ id, data }) => data[`${id}Color`]}
                        margin={{
                            top: 20,
                            right: 80,
                            bottom: 60,
                            left: 180,
                        }}
                        axisBottom={{
                            legend: 'Pais',
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            legend: 'Cantidad',
                            legendPosition: 'middle',
                        }}
                        groupMode={'grouped'}
                        width={1200}
                        height={750}
                        layout={'horizontal'}
                        data={this.getDataToShow()}
                        indexBy={'name'}
                        keys={['hombres', 'mujeres']}
                        padding={0.2}
                        labelTextColor="inherit:darker(1.4)"
                        labelSkipWidth={16}
                        labelSkipHeight={16}
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs={4}
                    spacing={1}
                    alignContent={'flex-start'}
                    alignItems={'flex-start'}
                >
                    <Grid item xs={12}>
                        {this.state.showAll ? (
                            <Fragment>
                                <Typography>Rango:</Typography>
                                <Slider
                                    fullWidth
                                    valueLabelDisplay="auto"
                                    value={this.state.showCant}
                                    max={this.props.baseGraph.length}
                                    onChange={this.changeBaseLength}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Select
                                    fullWidth
                                    value={this.state.country}
                                    onChange={this.changeCountry}
                                >
                                    {paises
                                        .sort((a, b) =>
                                            a.GEO > b.GEO ? 1 : -1
                                        )
                                        .map(p => (
                                            <MenuItem value={p.pk_pais}>
                                                {p.GEO}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Fragment>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant={'contained'}
                            fullWidth
                            color={'primary'}
                            disabled={this.state.showAll}
                            onClick={this.showAll}
                        >
                            Mostrar por pais
                        </Button>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            fullWidth
                            disabled={this.state.showProgress}
                            onClick={this.showProgress}
                        >
                            Mostrar progreso de un pais
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    baseGraph: getBaseEuroGraph(state),
    paises: getPaises(state),
    progressGraph: getProgressGraph(state),
})

export default connect(mapStateToProps)(Graphs)
