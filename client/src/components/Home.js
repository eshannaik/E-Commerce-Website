import { Component } from "react";
import AppNavbar from "./AppNavbar";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Alert} from 'reactstrap';

class Home extends Component {
    // Load all the items from the db
    componentDidMount (){
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        items: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    // async function that will add an item to your cart
    onAddToCart = async (id,productID) => {
        await this.props.addToCart(id,productID,1);
        alert ('Item added to Cart');
    }

    // Load the navbar and then display the items in a grid manner with their title, price and category
    // check if the user is logged in if he is then add a button that will add that item to his cart
    render(){
        const {items} = this.props.item;
        const user = this.props.user;
        return (
            <div>
                <AppNavbar/>

                <Container>
                    <div className="row">
                        {items.map((item)=>(
                            <div className="col-md-4">
                                <Card className="mb-4">
                                    <CardBody>
                                        <CardTitle tag="h5">{item.title}</CardTitle>
                                        <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                        <CardText>{item.category}</CardText>
                                        {this.props.isAuthenticated ?
                                            <Button
                                                color="success"
                                                size="sm"
                                                onClick={this.onAddToCart.bind(this, user._id, item._id)}>
                                                    Add To Cart
                                            </Button> :
                                        null}
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
       )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home);