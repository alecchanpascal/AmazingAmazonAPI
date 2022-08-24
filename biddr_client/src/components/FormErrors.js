import '../index.css'

export default function FormErrors(props) {
    const errors = props.errors

    let filteredErrors = []

    for (const key in errors){
        if (key === props.field){
            errors[key].map((error) => filteredErrors.push(error))
        }
    }

    let field = props.field
    field === "end_date" ? field = "End Date" : field = field[0].toUpperCase() + field.slice(1,props.field.length)

    return(
        <ul className="FormErrors">
         {filteredErrors.map((error, i) => {
            return (
            <li key={i}>
                {""}
                {field}: {error}{"\n"}
            </li>
            )
        })}
        </ul>
    )
}
