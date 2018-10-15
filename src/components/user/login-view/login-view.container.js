import { connect } from 'react-redux';
import { userSelectors, userOperations } from '../ducks';
import LoginView from './login-view.component';


const mapStateToProps = state => ({
    profile: userSelectors.profile(state)
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userOperations.logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
