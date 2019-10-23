import React from 'react';


class Favorite extends React.Component {
    constructor(){
        super()
        this.state = {
            favMusic: [],
            favBooks: []
        }
    }
//creating component DidMount for the music and book to be fetched to be added on the favourites
    componentDidMount(){
        fetch('/favoritesMusic')
            .then(res => res.json())
            .then(music => this.setState({favMusic: music}, () => console.log('fetched...', music)))

            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({favBooks: books}, () => console.log('fetched...', books)))
    }
//creating delete fuction when you want to delete the music or favourite book 
    deleteMusic = (i) => {
        let musicToDelete = {
            deleted: i.id
        }
        fetch('/favoritesMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(musicToDelete)
        })
        document.location.reload()
    }

    deleteBooks = (i) => {
        let booksToDelete = {
            deleted: i.id
        }
        fetch('/favoritesBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booksToDelete)
        })
        document.location.reload()
    }
    render(){
        return(
            <div>
                <fieldset>
                    {this.state.favMusic.map(favM => <article key={favM.trackId}><p>{favM.artist}</p><p>{favM.trackId}</p>
                        <img src={favM.artwork} alt='artwork'/><br/>
                        <audio controls><source src={favM.sample}/></audio>
                        <p>{favM.track}</p>
                        <button onClick={() => {this.deleteMusic(favM)}}>Remove</button>
                         <i class="fa fa-trash-alt" onClick={() => {this.deleteMusic(favM)}} ></i>

                    </article>)}
                </fieldset>
                <fieldset>
                    {this.state.favBooks.map(favB => <article key={favB.artwork}><p>{favB.artist}</p>
                        <img src={favB.artwork} alt='artwork'/><br/>
                        <p>{favB.description}</p>
                        <p>{favB.track}</p>
                        <button onClick={() => {this.deleteBooks(favB)}}>Remove</button>

                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Favorite