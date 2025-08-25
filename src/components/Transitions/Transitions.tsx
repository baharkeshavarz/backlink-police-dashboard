import {
  Box,
  Collapse,
  Fade,
  Grow,
  Slide,
  SlideProps,
  Zoom,
} from '@mui/material';
import { forwardRef } from 'react';

export interface TransitionsProps extends SlideProps {
  position?: string;
  type?: string;
}
const Transitions = forwardRef<string, TransitionsProps>((props, ref) => {
  const {
    children,
    position = 'top-left',
    type = 'grow',
    direction = 'up',
    ...others
  } = props;
  let positionSX = {
    transformOrigin: '0 0 0',
  };

  switch (position) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right',
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top',
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left',
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right',
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom',
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0',
      };
      break;
  }

  return (
    <Box ref={ref}>
      {type === 'grow' && (
        <Grow {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {type === 'collapse' && (
        <Collapse {...others} sx={positionSX}>
          {children}
        </Collapse>
      )}
      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150,
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
      {type === 'slide' && (
        <Slide
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150,
          }}
          direction={direction}
        >
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}
      {type === 'zoom' && (
        <Zoom {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
});

Transitions.displayName = 'Transitions';

export default Transitions;
