import React from 'react';
import EditThisPage from '@theme-original/EditThisPage';

export default function EditThisPageWrapper(props) {
  const wrapperStyle = { fontSize: '0.75rem' };

  return (
    <div style={wrapperStyle}>
      <EditThisPage {...props} />
    </div>
  );
}
