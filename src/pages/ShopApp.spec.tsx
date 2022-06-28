import React from "react";
import * as ReactDOM from "react-dom";
import { screen } from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ShopApp } from "./shopApp";
import Droppe from "../images/droppeLogo.png";
import Img1 from "../images/img1.png";
import Img2 from "../images/img2.png";

describe("Initial render with fields", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<ShopApp />, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove()
    })

    it("Render correctly check", () => {
        const logo = screen.getByTestId('droppeLogo');
        const img1 = screen.getByTestId('img1');
        const img2 = screen.getByTestId('img2');

        expect(logo).toHaveAttribute('src', Droppe)
        expect(logo).toHaveAttribute('alt', 'droppe_logo')
        expect(img1).toHaveAttribute('src', Img1)
        expect(img1).toHaveAttribute('alt', 'img1')
        expect(img2).toHaveAttribute('src', Img2)
        expect(img2).toHaveAttribute('alt', 'img2')
        expect(screen.getByText('Total products: 0')).toBeVisible()
        expect(screen.getByText('Number of favorites: 0')).toBeVisible()
        expect(screen.getByTestId("button").textContent).toBe('Send product proposal')
    })

    it('onclick should be called', () => {
        const descInput = screen.getByTestId("button");
        fireEvent.click(descInput)
    })
})
