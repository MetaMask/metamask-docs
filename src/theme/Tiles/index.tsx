/* eslint-disable react-hooks/rules-of-hooks */
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'

import styles from './styles.module.css'

export interface Tile {
  key: string
  title: string
  icon: string
  path: string
}

export interface TileGroup {
  name: string
  description: string
  tiles: Tile[]
}

export default function Tiles(props: { tileGroups: TileGroup[] }) {
  const { tileGroups } = props
  return (
    <>
      {tileGroups.map((group: TileGroup) => (
        <div key={group.name} className={styles.tileGroup}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          <div className={styles.tileGroupContent}>
            {group.tiles.map((tile: Tile) => (
              <Link key={tile.key} className={styles.tile} to={tile.path}>
                {tile.icon ? (
                  <img
                    className={styles.tileIcon}
                    src={useBaseUrl(`/logos/${tile.icon}`)}
                    alt={tile.icon}
                  />
                ) : (
                  <div />
                )}
                <div className={styles.tileText}>{tile.title}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
