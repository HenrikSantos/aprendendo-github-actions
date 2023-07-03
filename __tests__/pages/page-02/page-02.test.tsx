import { render, screen } from '@testing-library/react'
import Page02 from '@/pages/page-02'

describe('Page02', () => {
  it('renders a page', () => {
    render(<Page02 />)

    const heading = screen.getByRole('heading', {
      name: /this is the page 02/i
    })

    expect(heading).toBeInTheDocument()
  })
})
