import { Volume2 } from 'lucide-react'
import {
  SidebarPlaylistItem_playbackState,
  SidebarPlaylistItem_playlist,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { useFragment } from '@apollo/client'

import CoverPhoto from 'src/components/CoverPhoto'
import DelimitedList from 'src/components/DelimitedList'
import SidebarPlaylistContent from 'src/components/SidebarPlaylistContent'
import SidebarPlaylistLink from 'src/components/SidebarPlaylistLink'
import SidebarPlaylistName from 'src/components/SidebarPlaylistName'

interface SidebarPlaylistItemProps {
  playlist: SidebarPlaylistItem_playlist
}

export const PLAYBACK_STATE_FRAGMENT = gql`
  fragment SidebarPlaylistItem_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
    track {
      id
    }
  }
`

const SidebarPlaylistItem = ({ playlist }: SidebarPlaylistItemProps) => {
  const { data: playbackState } =
    useFragment<SidebarPlaylistItem_playbackState>({
      fragment: PLAYBACK_STATE_FRAGMENT,
      from: { __typename: 'PlaybackState' },
    })

  console.log('ekam playlist', playlist, playbackState)
  const isPlaying = playbackState?.isPlaying ?? false
  const isCurrentContext = playbackState?.context?.uri ?? false

  return (
    <SidebarPlaylistLink to={routes.playlist({ id: playlist.id })}>
      <CoverPhoto image={playlist.images.at(-1)} size="48px" />
      <SidebarPlaylistContent>
        <SidebarPlaylistName isCurrentContext={isCurrentContext}>
          {playlist.name}
        </SidebarPlaylistName>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">
            <DelimitedList delimiter=" · ">
              <span>Playlist</span>
              <span>{playlist.owner.displayName}</span>
            </DelimitedList>
          </span>
        </div>
      </SidebarPlaylistContent>
      {isCurrentContext && isPlaying && (
        <Volume2 color="var(--color--theme--light)" size="0.875rem" />
      )}
    </SidebarPlaylistLink>
  )
}

SidebarPlaylistItem.fragments = {
  playlist: gql`
    fragment SidebarPlaylistItem_playlist on Playlist {
      id
      name
      uri
      images {
        url
      }
      owner {
        id
        displayName
      }
    }
  `,
}

export default SidebarPlaylistItem
