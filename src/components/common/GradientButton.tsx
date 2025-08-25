import { styled } from '@mui/material';
import { ButtonWithLoading } from '../ButtonWithLoading';

const GradientButton = styled(ButtonWithLoading)(({ theme }) => ({
  background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.2)',
  color: '#fff',
}));

export default GradientButton;
