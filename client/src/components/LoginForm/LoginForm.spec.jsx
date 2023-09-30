//Boilerplate
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom'
import { screen, render, cleanup, fireEvent, act, waitFor } from '@testing-library/react';

// extras
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter, MemoryRouter, Outlet } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Header, { Loginform } from '../../components';
import AuthContext, { AuthProvider, useAuth } from '../../contexts/AuthContext';

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
        const forgotPassword = screen.getByText('forgot password?')

        expect(forgotPassword).toBeDefined()
    })

    it("handleUsername should trigger when an onchange occurs", async () => {

        const usernameInput = screen.getByPlaceholderText('username')

        const response = await userEvent.type(usernameInput, "hello")
        expect(usernameInput).toHaveValue('hello')

    })

    it("input value changes when user types in a value", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        await userEvent.type(usernameInput, "hello")
        expect(usernameInput).toHaveValue("hello")

        const passwordInput = screen.getByPlaceholderText('password')
        await userEvent.type(passwordInput, "pass")
        expect(passwordInput).toHaveValue("pass")
    })

    it("on change events reflect the value of the input", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, {target: {value: "hello"}})
        expect(usernameInput).toHaveValue('hello')

        const passwordInput = screen.getByPlaceholderText('password')
        fireEvent.change(passwordInput, {target: {value: "pass"}})
        expect(passwordInput).toHaveValue("pass")
    }),

    it("after sucessful submission fields should be clear", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, {target: {value: "testuser1"}})
        expect(usernameInput).toHaveValue('testuser1')

        const passwordInput = screen.getByPlaceholderText('password')
        fireEvent.change(passwordInput, {target: {value: "password1*"}})
        expect(passwordInput).toHaveValue("password1*")

        const form = screen.getByRole('login')

        const response = {
            data: "user logged in successfully"
        }

        const loginReq = vi.spyOn(axios, "request").mockResolvedValueOnce(response)
        act(() => {
            fireEvent.submit(form)
        })
        
        await waitFor(() => {
            expect(loginReq).toHaveBeenCalled(1)
        })        
    }),

    it("If no data has been entered at the time of submission, the post request isn't sent", async () => {

        const form = screen.getByRole('login')

        const response = {
            data: "user logged in successfully"
        }

        const loginReq = vi.spyOn(axios, "request").mockResolvedValueOnce(response)
        act(() => {
            fireEvent.submit(form)
        })
        
        await waitFor(() => {
            expect(loginReq).not.toHaveBeenCalled()
        })        
    }),
    it("If login was unsuccessful the input data and states should remain unchanged", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, {target: {value: "testuser1"}})
        expect(usernameInput).toHaveValue('testuser1')

        const passwordInput = screen.getByPlaceholderText('password')
        fireEvent.change(passwordInput, {target: {value: "password1*"}})
        expect(passwordInput).toHaveValue("password1*")

        const form = screen.getByRole('login')

        const response = {
            statusCode: "404"
        }

        const loginReq = vi.spyOn(axios, "request").mockRejectedValueOnce(response)
        act(() => {
            fireEvent.submit(form)
        })
        
        await waitFor(() => {
            expect(loginReq).toHaveBeenCalled()
            expect(usernameInput).toHaveValue("testuser1")
            expect(passwordInput).toHaveValue("password1*")
        })        
    }),

    afterEach(() => {
        cleanup();
    })

});
