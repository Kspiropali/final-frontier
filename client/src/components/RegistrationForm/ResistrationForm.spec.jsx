//Boilerplate
import React, { useState } from 'react';
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

import { RegistrationForm } from '../../components';
import AuthContext, { AuthProvider, useAuth } from '../../contexts/AuthContext';

import check from '../../assets/images/loginReg/check.png'
import close from '../../assets/images/loginReg/close.png'

describe("RegistrationForm component", () => {


    beforeEach(() => {

        render(
                <BrowserRouter>
                    <AuthProvider>
                        <RegistrationForm />
                    </AuthProvider>
                </BrowserRouter>
            );
    });

    it("Renders Login form on loading",() => {
        const form = screen.getByRole('register')
        expect(form).toBeInTheDocument()
        expect(form).toBeVisible()
    })

    it("renders one input of type 'username'", () => {
        const usernameInput = screen.getByPlaceholderText('username')

        expect(usernameInput).toBeInTheDocument()
        expect(usernameInput).toBeVisible()
    })

    it("displays a p with the value 'unique' with a cross image when the page first renders", () => {

        const usernameRequirementOne = screen.getByText("unique");
        const image = screen.getByAltText(/valid username/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()
        expect(usernameRequirementOne.textContent).toBe("unique")
        expect(usernameRequirementOne).toBeVisible()
    }),

    it("renders 2 input fields of type: 'email'", () => {
        const emailInput = screen.getByPlaceholderText('email')
        const confirmEmailInput = screen.getByPlaceholderText('confirm email')

        expect(emailInput).toBeInTheDocument()
        expect(confirmEmailInput).toBeInTheDocument()
        expect(emailInput).toBeVisible()
        expect(confirmEmailInput).toBeVisible()
    }),

    it("displays a p with the value 'contains @' with a cross image when the page first renders", () => {

        const emailRequirementOne = screen.getByText("contains '@'");
        const image = screen.getByAltText(/valid email/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()

        expect(emailRequirementOne.textContent).toBe("contains '@'")
        expect(emailRequirementOne).toBeVisible()
        
    }),

    it("displays a p with the value 'match' with a cross image when the page first renders", () => {

        const emailRequirementTwo = screen.getAllByText("match");
        const image = screen.getByAltText(/matching emails/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()
        expect(emailRequirementTwo[0].textContent).toBe("match")
        expect(emailRequirementTwo[0]).toBeVisible()
    }),

    it("renders 2 input fields of type: 'password'", () => {
        const passwordInput = screen.getByPlaceholderText('password')
        const confirmPassword = screen.getByPlaceholderText('confirm password')
        
        expect(passwordInput).toBeInTheDocument()
        expect(confirmPassword).toBeInTheDocument()
        expect(passwordInput).toBeVisible()
        expect(confirmPassword).toBeVisible()
    }),

    it("displays a p with the value '> 6 characters' with a cross image when the page first renders", () => {

        const passwordRequirementOne = screen.getByText("> 6 characters");
        const image = screen.getByAltText(/password length/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()
        expect(passwordRequirementOne.textContent).toBe("> 6 characters")
        expect(passwordRequirementOne).toBeVisible()
    }),

    it("displays a p with the value '1 number' with a cross image when the page first renders", () => {

        const passwordRequirementTwo = screen.getByText("1 number");
        const image = screen.getByAltText(/containing a number/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()
        expect(passwordRequirementTwo.textContent).toBe("1 number")
        expect(passwordRequirementTwo).toBeVisible()
    }),

    it("displays a p with the value '1 symbol' with a cross image when the page first renders", () => {

        const passwordRequirementThree = screen.getByText("1 symbol");
        const image = screen.getByAltText(/containing a special character/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()
        expect(passwordRequirementThree.textContent).toBe("1 symbol")
        expect(passwordRequirementThree).toBeVisible()
    }),

    it("displays a p with the value 'match' with a cross image when the page first renders", () => {

        const passwordRequirementFour = screen.getAllByText("match");
        const image = screen.getByAltText(/matching passwords/)
        expect(image).toHaveAttribute('src', close)
        expect(image).not.toHaveAttribute('src', check)
        expect(image).toBeVisible()
        expect(passwordRequirementFour[1].textContent).toBe("match")
        expect(passwordRequirementFour[1]).toBeVisible()
    }),

    it("renders a submit input element with the name 'Register'", () => {
        const submitBtn = screen.getByRole('button', {name: "Register"})

        expect(submitBtn).toBeDefined()
        expect(submitBtn).toBeVisible()
    })

    // it("renders a p element called 'forgot password?'", () => {
    //     const forgotPassword = screen.getByText('forgot password?')

    //     expect(forgotPassword).toBeDefined()
    // })

    // it("handleUsername should trigger when an onchange occurs", async () => {

    //     const usernameInput = screen.getByPlaceholderText('username')

    //     const response = await userEvent.type(usernameInput, "hello")
    //     expect(usernameInput).toHaveValue('hello')

    // })

    // it("input value changes when user types in a value", async () => {

    //     const usernameInput = screen.getByPlaceholderText('username')
    //     await userEvent.type(usernameInput, "hello")
    //     expect(usernameInput).toHaveValue("hello")

    //     const passwordInput = screen.getByPlaceholderText('password')
    //     await userEvent.type(passwordInput, "pass")
    //     expect(passwordInput).toHaveValue("pass")
    // })

    // it("on change events reflect the value of the input", async () => {

    //     const usernameInput = screen.getByPlaceholderText('username')
    //     fireEvent.change(usernameInput, {target: {value: "hello"}})
    //     expect(usernameInput).toHaveValue('hello')

    //     const passwordInput = screen.getByPlaceholderText('password')
    //     fireEvent.change(passwordInput, {target: {value: "pass"}})
    //     expect(passwordInput).toHaveValue("pass")
    // }),

    // it("after sucessful submission fields should be clear", async () => {

    //     const usernameInput = screen.getByPlaceholderText('username')
    //     fireEvent.change(usernameInput, {target: {value: "testuser1"}})
    //     expect(usernameInput).toHaveValue('testuser1')

    //     const passwordInput = screen.getByPlaceholderText('password')
    //     fireEvent.change(passwordInput, {target: {value: "password1*"}})
    //     expect(passwordInput).toHaveValue("password1*")

    //     const form = screen.getByRole('login')

    //     const response = {
    //         data: "user logged in successfully"
    //     }

    //     const loginReq = vi.spyOn(axios, "request").mockResolvedValueOnce(response)
    //     act(() => {
    //         fireEvent.submit(form)
    //     })
        
    //     await waitFor(() => {
    //         expect(loginReq).toHaveBeenCalled(1)
    //     })        
    // }),

    // it("If no data has been entered at the time of submission, the post request isn't sent", async () => {

    //     const form = screen.getByRole('login')

    //     const response = {
    //         data: "user logged in successfully"
    //     }

    //     const loginReq = vi.spyOn(axios, "request").mockResolvedValueOnce(response)
    //     act(() => {
    //         fireEvent.submit(form)
    //     })
        
    //     await waitFor(() => {
    //         expect(loginReq).not.toHaveBeenCalled()
    //     })        
    // }),
    // it("If login was unsuccessful the input data and states should remain unchanged", async () => {

    //     const usernameInput = screen.getByPlaceholderText('username')
    //     fireEvent.change(usernameInput, {target: {value: "testuser1"}})
    //     expect(usernameInput).toHaveValue('testuser1')

    //     const passwordInput = screen.getByPlaceholderText('password')
    //     fireEvent.change(passwordInput, {target: {value: "password1*"}})
    //     expect(passwordInput).toHaveValue("password1*")

    //     const form = screen.getByRole('login')

    //     const response = {
    //         statusCode: "404"
    //     }

    //     const loginReq = vi.spyOn(axios, "request").mockRejectedValueOnce(response)
    //     act(() => {
    //         fireEvent.submit(form)
    //     })
        
    //     await waitFor(() => {
    //         expect(loginReq).toHaveBeenCalled()
    //         expect(usernameInput).toHaveValue("testuser1")
    //         expect(passwordInput).toHaveValue("password1*")
    //     })        
    // }),

    afterEach(() => {
        cleanup();
    })

});
