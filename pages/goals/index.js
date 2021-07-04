import Link from'next/link'
import styles from '../../styles/Home.module.css'

export const getStaticProps = async() =>{

    const res = await fetch("https://unstats.un.org/SDGAPI/v1/sdg/Goal/List")

    const data = await res.json()

    return {
            props:{
                      ussdg: data
                  }
    }
}

const usgoals = ({ussdg}) => {
  return (
      <>
      
            <div className={styles.main}>
              {ussdg.map(ussdgs => (
                <>
                  <h2 key={ussdgs.title} className={styles.grid}>Goal {ussdgs.code}</h2>
                  
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
