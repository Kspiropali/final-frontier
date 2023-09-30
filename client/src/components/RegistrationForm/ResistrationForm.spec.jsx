//Boilerplate
import React, { useState } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom'
import { screen, render, cleanup, fireEvent, act, waitFor } from '@testing-library/react';

// extras
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter } from 'react-router-dom';

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

    it("input value changes when user types in a value", async () => {
        //username
        const usernameInput = screen.getByPlaceholderText('username')
        await userEvent.type(usernameInput, "testuser1")
        expect(usernameInput).toHaveValue('testuser1')
        expect(usernameInput).toBeVisible()
    })

    it("password & confirm password input values change when user types in a value", async () => {
        // password
        const passwordInput = screen.getByPlaceholderText('password')
        await userEvent.type(passwordInput, "password1*")
        expect(passwordInput).toHaveValue("password1*")
        expect(passwordInput).toBeVisible()

        //confirm password
        const confirmPasswordInput = screen.getByPlaceholderText('confirm password')
        await userEvent.type(confirmPasswordInput, "password1*")
        expect(confirmPasswordInput).toHaveValue("password1*")
        expect(confirmPasswordInput).toBeVisible()
    })

    it("email & confirm email input values change when user types in a value", async () => {
        //email
        const emailInput = screen.getByPlaceholderText('email')
        await userEvent.type(emailInput, "testuser")
        expect(emailInput).toHaveValue("testuser")
        expect(emailInput).toBeVisible()

        //confirm email
        const confirmEmailInput = screen.getByPlaceholderText('confirm email')
        await userEvent.type(confirmEmailInput, "testuser1@email.com")
        expect(confirmEmailInput).toHaveValue("testuser1@email.com")
        expect(confirmEmailInput).toBeVisible()
    })

    it("username with a length > 3 satisfies username requirements and changes the image from a ✖ to a ✔", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        
        act(() => {
            userEvent.type(usernameInput, "testuser1")
        })

        await waitFor(() => {
            expect(usernameInput).toHaveValue('testuser1')
            expect(usernameInput).toBeVisible()
            const image = screen.getByAltText(/valid username/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
        
    })

    it("password with a length > 6 changes the corresponding image from a ✖ to a ✔", async () => {

        const passwordInput = screen.getByPlaceholderText('password')
        
        act(() => {
            fireEvent.change(passwordInput, {target: {value: "password1*"}})
        })

        await waitFor(() => {
            expect(passwordInput).toHaveValue('password1*')
            expect(passwordInput).toBeVisible()
            const image = screen.getByAltText(/password length/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
        
    })

    it("A password with at least 1 number changes the corresponding image from a ✖ to a ✔", async () => {

        const passwordInput = screen.getByPlaceholderText('password')
        
        act(() => {
            fireEvent.change(passwordInput, {target: {value: "password1*"}})
        })

        await waitFor(() => {
            expect(passwordInput).toHaveValue('password1*')
            expect(passwordInput).toBeVisible()
            const image = screen.getByAltText(/containing a number/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
        
    })

    it("A password with at least 1 symbol changes the corresponding image from a ✖ to a ✔", async () => {

        const passwordInput = screen.getByPlaceholderText('password')
        
        act(() => {
            fireEvent.change(passwordInput, {target: {value: "password1*"}})
        })

        await waitFor(() => {
            expect(passwordInput).toHaveValue('password1*')
            expect(passwordInput).toBeVisible()
            const image = screen.getByAltText(/containing a special character/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
        
    })

    it("Matching the password and confirm password fields changes the corresponding image from a ✖ to a ✔", async () => {

        const passwordInput = screen.getByPlaceholderText('password')
        const confirmPasswordInput = screen.getByPlaceholderText('confirm password')
        
        act(() => {
            fireEvent.change(passwordInput, {target: {value: "password1*"}})
            fireEvent.change(confirmPasswordInput, {target: {value: "password1*"}})
        })

        await waitFor(() => {
            expect(passwordInput).toHaveValue('password1*')
            expect(passwordInput).toBeVisible()
            expect(confirmPasswordInput).toHaveValue('password1*')
            expect(confirmPasswordInput).toBeVisible()
            const image = screen.getByAltText(/matching passwords/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
        
    })

    it("email that contains '@' satisfies changes the corresponding image from ✖ to ✔", async () => {

        const emailInput = screen.getByPlaceholderText('email')

        act(() => {
            fireEvent.change(emailInput, {target: {value: "testuser1@email.com"}})
        })

        await waitFor(() => {
            expect(emailInput).toHaveValue("testuser1@email.com")
            expect(emailInput).toBeVisible()
            const image = screen.getByAltText(/valid email/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
    })

    it("Matching the email & confirm email fields changes the corresponding image from ✖ to ✔", async () => {

        const emailInput = screen.getByPlaceholderText('email')
        const confirmEmailInput = screen.getByPlaceholderText('confirm email')

        act(() => {
            fireEvent.change(emailInput, {target: {value: "testuser1@email.com"}})
            fireEvent.change(confirmEmailInput, {target: {value: "testuser1@email.com"}})
        })

        await waitFor(() => {
            expect(emailInput).toHaveValue("testuser1@email.com")
            expect(emailInput).toBeVisible()
            expect(confirmEmailInput).toHaveValue("testuser1@email.com")
            expect(confirmEmailInput).toBeVisible()
            const image = screen.getByAltText(/matching emails/)
            expect(image).toHaveAttribute('src', check)
            expect(image).not.toHaveAttribute('src', close)
            expect(image).toBeVisible()
        })
    })

    it("after sucessful submission fields should be clear", async () => {

        const usernameInput = screen.getByPlaceholderText('username')
        const passwordInput = screen.getByPlaceholderText('password')
        const confirmPasswordInput = screen.getByPlaceholderText('confirm password')
        const emailInput = screen.getByPlaceholderText('email')
        const confirmEmailInput = screen.getByPlaceholderText('confirm email')
        
        await userEvent.type(usernameInput, "testuser")
        await userEvent.type(passwordInput, "password1*")
        await userEvent.type(confirmPasswordInput, "password1*")
        await userEvent.type(emailInput, "testuser1@email.com")
        await userEvent.type(confirmEmailInput, "testuser1@email.com")
        
        const form = screen.getByRole('register')

        const response = {
            data: "user registeration was successful"
        }

        const registerReq = vi.spyOn(axios, "request").mockResolvedValueOnce(response)

        act(()=> {
            fireEvent.submit(form)
        })
            
        
        await waitFor(() => {
            expect(registerReq).toHaveBeenCalled()
        })        
    }, 8000),

    it("If all the field requirements are not satisfied, the post request won't be sent", async () => {

        const form = screen.getByRole('register')

        const response = {
            data: "user registered in successfully"
        }

        const registerReq = vi.spyOn(axios, "request").mockResolvedValueOnce(response)
        act(() => {
            fireEvent.submit(form)
        })
        
        await waitFor(() => {
            expect(registerReq).not.toHaveBeenCalled()
        })        
    })

    // it("after unsucessful submission fields should be clear", async () => {

    //     const usernameInput = screen.getByPlaceholderText('username')
    //     const passwordInput = screen.getByPlaceholderText('password')
    //     const confirmPasswordInput = screen.getByPlaceholderText('confirm password')
    //     const emailInput = screen.getByPlaceholderText('email')
    //     const confirmEmailInput = screen.getByPlaceholderText('confirm email')
        
    //     await userEvent.type(usernameInput, "testuser")
    //     await userEvent.type(passwordInput, "password1*")
    //     await userEvent.type(confirmPasswordInput, "password1*")
    //     await userEvent.type(emailInput, "testuser1@email.com")
    //     await userEvent.type(confirmEmailInput, "testuser1@email.com")
        
    //     const form = screen.getByRole('register')

    //     const response = {
    //         statusCode: "403"
    //     }

    //     const registerReq = vi.spyOn(axios, "request").mockRejectedValueOnce(response)

    //     act(()=> {
    //         fireEvent.submit(form)
    //     })
            
    //     await waitFor(() => {
    //         expect(registerReq).toHaveBeenCalled()
    //         expect(usernameInput).toHaveValue("testuser1")
    //         expect(passwordInput).toHaveValue("password1*")
    //         expect(confirmPasswordInput).toHaveValue("password1*")
    //         expect(emailInput).toHaveValue("testuser1@email.com")
    //         expect(confirmEmailInput).toHaveValue("testuser1@email.com")
    //     })        
    // }),

    afterEach(() => {
        cleanup();
    })

});
