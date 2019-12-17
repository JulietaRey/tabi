import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { connect } from 'react-redux'
import { getGraphByGenre } from '../selectors/111Selector'

class Graphs extends Component {
    state = {
        provincias: [],
    }

    getDataToShow = () => {
        const { genreGraph } = this.props
        return genreGraph
    }

    render() {
        return (
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={8} style={{ height: '700px' }}>
                    <ResponsiveSunburst
                        identity="name"
                        animate={true}
                        margin={{ top: 60, right: 80, bottom: 60, left: 280 }}
                        value={'tot'}
                        width={1200}
                        height={850}
                        data={this.getDataToShow()}
                        cornerRadius={2}
                        borderWidth={1}
                        borderColor="white"
                        colors={{ scheme: 'set1' }}
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
                        {/* <Button
                            onClick={this.toggleProvincias}
                            variant={'contained'}
                            color={'primary'}
                            fullWidth
                        >
                            {this.state.showProvincias
                                ? 'Vista por genero'
                                : 'Vista por provincias'}
                        </Button> */}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    genreGraph: getGraphByGenre(state),
})

export default connect(mapStateToProps)(Graphs)
