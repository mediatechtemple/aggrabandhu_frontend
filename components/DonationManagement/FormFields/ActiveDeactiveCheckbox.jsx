import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const ActiveDeactiveCheckbox = () => {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (event) => {
    setIsActive(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isActive}
            onChange={handleChange}
            color="primary"
          />
        }
        label={isActive ? 'Active' : 'Deactive'}
      />
    </div>
  );
};

export default ActiveDeactiveCheckbox;
