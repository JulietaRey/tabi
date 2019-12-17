import React, { Component } from 'react'
import { Grid, Button, Slider } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux'
import {
    getBaseGraph,
    getBaseGraphIsStem,
    getStemProgressGraph,
    getStemTopGraph,
} from '../selectors/CetSelector'

class Graphs extends Component {
    state = {
        showStemResults: false,
        showProgress: false,
        showTop5: false,
        topCount: 0,
    }

    toggleStem = () => {
        this.setState(state => ({
            showProgress: false,
            showTop: false,
            showStemResults: !state.showStemResults,
        }))
    }

    showProgress = () => {
        this.setState(state => ({
            showProgress: !state.showProgress,
            showStemResults: false,
            showTop: false,
        }))
    }

    showTop = () => {
        this.setState(state => ({
            showTop: !state.showTop,
            showProgress: false,
            showStemResults: false,
            topCount: this.props.stemTop.length,
        }))
    }

    changeTopCount = (e, value) => {
        this.setState({
            topCount: value,
        })
    }

    getDataToShow = () => {
        const { data, stemData, stemProgress, stemTop } = this.props
        const { showStemResults, showProgress, showTop, topCount } = this.state
        return showStemResults
            ? stemData
            : showProgress
            ? stemProgress
            : showTop
            ? stemTop.slice(0, topCount)
            : data
    }

    render() {
        return (
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={8} style={{ height: '700px' }}>
                    <ResponsiveBar
                        colors={({ id, data }) => data[`${id}Color`]}
                        margin={{ top: 60, right: 80, bottom: 60, left: 280 }}
                        axisBottom={{
                            legend: 'Nivel',
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            legend: 'Cantidad',
                            legendPosition: 'middle',
                        }}
                        groupMode={'grouped'}
                        width={1200}
                        height={700}
                        layout={this.state.showTop ? 'horizontal' : 'vertical'}
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
                        <Button
                            onClick={this.toggleStem}
                            variant={'contained'}
                            color={'primary'}
                            fullWidth
                        >
                            {this.state.showStemResults
                                ? 'Ver sobre todas las carreras'
                                : 'Restringir resultados a STEM'}
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button
                            onClick={this.showProgress}
                            variant={'contained'}
                            color={'secondary'}
                        >
                            Totales en STEM los ultimos años (2010 - 2016)
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button
                            onClick={this.showTop}
                            variant={'contained'}
                            color={'secondary'}
                        >
                            Ver Stem más elegidas por mujeres
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.showTop ? (
                            <Slider
                                defaultValue={this.props.stemTop.length}
                                max={this.props.stemTop.length}
                                min={2}
                                onChange={this.changeTopCount}
                            />
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    stemData: getBaseGraphIsStem(state),
    data: getBaseGraph(state),
    stemProgress: getStemProgressGraph(state),
    stemTop: getStemTopGraph(state),
})

export default connect(mapStateToProps)(Graphs)
