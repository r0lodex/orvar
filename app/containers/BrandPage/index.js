/**
 *
 * BrandPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Container, Typography, TextField, InputAdornment, MenuItem, Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { dataChecking } from 'globalUtils';
import makeSelectBrandPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getBrandList } from './actions';
import './style.scss';

export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getBrandList());
    }

    brandFilter = () => {
        console.log();
        return (
            <Container className="mb-1">
                <Typography variant="h5">All Brands</Typography>
                <Grid container={true} spacing={2}>
                    <Grid item={true}>
                        <TextField
                            variant="outlined"
                            type="search"
                            margin="dense"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Search for brand"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            variant="outlined"
                            select={true}
                            margin="dense"
                            value="All Categories"
                        >
                            <MenuItem key="All Categories" value="All Categories">
                                All Categories
                            </MenuItem>
                            <MenuItem key="Skin Care" value="Skin Care">
                                Skin Care
                            </MenuItem>
                            <MenuItem key="Make Up" value="Make Up">
                                Make Up
                            </MenuItem>
                            <MenuItem key="Bath & Body" value="Bath & Body">
                                Bath & Body
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            variant="outlined"
                            select={true}
                            margin="dense"
                            value="All Countries"
                        >
                            <MenuItem key="All Countries" value="All Countries">
                                All Countries
                            </MenuItem>
                            <MenuItem key="Japan" value="Japan">
                                Japan
                            </MenuItem>
                            <MenuItem key="Korea" value="Korea">
                                Korea
                            </MenuItem>
                            <MenuItem key="Malaysia" value="Malaysia">
                                Malaysia
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    brandFilterByAlphabet = () => {
        let alpabetFilter;
        if (this.props.brandPage.data && this.props.brandPage.data.items) {
            const Obj = Object.keys(dataChecking(this.props, 'brandPage', 'data', 'items'));
            alpabetFilter = Obj.map((key) => (
                <Grid className="text-uppercase" item={true} key={key}>
                    <Typography>{key}</Typography>
                </Grid>
            ));
        }
        return (
            <div
                className="py-1"
                style={{
                    backgroundColor: 'white',
                }}
            >
                <Container>
                    <Grid container={true} justify="space-evenly">
                        {alpabetFilter}
                    </Grid>
                </Container>
            </div>
        );
    }

    render() {
        return (
            <div className="pt-1">
                <div
                    style={{
                        position: 'sticky',
                        top: '60px',
                        backgroundColor: '#f3efee',
                    }}
                >
                    {this.brandFilter()}
                    {this.brandFilterByAlphabet()}
                </div>
            </div>
        );
    }
}

BrandPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    brandPage: makeSelectBrandPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'brandPage', reducer });
const withSaga = injectSaga({ key: 'brandPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(BrandPage);
