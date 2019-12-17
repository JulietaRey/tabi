import React, { Component } from 'react'
import { Grid, Typography, Tabs, Tab } from '@material-ui/core'
import CETGraphs from './CETGraphs'
import { connect } from 'react-redux'
import { loadCet, load111, loadMinCyT, loadEurostat } from '../actions'
import CientoOnceGraph from './CientoOnceGraph'
import MinGraphs from './MinGraphs'
import EurostatGraphs from './EurostatGraphs'

class Root extends Component {
    state = {
        currentTab: 0,
    }

    changeTab = (e, newValue) => {
        const { loadCet, load111, loadMin, loadEuro } = this.props
        switch (newValue) {
            case 0:
                loadCet()
                break
            case 1:
                load111()
                break
            case 2:
                loadMin()
                break
            default:
            case 3:
                loadEuro()
                break
        }
        this.setState({
            currentTab: newValue,
        })
    }

    render() {
        return (
            <Grid container>
                <Grid item container xs={12}>
                    <Grid item>
                        <Typography variant={'h3'}>
                            Mujeres en Tecnología
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs
                            centered
                            variant={'fullWidth'}
                            onChange={this.changeTab}
                            value={this.state.currentTab}
                        >
                            <Tab value={0} label={'CET'}></Tab>
                            <Tab value={1} label={'111k'}></Tab>
                            <Tab value={2} label={'MinCyT'}></Tab>
                            <Tab value={3} label={'Eurostat'}></Tab>
                        </Tabs>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {this.state.currentTab === 0 ? (
                        <CETGraphs />
                    ) : this.state.currentTab === 1 ? (
                        <CientoOnceGraph />
                    ) : this.state.currentTab === 2 ? (
                        <MinGraphs />
                    ) : (
                        <EurostatGraphs />
                    )}
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loadCet: () => dispatch(loadCet()),
    load111: () => dispatch(load111()),
    loadMin: () => dispatch(loadMinCyT()),
    loadEuro: () => dispatch(loadEurostat()),
})

export default connect(null, mapDispatchToProps)(Root)
