import { Component, Fragment } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, deleteFromCart } from '../actions/cartActions';
import Checkout from './Checkout';
import { checkout } from '../actions/orderActions';

class Cart extends Component {
    state = {
        loaded: false,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        getCart: PropTypes.func.isRequired,
        addToCart: PropTypes.func.isRequired,
        deleteFromCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        cart: PropTypes.object.isRequired,
        checkout: PropTypes.func.isRequired
    }

    // get items in the users cart
    getCartItems = async (id) => {
        await this.props.getCart(id);
        this.state.loaded = true;
    }

    // delete item from a users cart
    onDeleteFromCart = (id, itemId) => {
        this.props.deleteFromCart(id,itemId);
    }

    render(){
        const user = this.props.user;
        // check if the user is authenticated and that the cart isnt loading and the state is loading
        if(this.props.isAuthenticated && !this.props.cart.loading && !this.state.loaded){
            this.getCartItems(user._id);
        }

        // check if user is logged in then check if he has items in his cart if its empty then display cart is empty
        // if the user isnt logged in then prompt him to login 
        /* 
            then check if user is logged in and his cart is not loading and it isnt empty if this is all meet then display all the 
            items in his cart using the map function in the form of cards and a button to delete that item if needed, along with the 
            total bill
        */
        return (
            <div>
                <AppNavbar />
                
                {this.props.isAuthenticated ?
                    <Fragment>
                        {this.props.cart.cart ? null:
                            <Alert color="info" className='text-center'> Your cart is empty!</Alert>
                        }
                    </Fragment>
                    : <Alert color="danger" className="test-center">Login to View!</Alert>
                }

                {this.props.isAuthenticated && !this.props.cart.loading && this.state.loaded && this.props.cart.cart?
                <Container>
                    <div className="row">
                        {this.props.cart.cart.items.map((item)=>(
                            <div className="col-md-4">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{item.name}</CardTitle>
                                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                    <CardText>Quantity - {item.quantity}</CardText>
                                    <Button color="danger" onClick={this.onDeleteFromCart.bind(this, user._id, item.productId)}>Delete</Button>
                                </CardBody>
                            </Card>
                            <br/>
                        </div>
                        ))}

                        <div class="col-md-12">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Total Cost = Rs. {this.props.cart.cart.bill}</CardTitle>
                                    <Checkout
                                        user={user._id}
                                        amount={this.props.cart.cart.bill}
                                        checkout={this.props.checkout}
                                    />                   
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                </Container>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps,{getCart,deleteFromCart,checkout})(Cart);