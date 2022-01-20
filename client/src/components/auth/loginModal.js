import { Component } from "react";
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
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions'
import { clearErrors } from "../../actions/errorActions";

class LoginModal extends Component {
    // state variable
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null,
    };

    // prop types needed
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error,isAuthenticated} = this.props; // storing the prev props

        if(error != prevProps.error){
            //check for login error

            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.msg}) // authentication failed
            }
            else{
                this.setState({msg:null}) 
            }
        }

        // close if the authentication is done
        if (this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    // toggle state of the modal
    toggle = () => {
        // Clear Errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    // updates the value of the email and password as we enter the email and password
    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    // takes the email and password and passed them to the login action
    onSubmit = (e) => {
        e.preventDefault();

        const {email,password} = this.state;
        // Create user object
        const user = {email,password};

        // Attempt to login
        this.props.login(user);
    }

    /*
        on clicking the login button we call toggle to set the state of the application
        call onSubmit function when the user clicks the submit button
    */
    render() {
        return (
            <div className="container">
                <Button color="success" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Login</b></span></NavLink></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                />
                <Modal>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>  
                            <FormGroup>

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
                                >Login
                                </Button>

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

export default connect(mapStateToProps,{login,clearErrors})(LoginModal)