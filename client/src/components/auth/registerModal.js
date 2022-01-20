import { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    // state variable
    state ={
        modal : false,
        name : '',
        email : '',
        password : '',
        msg: null
    };

    // prop types needed
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props; // storing the prev props

        if(error != prevProps.error){
            // Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg:error.msg.msg});  // authentication failed
            }
            else{
                this.setState({msg:null});
            }
        }

        // close if the authentication is done
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    // toggle state of the modal
    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    // updates the value of the email and password as we enter the email and password
    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    // takes the name,email and password and passed them to the register action
    onSubmit = (e) => {
        e.preventDefault();  
        
        const { name, email, password } = this.state;

        // Create user object
        const newUser = { name, email, password};

        // Attempt to register
        this.props.register(newUser);
    }

    /*
        on clicking the login button we call toggle to set the state of the application
        call onSubmit function when the user clicks the submit button
    */
    render(){
        return(
            <div className="container">
                <Button color="info" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Register</b></span></NavLink></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

// getting the state from the reducer after the action has taken place
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps,{register, clearErrors})(RegisterModal);