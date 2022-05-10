import {render, screen} from '@testing-library/react'
import Home from '../pages/index'
import "@testing-library/jest-dom"

describe("Home Page", () => {
    it('render home page', async () => {
        render(<Home />)
    })
    expect(screen.getAllByRole('list').length).toBeGreaterThan(0)
})