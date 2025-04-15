import './Logo.scss'
import classNames from 'classnames'

export const Logo = (props) => {
  const { className, TitleTag = 'h1' } = props

  const title = 'Home'

  return (
    <a
      className={classNames(className, 'logo')}
      href="/"
      title={title}
      aria-label={title}
    >
      <TitleTag className="logo__title">Pomotimer</TitleTag>
    </a>
  )
}
