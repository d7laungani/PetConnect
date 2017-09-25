import React, {Component} from 'react';
import './file-drop.css'
import DropToUpload from 'react-drop-to-upload';

export default class UploadPage extends Component {

    constructor (props) {
        super(props)

        this.state = {
            images: []
        }
        this._handleDrop = this._handleDrop.bind(this);
        console.log('reached here')
    }




    _handleDrop () {

        console.log('handling drop ')
    }


    render() {
        return (
                <DropToUpload
                    onDrop={ this._handleDrop }
                >
                    Drop file here to upload
                </DropToUpload>
        )

    }



}