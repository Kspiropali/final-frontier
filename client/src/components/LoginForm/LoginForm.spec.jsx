import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter, MemoryRouter, Outlet } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
// expect.extend(matchers);

import Header, { Loginform } from '../../components';
import AuthContext, { AuthProvider } from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';

/**
 * @vitest-environment jsdom
*/

const history = createMemoryHistory();

describe("PageWrapper component", () => {

    beforeEach(() => {
        render(
                <BrowserRouter>
                    <AuthProvider>
                        <Loginform/>
                    </AuthProvider>
                </BrowserRouter>
            );
    });

    it("<AuthProvider>",() => {
        const form = screen.getByRole('login')
        expect(form).toBeDefined()
    })

    afterEach(() => {
        cleanup();
    })

});
