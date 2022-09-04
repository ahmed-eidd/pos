import React from 'react';

const Flex = ({
  children,
  justify = 'center',
  align = 'center',
  direction = 'row',
  gap = 0,
  style,
  className,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction,
        gap: gap,
        width: '100%',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Flex;
