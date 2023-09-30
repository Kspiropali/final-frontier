import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import jest from 'jest'

import { BrowserRouter, MemoryRouter, Outlet } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
// expect.extend(matchers);

import Header from '.';
import { act } from 'react-dom/test-utils';

/**
 * @vitest-environment jsdom
 */

const history = createMemoryHistory();

describe("PageWrapper component", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Header />
                <Outlet/>
            </BrowserRouter>
            );
    });

    it("Displays a nav bar with 8 children", () => {

        const nav = screen.getByRole("navigation");

        expect(nav).toBeDefined();
        expect(nav.childNodes.length).toBe(8);

    });

    it("Home navlink redirects to '/' ",async  () => {
        const home = screen.getByText("Home")

        await userEvent.click(home);
        expect(location.pathname).toEqual('/')
    });

    it("About navlink redirects to '/about' ", async () => {

        const about = screen.getByText("About")

        await userEvent.click(about);
        // spy on push calls, assert on url (parameter)
        expect(location.pathname).toBe('/about');

    });

    it("Support navlink redirects to '/support' ", async () => {

        const support = screen.getByText("Support")

        await userEvent.click(support);
        // spy on push calls, assert on url (parameter)
        expect(location.pathname).toBe('/support');

    });

    it("Profile navlink redirects to '/profile' ", async () => {

        const profile = screen.getByText("Profile")

        await userEvent.click(profile);
        // spy on push calls, assert on url (parameter)
        expect(location.pathname).toBe('/profile');

    });

    it("Shop navlink redirects to '/shop' ", async () => {

        const shop = screen.getByText("Shop")

        await userEvent.click(shop);
        // spy on push calls, assert on url (parameter)
        expect(location.pathname).toBe('/shop');

    });

    it("Login navlink redirects to '/login' ", async () => {

        const login = screen.getByText("Login")

        await userEvent.click(login);
        // spy on push calls, assert on url (parameter)
        expect(location.pathname).toBe('/login');

    });

    it("Register navlink redirects to '/register' ", async () => {

        const register = screen.getByText("Register")

        await userEvent.click(register);
        // spy on push calls, assert on url (parameter)
        expect(location.pathname).toBe('/register');

    });



    afterEach(() => {
        cleanup();
    })

});
