import { useContext } from 'react';
import { localFormContext } from '../providers/LocalFormProvider';

const useLocalFormContext = () => useContext(localFormContext);
export default useLocalFormContext;
