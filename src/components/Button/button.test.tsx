import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("first react test case", () => {
    it('aaa', () => {
        const wrapper = render(<Button>Nice</Button>)
        const element = wrapper.getByText('Nice')
        // expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        
    })
})