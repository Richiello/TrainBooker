import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BookingForm } from '../BookingForm';
import { Wrapper } from './styled';

function App() {
	return (
		<Wrapper>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<BookingForm />
			</LocalizationProvider>
		</Wrapper>
	);
}

export default App;
