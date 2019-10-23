// Import react
import React from 'react';

class Music extends React.Component{
    constructor(){
        super()
        this.state ={
            data: [],
            musicInput: ''
        }
    }
    newSearch(){
        fetch('/music')
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log('info fetched...', data)))
    }
    musicSearch = async () => {
        let search = this.state.musicInput.split(' ').join('+')
        const getMusic = await fetch(`/music?search=${search}&type=${this.state.type}`)
        let res = await getMusic.json()
        this.setState({
            data: res
        })
    }

    favoriteMusic= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            sample: i.previewUrl
        }
        fetch('/favoritesMusic', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
    }
    render(){
        return (
            <div>
                <h1>MP3 Display</h1>
                <input type="text" onChange={(e) => this.setState({musicInput: e.target.value})}/>
                <button onClick={() => this.musicSearch()}>Search</button>

                <fieldset>
                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>{sort_data.artistName}<br/>
                    {sort_data.trackName}<br/><img src={sort_data.artworkUrl100} alt={sort_data.trackId}/>
                    {console.log(sort_data)}<br/><audio controls><source src={sort_data.previewUrl}type='audio/mpeg'></source></audio>
                    <button onClick={() =>this.favoriteMusic(sort_data)}>Favorite</button>
                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Music