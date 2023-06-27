export default function Carousel({items}) {
    return (
        <div className="carousel-container">
        {items.map(
            function(value, index) {
                return <Card key={index} title={value.themeName}></Card>
            }
        )}
        </div>
    )
}