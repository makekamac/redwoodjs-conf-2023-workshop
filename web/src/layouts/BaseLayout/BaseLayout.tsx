import { Home, Library } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import ApolloLogo from 'src/components/ApolloLogo'
import CurrentUserMenuCell from 'src/components/CurrentUserMenuCell'
import ScrollableList from 'src/components/ScrollableList'
import SidebarNavLink from 'src/components/SidebarNavLink'
import SidebarPlaylistsCell from 'src/components/SidebarPlaylistsCell'
import SidebarSection from 'src/components/SidebarSection'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div
      className={
        'grid h-screen grid-cols-[375px_1fr] gap-2 p-2 [grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
      }
    >
      <aside className="overflow-auto pb-0 pt-4 text-primary [grid-area:sidebar]">
        <nav className="flex h-full flex-col">
          <Link to={routes.home()} className="-left-3 flex justify-center py-2">
            <ApolloLogo size="225px" className="relative -left-3" />
          </Link>
          <SidebarSection className="px-4 py-2">
            <SidebarNavLink to={routes.home()}>
              <Home size="1.5rem" />
              Home
            </SidebarNavLink>
          </SidebarSection>
          <SidebarSection className="flex flex-1 flex-col overflow-hidden pb-0">
            <header className="px-4 py-2">
              <h2 className="flex items-center gap-2 py-2 text-base text-muted">
                <Library /> Your Library
              </h2>
            </header>
            <ScrollableList className="-mx-1 px-3">
              <ul>
                <SidebarPlaylistsCell />
              </ul>
            </ScrollableList>
          </SidebarSection>
        </nav>
      </aside>
      <main className="relative flex h-full flex-col overflow-hidden overflow-y-auto rounded-md bg-black-base text-primary [--main-content--padding:2rem] [--main-header--height:80px] [grid-area:main-view]">
        <ScrollableList as="article" className="flex flex-1 flex-col">
          <header className="pointer-events-none absolute top-0 z-10 flex w-full flex-shrink-0 items-center justify-end bg-transparent px-[var(--main-content--padding)] pt-[var(--main-content--padding)] text-primary">
            <div className="pointer-events-auto flex items-center gap-4">
              <CurrentUserMenuCell />
            </div>
          </header>
          {children}
        </ScrollableList>
      </main>
    </div>
  )
}

export default BaseLayout
