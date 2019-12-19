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
                <Grid
                    item
                    container
                    xs={12}
                    style={{
                        background: 'rgb(29,183,196)',
                        background:
                            'linear-gradient(90deg, rgba(29,183,196,1) 0%, rgba(135,31,193,1) 40%, rgba(255,0,221,1) 100%)',
                    }}
                >
                    <Grid item style={{ padding: '40px 20px' }}>
                        <Typography variant={'h3'} style={{ color: 'white' }}>
                            Mujeres en Tecnología
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs
                            style={{
                                background: '#ffffffab',
                            }}
                            centered
                            variant={'fullWidth'}
                            onChange={this.changeTab}
                            value={this.state.currentTab}
                        >
                            <Tab
                                style={{ fontWeight: 'bold' }}
                                value={0}
                                label={'CET'}
                            ></Tab>
                            <Tab
                                value={1}
                                style={{ fontWeight: 'bold' }}
                                label={'111k'}
                            ></Tab>
                            <Tab
                                value={2}
                                style={{ fontWeight: 'bold' }}
                                label={'MinCyT'}
                            ></Tab>
                            <Tab
                                value={3}
                                style={{ fontWeight: 'bold' }}
                                label={'Eurostat'}
                            ></Tab>
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
