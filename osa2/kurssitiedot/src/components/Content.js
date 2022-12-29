import Part from './Part'

const Content = ({parts}) => {
    return (
      <>
        {parts.map((part) => 
                <Part key={part.id} exercise={part}/>
        )}
      </>
      )
  }

export default Content