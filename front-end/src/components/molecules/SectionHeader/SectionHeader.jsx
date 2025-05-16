import React from 'react';
import Text from '../../atoms/Text/Text';

const SectionHeader = ({ title }) => {
  return (
    <div className="section-header">
      <Text type="heading" size="md" weight="bold">
        {title}
      </Text>
    </div>
  );
};

export default SectionHeader;