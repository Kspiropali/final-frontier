//Boilerplate
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom'
import { screen, render, cleanup, fireEvent, act, waitFor } from '@testing-library/react';

// extras
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import axios from 'axios';

import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import { Founders } from '../../components';
import AuthContext, { AuthProvider, useAuth } from '../../contexts/AuthContext';

import krisOptimised from "../../assets/images/krisOptimised.png"
import raviaOptimised from "../../assets/images/raviaOptimised.png"
import camilleOptimised from "../../assets/images/camilleOptimised.png"
import samOptimised from "../../assets/images/samOptimised.png"
import nicOptimised from "../../assets/images/nicOptimised.png"

describe("Founders component", () => {

    beforeEach(() => {
        render(
                <BrowserRouter>
                    <AuthProvider>
                        <Founders/>
                    </AuthProvider>
                </BrowserRouter>
            );
    });

    it("Renders Title onto the screen",() => {
        const header = screen.getByRole('heading')
        expect(header).toBeDefined()
        expect(header).toBeVisible()
    })
    it("Renders 5 images onto the screen",() => {
        const images = screen.getAllByRole('img')
        expect(images).toBeDefined()
        expect(images.length).toEqual(5)

        images.forEach(image => {
            expect(image).toBeVisible()
        });
    })

    it("Renders image for camille onto the screen with subtext",() => {
        const camille = screen.getByAltText('Camille Francis headshot')
        expect(camille).toHaveAttribute('src', camilleOptimised)

        const subText = screen.getByText("Camille Francis")
        expect(subText.textContent).toBe("Camille Francis")
    })

    it("Renders image for kris onto the screen with subtext",() => {
        const kris = screen.getByAltText('Kristian Spiropali headshot')
        expect(kris).toHaveAttribute('src', krisOptimised)

        const subText = screen.getByText("Kristian Spiropali")
        expect(subText.textContent).toBe("Kristian Spiropali")
    })

    it("Renders image for ravia onto the screen with subtext",() => {
        const ravia = screen.getByAltText('Ravia Saini headshot')
        expect(ravia).toHaveAttribute('src', raviaOptimised)

        const subText = screen.getByText("Ravia Saini")
        expect(subText.textContent).toBe("Ravia Saini")
    })

    it("Renders image for nic onto the screen with subtext",() => {
        const nic = screen.getByAltText('Nicolas Sanschagrin headshot')
        expect(nic).toHaveAttribute('src', nicOptimised)

        const subText = screen.getByText("Nicolas Sanschagrin")
        expect(subText.textContent).toBe("Nicolas Sanschagrin")
    })

    it("Renders image for sam onto the screen with subtext",() => {
        const sam = screen.getByAltText('Sam Merrick headshot')
        expect(sam).toHaveAttribute('src', samOptimised)

        const subText = screen.getByText("Sam Merrick")
        expect(subText.textContent).toBe("Sam Merrick")
    })

    afterEach(() => {
        cleanup();
    })

});
