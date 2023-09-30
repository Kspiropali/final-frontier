//Boilerplate
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

// extras
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter, MemoryRouter, Outlet } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
// expect.extend(matchers);

import Header, { Loginform } from '../../components';
import AuthContext, { AuthProvider } from '../../contexts/AuthContext';

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
        await fireEvent.change(usernameInput, {target: {value: "hello"}})
        expect(usernameInput).toHaveValue('hello')

        const passwordInput = screen.getByPlaceholderText('password')
        await fireEvent.change(passwordInput, {target: {value: "pass"}})
        expect(passwordInput).toHaveValue("pass")
    }),

    it("after sucessful submission fields should be clear", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        await fireEvent.change(usernameInput, {target: {value: "testuser1"}})
        expect(usernameInput).toHaveValue('testuser1')

        const passwordInput = screen.getByPlaceholderText('password')
        await fireEvent.change(passwordInput, {target: {value: "password1*"}})
        expect(passwordInput).toHaveValue("password1*")

        const form = screen.getByRole('login')

    }),

    // it("Displays 1 joke if the API returns only one joke", async () => {

    //     vi.spyOn(axios, "get").mockResolvedValueOnce({ data: [
    //         {
    //             "setup": "What do reindeer hang on their Christmas trees?",
    //             "punchline": "hornaments"
    //         }
    //     ]});

    //     render(<Getter />);

    //     const jokes = await screen.findByRole("listitem");

    //     expect(jokes.childNodes.length).toBe(1);
    //     expect(jokes.childNodes[0].textContent).toBe("What do reindeer hang on their Christmas trees?hornaments")
    // });

    afterEach(() => {
        cleanup();
    })

});
