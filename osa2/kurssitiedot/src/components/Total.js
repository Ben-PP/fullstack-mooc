const Total = ({parts}) => {
    return (
        <h4>Number of exercises: {parts.reduce((accumulator, currentPart) =>
            accumulator + currentPart.exercises, 0)}
        </h4>
    )
  }

  export default Total