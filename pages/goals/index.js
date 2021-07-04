import Link from'next/link'
import styles from '../../styles/Home.module.css'
import useSWR from 'swr'


export const getStaticProps = async() =>{

    const res = await fetch("https://unstats.un.org/SDGAPI/v1/sdg/Goal/List")

    const data = await res.json()

    return {
            props:{
                      ussdg: data
                  }
    }
}

const fetcher = url => fetch(url).then(res => res.json());
const usgoals = ({ussdg}) => {
  const { data, error } = useSWR('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List', fetcher)

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  
  return (
      <>
      
            <div className={styles.main}>
              {ussdg.map(ussdgs => (
                <>
                  <h2 className={styles.grid}>Goal {ussdgs.code}</h2>
                  
                  <Link href={'/goals/' + ussdgs.code} key={ussdgs.code}>

                    <a><h3 className={styles.code}>{ussdgs.title}</h3></a>
                  
                  </Link>
                </>
              ))}
            </div>
    
      </>
  )
}

export default usgoals
