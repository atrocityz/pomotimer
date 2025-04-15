import './Header.scss'
import { Logo } from '@/components/Logo/Logo.jsx'

export const Header = () => {
  return (
    <header className="header container">
      <Logo className="header__logo" />
    </header>
  )
}
