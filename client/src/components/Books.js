import React from 'react';

class Books extends React.Component{
    constructor(){
        super()
        this.state ={
            data: [],
            bookInput: ''
        }
    }

    //creating function that will fectch books when you search them in the input
    newSearch(){
        fetch('/books')
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log('info fetched...', data)))
    }
    bookSearch = async () => {
        let search = this.state.bookInput.split(' ').join('+')
        const getBook = await fetch(`/book?search=${search}&type=${this.state.type}`)
        let res = await getBook.json()
        this.setState({
            data: res
        })
        console.log(res);
    }

    //creating function favorite which willfetch books with id , artwork and description
    favoriteBook= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            description: i.description
        }
        fetch('/favoritesBooks', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        alert('Added to favorites')
        console.log(favPic);
    }

    //we are rendering the header and the input and result of the book you search.
    render(){
        return (
            <div>
                <h1>Apple E-books</h1>
                <input type="text" onChange={(e) => this.setState({bookInput: e.target.value})}/>
                <button onClick={() => this.bookSearch()}>Search</button>

                <fieldset>
                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>{sort_data.artistName}<br/>
                    {sort_data.trackName}<br/>
                    <p>{sort_data.description}</p><br/>
                    <img src={sort_data.artworkUrl100} alt='bookPic'/>
                    <button onClick={() => {this.favoriteBook(sort_data)}}>Favorite</button>
                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Books