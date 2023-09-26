import { useFragment } from '@apollo/client'

import PlayButton from 'src/components/PlayButton'
import { usePausePlaybackMutation } from 'src/mutations/usePausePlaybackMutation'
import { useResumePlaybackMutation } from 'src/mutations/useResumePlaybackMutation'
import { PLAYBACK_STATE_FRAGMENT } from '../SidebarPlaylistItem'

interface PagePlayButtonProps {
  disabled?: boolean
  contextUri: string
}

const PagePlayButton = ({ disabled, contextUri }: PagePlayButtonProps) => {
  const pausePlayback = usePausePlaybackMutation()
  const resumePlayback = useResumePlaybackMutation()

  const { data: playbackState } = useFragment({
    fragment: PLAYBACK_STATE_FRAGMENT,
    from: { __typename: 'PlaybackState' },
  })

  const isPlaying = playbackState?.isPlaying ?? false
  const isCurrentContext = playbackState?.context?.uri ?? false
  const isPlayingInContext = isPlaying && isCurrentContext

  return (
    <PlayButton
      disabled={disabled}
      variant="primary"
      size="3.5rem"
      playing={isPlayingInContext}
      onClick={() => {
        if (isPlayingInContext) {
          pausePlayback()
        } else if (isCurrentContext) {
          resumePlayback()
        } else {
          resumePlayback({ contextUri })
        }
      }}
    />
  )
}

export default PagePlayButton
