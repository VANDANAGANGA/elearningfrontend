import React from 'react';

export default function Message({ text, sent }) {
  const message = {
    marginBottom: '15px',
  };
  const sentStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const receivedStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
  };
  const messagebubble = {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
  };
  const sentMessageBubble = {
    backgroundColor: '#3498db',
    color: 'white',
    borderBottomRightRadius: '0', // Fix: Replace hyphen with camelCase
  };
  const receivedMessageBubble = {
    backgroundColor: '#eaeaea',
    color: 'black',
    borderBottomLeftRadius: '0', // Fix: Replace hyphen with camelCase
  };

  return (
    <div className={`message ${sent ? 'sent' : 'received'}`} style={sent ? sentStyles : receivedStyles}>
      <div className="messagebubble" style={sent ? { ...messagebubble, ...sentMessageBubble } : { ...messagebubble, ...receivedMessageBubble }}>
        {text}
      </div>
    </div>
  );
}
