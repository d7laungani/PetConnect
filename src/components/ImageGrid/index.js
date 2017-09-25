import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';
import { Link } from 'react-router-dom'

export default class ImageGrid extends Component {

    constructor (props) {
        super(props)
        this._selected = this._selected.bind(this)
    }



    render() {
        return (
            <Gallery style={{maringTop: '50px'}} images={this.props.imageSet} onClickThumbnail={this._selected} enableImageSelection={false}/>
        )

    }

    _selected (index) {
        let image = this.props.imageSet[index]
        console.log(this.props.imageSet[index])
        window.open(image.test,'_blank')

    }

}