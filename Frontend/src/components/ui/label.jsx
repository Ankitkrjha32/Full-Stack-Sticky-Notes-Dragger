import React from 'react';

export const Label = ({ children, ...props }) => (
  <label className="block text-gray-700 text-sm font-bold mb-2" {...props}>
    {children}
  </label>
);
