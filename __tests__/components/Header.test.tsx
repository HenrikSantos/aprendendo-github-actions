import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header', () => {
  it('renders the header', () => {
    render(<Header />)

    const mainLink = screen.getByRole('link', {
      name: /main/i
    })
    const page01 = screen.getByRole('link', {
      name: /page 01/i
    })
    const page02 = screen.getByRole('link', {
      name: /page 02/i
    })

    expect(mainLink).toBeInTheDocument()
    expect(page01).toBeInTheDocument()
    expect(page02).toBeInTheDocument()
  })
})
