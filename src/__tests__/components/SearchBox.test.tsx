import { SearchBox } from '../../components/SearchBox';
import { render } from '@testing-library/react';

describe('<SearchBox />', () => {
    const { getByTestId } = render(<SearchBox />);
    expect(getByTestId('search-box')).not.toBeNull();
});
