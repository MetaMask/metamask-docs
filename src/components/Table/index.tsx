import React from 'react'
import styles from './table.module.scss'
import clsx from 'clsx'

type TableCell = string | React.ReactElement

interface TableRow {
  cells: TableCell[]
}

interface ITable {
  classes?: string
  thCells: TableCell[]
  trRows?: TableRow[]
}

export default function Table({ classes, thCells = [], trRows = [] }: ITable) {
  return (
    <div className={clsx(styles.tableWrapper, classes)}>
      <div className={styles.tableInner}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.throw}>
              {thCells.map((cell, i) => (
                <th className={styles.thcell} key={`th-${i}`}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trRows.map((row, i) => (
              <tr key={`tr-${i}`} className={styles.trow}>
                {row.cells.map((cell, y) => (
                  <td className={styles.tdcell} key={`td-${i}-${y}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
