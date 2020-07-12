import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./Button";

const defaultProps = {
	onClick: jest.fn()
}

const testProps = {
	btnType: 'danger' as ButtonType,
	size: 'lg' as ButtonSize,
	className: 'aclss'
}

const disabledProps: ButtonProps = {
	disabled:true,
	onClick: jest.fn()
}

// 注意要对case 分类
describe("test Button Component", () => {
	// it == test
	it('should render the correct default button', () => {
		const wrapper = render(<Button {...defaultProps}>Nice</Button>)
		const element = wrapper.getByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.tagName).toEqual('BUTTON')
		expect(element).toHaveClass('btn btn-default')
		expect(element.disabled).toBeFalsy()
		fireEvent.click(element)
		expect(defaultProps.onClick).toHaveBeenCalled()
	})

	it('should render the correct Component based on different props', () => {
		const wrapper = render(<Button {...testProps}>Nice</Button>)
		const element = wrapper.getByText('Nice')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('btn-danger btn-lg aclss')
	})

	it('should render a link when btnType equals link and href is provided', () => {
		const wrapper = render(<Button btnType="link" href='https://www.baidu.com'>Link</Button>)
		const element = wrapper.getByText('Link')
		expect(element).toBeInTheDocument()
		expect(element.tagName).toEqual('A')
		expect(element).toHaveClass('btn btn-link')
	})
	
	it('should render disabled button when disaled set to true', () => {
		const wrapper = render(<Button {...disabledProps}>Nice</Button>)
		const element = wrapper.getByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.disabled).toBeTruthy()
		fireEvent.click(element)
		expect(disabledProps.onClick).not.toHaveBeenCalled()
	})
})