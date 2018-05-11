import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Tab } from 'semantic-ui-react';
import { AccountDetailsForm, GroupManage } from '../components';
import { updateUser, clearUserErrors } from '../store/user/actions';

class AccountPage extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.accountName !== nextProps.user.name ||
      prevState.accountPhone !== nextProps.user.phone ||
      prevState.accountEmail !== nextProps.user.email
    ) {
      return {
        accountName: nextProps.user.name,
        accountPhone: nextProps.user.phone,
        accountEmail: nextProps.user.email,
        nameAltered: false,
        phoneAltered: false,
        emailAltered: false,
        currentLeaveName: '',
        currentLeaveId: '',
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      accountName: props.user.name,
      accountPhone: props.user.phone,
      accountEmail: props.user.email,
      nameAltered: false,
      phoneAltered: false,
      emailAltered: false,
      leaveModalStatus: false,
      currentLeaveName: '',
      createModalStatus: false,
      currentCreateName: '',
      joinModalStatus: false,
      currentJoinId: '',
    };
  }

  componentDidMount() {
    this.props.clearUserErrors();
  }

  handleChange = e => {
    const { user } = this.props;
    const inputField = e.target.id.replace('account', '').toLowerCase();
    const alteredState = `${inputField}Altered`;

    this.setState({
      [e.target.id]: e.target.value,
    });

    if (user[inputField] !== e.target.value) {
      this.setState({
        [alteredState]: true,
      });
    } else {
      this.setState({ [alteredState]: false });
    }
  };

  modalOpen = e => {
    switch (e.target.getAttribute('action')) {
      case 'leave': {
        return this.setState({
          leaveModalStatus: true,
          currentLeaveName: e.target.name,
        });
      }

      case 'create': {
        return this.setState({
          createModalStatus: true,
        });
      }

      case 'join': {
        return this.setState({
          joinModalStatus: true,
        });
      }

      default:
        return null;
    }
  };

  modalClose = () => {
    this.setState({
      leaveModalStatus: false,
      createModalStatus: false,
      joinModalStatus: false,
    });
  };

  render() {
    const { updateUser, user } = this.props;
    const {
      accountName,
      accountPhone,
      accountEmail,
      nameAltered,
      phoneAltered,
      emailAltered,
      leaveModalStatus,
      currentLeaveName,
      createModalStatus,
      currentCreateName,
      joinModalStatus,
      currentJoinId,
    } = this.state;
    const panes = [
      {
        menuItem: { key: 'user', icon: 'user', content: 'User' },
        render: () => (
          <Tab.Pane>
            <AccountDetailsForm
              error={user.userUpdateError}
              token={user.token}
              accountName={accountName}
              accountPhone={accountPhone}
              accountEmail={accountEmail}
              handleChange={this.handleChange}
              nameAltered={nameAltered}
              phoneAltered={phoneAltered}
              emailAltered={emailAltered}
              updateUser={updateUser}
              updateMessage={user.userUpdateMessage}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: 'group', icon: 'users', content: 'Groups' },
        render: () => (
          <GroupManage
            groups={[
              { _id: 'asdf', name: 'group one' },
              { _id: 'asdfg', name: 'group two' },
            ]}
            modalOpen={this.modalOpen}
            modalClose={this.modalClose}
            handleChange={this.handleChange}
            leaveModalStatus={leaveModalStatus}
            currentLeaveName={currentLeaveName}
            createModalStatus={createModalStatus}
            currentCreateName={currentCreateName}
            joinModalStatus={joinModalStatus}
            currentJoinId={currentJoinId}
          />
        ),
      },
    ];

    return (
      <Segment>
        <Tab panes={panes} />
      </Segment>
    );
  }
}

AccountPage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  clearUserErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser,
      clearUserErrors,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
