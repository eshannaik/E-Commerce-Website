import { Component, Fragment } from 'react';
import AppNavbar from './AppNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap';


class Orders extends Component {
    state = {
        loaded: false,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
        getOrders: PropTypes.object.isRequired
    }

    // get the orders of the user and set the loaded state to true
    getOrders = async (id) => {
        await this.props.getOrders(id);
        this.state.loaded = true;
    }

    // check if user is logged in then check if he has orders in his acoount if there are no orders then display no orders
    // if the user isnt logged in then prompt him to login
    /* 
        then check if user is logged in and he has previous orders and if this is all is meet then display all the orders he has made
        in a card based format along with the item name, price and quantity and a total bill right on the top using the map function
    */
    render (){
        const user = this.props.user;

        if(this.isAuthenticated && !this.props.order.loading && !this.state.loaded){
            this.ongetOrders(user._id);
        }

        return (
            <div>
                <AppNavbar />

                {this.props.isAuthenticated?
                    <Fragment>
                        {this.props.order.orders !== [] ?
                            null:
                            <Alert color="info" className="text-center">You have no orders!</Alert>
                        }
                    </Fragment>
                    : <Alert color="danger" className="text-center">Please Login to View!</Alert>
                }

                {this.props.isAuthenticated && !this.props.order.loading && this.state.loaded && this.props.order.orders.length?
                    <Container>
                        <div className="row">
                            {this.props.order.orders.map((order)=>(
                                <div className="col-md-12">
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h4">{order.items.length} items - Total cost: Rs. {order.bill}</CardTitle>
                                            <div className="row">
                                            {order.items.map((item)=>(
                                                <div className="col-md-4">
                                                    <Card className="mb-2">
                                                        <CardBody>
                                                            <CardTitle tag="h5">{item.name} ({item.quantity} pieces)</CardTitle>
                                                            <CardSubtitle tag="h6">Rs. {item.price}/piece</CardSubtitle>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <br/>
                                </div>
                                
                            ))}
                        </div>
                    </Container>
                :null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, {getOrders})(Orders);