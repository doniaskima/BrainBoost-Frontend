import React, { FC } from 'react';
import './drive.scss';

interface DriveProps {}

const Drive: FC<DriveProps> = () => (
  <div className="drive" data-testid="Drive">
    Drive Component
  </div>
);

export default Drive;
