
import React from 'react';
import Page from '../components/Page';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ChatContextProvider } from '../contexts/chat';
import { getUsers } from '../services/user';

jest.mock('../services/user', () => ({
    getUsers: jest.fn(),
}));

describe('Page component', () => {
    it('renders user list correctly', async () => {
        const mockedUsers = [
            { firstName: 'Shreshth', email: 'shreshth@example.com' },
            { firstName: 'John', email: 'john@example.com' },
        ];

        (getUsers as jest.Mock).mockResolvedValue(mockedUsers);

        const { getByText, getByPlaceholderText } = render(
            <ChatContextProvider>
                <Page />
            </ChatContextProvider>,
        );
        const input = getByPlaceholderText('Search member to assign task');
        fireEvent.change(input, { target: { value: 'Shres' } });
        await waitFor(() => {
            expect(getByText('Shreshth')).toBeInTheDocument();
        });
    });
});
