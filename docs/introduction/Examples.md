# Examples


1. First, create your resource and export created types, actions and reducers (eg. in `containers/Users/store/index.js`)

    ```js
    import {createResource} from 'redux-rest-resource';

    const hostUrl = 'https://api.mlab.com:443/api/1/databases/sandbox/collections';
    const apiKey = 'xvDjirE9MCIi800xMxi4EKeTm8e9FUBR';

    export const {types, actions, reducers} = createResource({
      name: 'user',
      url: `${hostUrl}/users/:id?apiKey=${apiKey}`
    });
    ```

2. Import reducers in your store

    ```js
    import {combineReducers} from 'redux';
    import {reducers as usersReducers} from 'containers/Users/store';
    export default combineReducers({
      users: usersReducers
    });
    ```

3. Use provided actions inside connected components

    ```js
    import {bindActionCreators} from 'redux';
    import {connect} from 'react-redux';
    import {actions as userActions} from 'containers/Users/store';
    import UserListItem from './UserListItem';

    class UserList extends Component {

      componentDidMount() {
        const {actions} = this.props;
        actions.fetchUsers();
      }

      render() {
        const {actions, users} = this.props;
        return (
          <ul>
            {users.map(user => <UserListItem key={user.id} user={user} {...actions} />)}
          </ul>
        );
      }

    }

    export default connect(
      // mapStateToProps
      state => ({users: state.users.items}),
      // mapDispatchToProps
      dispatch => ({
        actions: bindActionCreators({...userActions}, dispatch)
      })
    )(UserList);
    ```
