import styles from '../../components/TableNPS/TableNPS.module.css';

export function growthNps(currNote, previous) {
  if (currNote > previous)
    return (
      <p
        className={`${'textDefault'} ${styles.cell}`}
        style={{ color: 'var(--aux-green)' }}>
        {currNote - previous} ▲
      </p>
    );
  if (currNote < previous)
    return (
      <p
        className={`${'textDefault'} ${styles.cell}`}
        style={{ color: 'var(--aux-red)' }}>
        {currNote - previous} ▼
      </p>
    );
  if (currNote === previous || currNote === '-' || previous === '-')
    return (
      <p
        className={`${'textDefault'} ${styles.cell}`}
        style={{ color: 'var(--gray-05)' }}>
        ■
      </p>
    );
}
