import { render } from '@testing-library/react'
import App from './App'
import { Provider } from 'jotai'
import React from 'react'

test('Renders app page correctly', () => {

    render(
        <React.StrictMode>
            <Provider>
                <App />
            </Provider>
        </React.StrictMode>
    )
    expect(true).toBeTruthy()
})