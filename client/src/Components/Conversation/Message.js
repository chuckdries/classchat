import React from 'react';

const mapStateToProps = (state) => {
  return {
    getUser: (userid) => state.user.usersByIdMap[userid]
  };
};

const Message = ({msg}) => (
  <p>
    {msg.author}: {msg.message}
  </p>
);

export default Message;