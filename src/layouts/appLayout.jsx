import react from  'react'

// Components 
import Header from '../components/header/header'

const WithAppLayout = (Content) => {

    return class extends react.Component {
        
        render (){ 
            const { showMessage } = this.props
            showMessage("Porfa seguir el layot definido, es para que todas las paginas tengan la misma estructura")

            return (
                <>
                    {/* Header */}
                    <Header/>
                    {/* Content */}
                    <Content showMessage={ showMessage } {...this.props}/>
                </>
            )
        }
    }
}

export default WithAppLayout