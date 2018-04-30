import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { VoteOptions, Question, Wait } from '../components';
import { fetchVoteOptions } from '../store/voteOption/actions';
import {
  fetchQuestion,
  submitVote,
  submitComment,
} from '../store/result/actions';

class VotePage extends Component {
  constructor() {
    super();
    this.state = {
      modalStatus: false,
      currentVoteName: '',
      currentVoteId: '',
      currentComment: '',
    };
  }

  componentDidMount() {
    const { fetchQuestion, fetchVoteOptions } = this.props;
    fetchQuestion();
    fetchVoteOptions();
  }

  modalOpen = e => {
    this.setState({
      modalStatus: true,
      currentVoteId: e.target.id,
      currentVoteName: e.target.name,
    });
  };

  modalClose = () => {
    this.setState({
      modalStatus: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { currentVoteId, currentVoteName, currentComment } = this.state;
    submitVote(currentVoteId, currentVoteName);
    if (currentComment) {
      submitComment(currentVoteId, currentVoteName, currentComment);
    }
    this.setState({
      modalStatus: false,
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { result, voteOptions } = this.props;
    const {
      modalStatus,
      currentVoteName,
      currentVoteId,
      currentComment,
    } = this.state;
    const waitingForResults = false; // placeholder for testing user voted boolean
    return (
      <div>
        {waitingForResults && <Wait />}
        {!waitingForResults && (
          <div>
            <Question data={result.data} />
            <VoteOptions
              data={voteOptions.data}
              modalStatus={modalStatus}
              modalOpen={this.modalOpen}
              modalClose={this.modalClose}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              currentVoteId={currentVoteId}
              currentVoteName={currentVoteName}
              currentComment={currentComment}
            />
          </div>
        )}
      </div>
    );
  }
}

VotePage.propTypes = {
  fetchQuestion: PropTypes.func.isRequired,
  fetchVoteOptions: PropTypes.func.isRequired,
  result: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }).isRequired,
  voteOptions: PropTypes.shape({
    data: PropTypes.arrayOf(String).isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    result: state.result,
    voteOptions: state.voteOptions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchQuestion,
      fetchVoteOptions,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VotePage);