import React, { useEffect, useState , useRef} from 'react';
import Modal from 'react-responsive-modal';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import {Edit3,Trash2, Save} from 'react-feather';
import { confirmAlert } from 'react-confirm-alert'; // 
import { connectAdvanced } from 'react-redux';
import PostApiCall from '../../Api';
import imageConfig from '../../Api/imageApi';


const ImgUpload = ({
    onChange,
    src
}) =>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
            <img for="photo-upload" src={src} style={{ width: '100%', height: '100%', borderRadius: '5%' }} />
        </div>
        <input
        accept="image/*"
        id="photo-upload" type="file" onChange={onChange} />
    </label>

const ImageUploadModel =(props)=>{
    const [ showModel, setShowModel] = useState(false);
    const [ imagePreviewUrl, setImagePreviewUrl] = useState('https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png');
    const [ file, setFile] = useState('');
    const [ genratedurl, setGenratedurl] = useState('');
    
    function photoUpload (e){
        debugger;
        e.preventDefault();
        if (e.target.files[0].size < 200000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            setFile(file)
        }
        reader.readAsDataURL(file);
    }else {
            Notiflix.Notify.Failure("File too large, upload file less than 200 kb.");
            }
    }

    function genrateUrl(){
        debugger;
        console.log(file);
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
        Notiflix.Loading.Dots('Please wait...');
        const form = new FormData();
        
            form.append('file', file);
            form.append('foldername' , props.folder)
            form.append('filename' , file.name)
            
            fetch(imageConfig.ImageApiUrl, {
            method: 'POST',
            body: form
            }).then((image) => {
            
            image.json().then(data => ({
            data: data,
            status: image.status
            })
            ).then(res => {
            setGenratedurl(res.data.Message.img_url)
            Notiflix.Loading.Remove();
            })
        });
    }

        return(
            <React.Fragment>
                <div data-toggle="tooltip" title="Image Upload">
                    <a onClick={()=>{ setShowModel(true)}}  className="content-my-float">
                    <i class="fa fa-upload my-float"></i>
                    </a>
                </div>
                    <Modal className="modal-content"  styles={{  display: showModel === true? '':'none'}}
                        open={ showModel}
                        
                        onClose={()=>{
                            setShowModel(false)
                        }}
                        center>

                        <div className="modal-content modelcontent3">
                            <div className="modal-header">
                                <h4 className="modal-title">Genrate Image Url</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                        <ImgUpload onChange={(e)=>{photoUpload(e)}} src={imagePreviewUrl} />
                                        
                                        <div><button style={{     position: 'absolute',bottom: '25px'}} onClick={()=>{  genrateUrl()  }} className="btn btn-primary" id="btn-new-event" > Genrate Url </button></div>
                                    </div>
                                    </div>
                                </div>
                                <div className="row" style={{ display: genratedurl!=''? 'flex':'none'}}>
                                <div className="col-md-9"><div>{genratedurl}</div></div>
                                <div className="col-md-3"><button className="btn btn-primary" id="btn-new-event" data-toggle="tooltip" title="Copy Url" onClick={ ()=>{
                                     const el = document.createElement('textarea');
                                     el.value = genratedurl;
                                     el.setAttribute('readonly', '');
                                     el.style.position = 'absolute';
                                     el.style.left = '-9999px';
                                     document.body.appendChild(el);
                                     el.select();
                                     document.execCommand('copy');
                                     document.body.removeChild(el);
                                }}><span>
                                    <i class="fa fa-clipboard my-copy" aria-hidden="true"></i>
                                    <span> Copy Url</span>
                                </span>
                                </button></div>
                                </div>
                            </div>
                        </div>
                        </Modal>
            </React.Fragment>
        )
    
}
export default ImageUploadModel;