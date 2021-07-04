import styles from '../../styles/Home.module.css'


export const getStaticPaths = async()=>{
  const res = await fetch('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List')
    const data = await res.json()

    const paths = data.map(element => {
      return {
        params: {id: element.code.toString()}
      }
    })
    return {
       paths,
       fallback: false
    }

}
export const getStaticProps = async (context)=>{
  const id = context.params.id
  const res = await fetch('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List')
  const data  = await res.json();
  return {
    props: { goal: data,
            id: id,
    }
  }
}

// filter data based on the selected id
const Details = ({ goal,id }) => {
  return (
    <div>
      {goal.filter(goals =>goals.code == id).map(goalfilter =>(
        
            <p key={goals.code} className={styles.code}>{goalfilter.description}</p>
      ))}
   </div>
  )
}

export default Details
