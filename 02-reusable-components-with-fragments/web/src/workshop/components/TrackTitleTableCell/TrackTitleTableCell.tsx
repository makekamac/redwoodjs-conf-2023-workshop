import { Link, routes } from '@redwoodjs/router'

import CoverPhoto from 'src/components/CoverPhoto'
import DelimitedList from 'src/components/DelimitedList'
import ExplicitBadge from 'src/components/ExplicitBadge'
import TableCell from 'src/components/TableCell'

interface Track {
  explicit: any
  name: string
  album?: {
    images: Array<{ url: string }>
  }
  artists: Array<{ id: string; name: string }>
}

interface TrackTitleTableCellProps {
  includeCoverPhoto?: boolean
  track: Track
}

const TrackTitleTableCell = ({
  includeCoverPhoto = true,
  track,
}: TrackTitleTableCellProps) => {
  const explicit = track.explicit

  return (
    <TableCell>
      <div className="flex items-end gap-2">
        {includeCoverPhoto && (
          <CoverPhoto
            className="flex-shrink-0"
            image={track.album?.images.at(-1)}
            size="2.5rem"
          />
        )}
        <div className="flex flex-col">
          <span className="line-clamp-1 text-base text-primary">
            {track.name}
          </span>
          <div className="flex items-center gap-2">
            {explicit && <ExplicitBadge />}
            <span className="text-muted">
              <DelimitedList delimiter=", ">
                {track.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    className="transition-colors duration-150 hover:text-primary"
                    to={routes.artist({ id: artist.id })}
                  >
                    {artist.name}
                  </Link>
                ))}
              </DelimitedList>
            </span>
          </div>
        </div>
      </div>
    </TableCell>
  )
}

TrackTitleTableCell.fragments = {
  track: gql`
    fragment TrackTitleTableCell_track on Track {
      name
      explicit
      album {
        images {
          url
        }
      }
      artists {
        id
        name
      }
    }
  `,
}

export default TrackTitleTableCell
