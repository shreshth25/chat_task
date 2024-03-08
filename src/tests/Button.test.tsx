import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button';
import { ChatContextProvider } from '../contexts/chat';

describe('Button component', () => {
    it('renders button correctly', () => {
        const { getByText, getByAltText } = render(
            <ChatContextProvider>
                <Button data={{}} />
            </ChatContextProvider>,
        );
        const buttonText = getByText('Tasks');
        expect(buttonText).toBeInTheDocument();
        const buttonIcon = getByAltText('icon');
        expect(buttonIcon).toBeInTheDocument();
    });

    it('opens modal on button click', () => {
        const { getByText } = render(
            <ChatContextProvider>
                <Button data={{}} />
            </ChatContextProvider>,
        );
        const button = getByText('Tasks');
        fireEvent.click(button);
        const modal = getByText('New Task Assignment');
        expect(modal).toBeInTheDocument();
    });

    it('opens modal on button click', () => {
        const { getByText } = render(
            <ChatContextProvider>
                <Button data={{}} />
            </ChatContextProvider>,
        );
        const button = getByText('Tasks');
        fireEvent.click(button);
        const modal = getByText('✏️ Start by explaining the task you want to assign');
        expect(modal).toBeInTheDocument();
    });
});