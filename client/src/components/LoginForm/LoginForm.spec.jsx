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

    it("Renders Login form on loading",() => {
        const form = screen.getByRole('login')
        expect(form).toBeDefined()
    })

    it("renders one input of type 'username'", () => {
        const usernameInput = screen.getByPlaceholderText('username')

        expect(usernameInput).toBeDefined()
    })

    it("renders one input of type 'password'", () => {
        const passwordInput = screen.getByPlaceholderText('password')

        expect(passwordInput).toBeDefined()
    })

    it("renders a submit input element with the name 'Login'", () => {
        const submitBtn = screen.getByRole('button', {name: "Login"})

        expect(submitBtn).toBeDefined()
    })

    it("renders a p element called 'forgot password?'", () => {
        const submitBtn = screen.getByRole('button', {name: "Login"})

        expect(submitBtn).toBeDefined()
    })

    afterEach(() => {
        cleanup();
    })

});
