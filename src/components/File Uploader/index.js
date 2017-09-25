import Dropzone from 'react-dropzone'
import React, {Component} from 'react';




export default class FileUploader extends Component {

    render() {
        return (
            <div style={{justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
                <Dropzone onDrop={this.props.function} disabled={this.props.disabledStatus} >
                    <div style={{textAlign: 'center'}}>
                        <p>Drag Image Here</p>
                    </div>
                </Dropzone>
            </div>
        );
    }


}

