import React, {Component} from 'react';
import ImageGrid from '../ImageGrid'
import FileUploader from  '../File Uploader'
import Center from 'react-center';
import GoogleApiWrapper from '../Map'
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {

    constructor (props) {
       super(props)
       this.props.queryPhotos('&method=flickr.photos.search&text=fish')

        this.state = {
            images: [],
            loading: false,
            uploading: true,
            disabled: false,
            files: [],
            mapDisplayed: false
        }


        this.onDrop = this.onDrop.bind(this);
        this.petShelter = this.petShelter.bind(this);
        this.searchPets = this.searchPets.bind(this);
        this.displayImages = this.displayImages.bind(this)

    }


    renderHome () {


        if( this.state.mapDisplayed) {

            return (
                <GoogleApiWrapper searchPets={this.searchPets} />

            )
        }

        if (this.state.uploading) {

            return (
                <div>
                    <div style={{display: 'flex', position: 'relative', width: '100%',flexDirection: 'row', alignItems: 'center'}}>

                        <RaisedButton label="Pet Friendly Shelters" primary={true} style={{float: 'right'}} onClick={this.petShelter}/>
                    </div>
                <Center style={{marginTop: '8%'}}>
                    <FileUploader function={this.onDrop} disabledStatus={this.state.disabled}/>
                </Center>

                </div>
            )
        }


        if( this.state.loading) {

            return (
                <div style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                marginTop: '12%'}}>
                    <img src={require('../../images/Rolling.svg')} />
                </div>

            )
        }

        if( !this.state.loading && !this.state.uploading) {
            return (
                <div>
                    <div style={{display: 'flex', position: 'relative', width: '100%',flexDirection: 'row', alignItems: 'center'}}>

                        <h2 style={{float: 'left', marginRight: '44%', color: 'gray'}}> Click image to get more Details </h2>
                        <RaisedButton label="Pet Friendly Shelters" primary={true} style={{float: 'right'}} onClick={this.petShelter}/>
                    </div>
                    <br/>
                    <div>
                        <ImageGrid imageSet={this.state.images} />
                    </div>
                </div>
            );


        }




    }



    render() {
        return (
            <div>
                {this.renderHome()}
            </div>
        )

    }

    onDrop(files) {


        const {queryPets} = this.props

        var data = new FormData();


        let file = files[0]

       let url = file.preview

        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                var fd = new FormData()
                console.log(blob)
                fd.append('pet', blob, '1.png')

                // Upload
                fetch('http://10.212.76.150:3000/search', {method: 'POST', body: fd}).then(res=>res.json())
                    .then(res => this.displayImages(res));


            })

        this.setState({
            files,
            disabled: true,
            loading: true,
            uploading: false
        });


    }


    displayImages (data) {


        var unique = data.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

        let updated = unique.map(element => {

            return element = {

                src: element.img_url,
                thumbnail: element.img_url,
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                test: element.url

            }

        });




        this.setState({
            loading: false,
            images: updated,
        });



    }

    searchPets () {

        console.log('reached here')
        this.setState({
            disabled: false,
            loading: false,
            uploading: true,
            mapDisplayed: false
        });

    }

    petShelter () {

        this.setState({
            mapDisplayed: true,
            uploading: true,
        });

    }



}

/*
 let uriParts = files[0].name.split('.');
 let fileType = uriParts[uriParts.length - 1];
 let uri = files[0].preview;
 let type = files[0].type;
 */

/*

 <div>
 <div>
 <RaisedButton label="Pet Friendly Shelters" primary={true} style={{float: 'right'}} onClick={this.petShelter}/>
 </div>
 <div>
 <h2> Click image to get more Details </h2>
 <br/>
 <Center style={{margin: '8%', marginBottom: '1%'}}>
 <ImageGrid imageSet={this.state.images} />
 </Center>
 </div>
 </div>
 */