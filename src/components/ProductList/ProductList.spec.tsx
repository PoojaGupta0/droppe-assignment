import '@testing-library/jest-dom';
import React from "react";
import * as ReactDOM from "react-dom";
import { screen } from "@testing-library/react";

import { ProductDetails } from "./ProductDetails";

describe("Initial render with fields", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<ProductDetails product={{
            id: 0,
            title: "",
            description: "",
            price: "",
            isFavorite: false,
            rating: {
                rate: 0,
                count: 0
            }
        }} onFav={function favClick(title: string): void {
            throw new Error("Function not implemented.");
        }} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove()
    })

    it("Render correctly check", () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(screen.getByTestId("Description").textContent).toBe('Description:')
        expect(screen.getByText('Rating: 0/5')).toBeVisible()
        expect(screen.getByText('Price: $0')).toBeVisible()
    })
})
