export default function ErrorDisplay({ code=null, message=''}) {
    return (
        <main className="main bg-dark">
            <div className="error">
                <h2>{code ? code : 'Erreur de l\'application'}</h2>
                <p>{code ? message : 'Veuillez recharger la page'}</p>
            </div>
        </main>
    )
}