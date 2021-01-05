import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import Notiflix from "notiflix";
import { setstate } from './Actions/ActionType';
import PostApiCall from '../Api';

import moment from 'moment'

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" style={{height:'183px'}}>
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input
      accept="image/*"
      id="photo-upload" type="file" onChange={onChange}/> 
    </label>


const ViewTestimonialMaster=()=> {

    const [state, setState] = useState({
        // name:'',
        // ImageApiUrl:'https://images.beatmysugar.com/api/Image/SaveImage',
        // ImageData : [],
        file:''

        
    })
    const [imagePreviewUrl, setimagePreviewUrl] = useState('https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png')
    const [newRating,setnewRating] = useState(JSON.parse(localStorage.getItem('TestimonialDetails')).fld_rating)
    const [feedback,setfeedback] = useState('')
    const [showOnWebsite,setshowOnWebsite] = useState('Yes')
    const [ImageData,setImageData] = useState([])
    const [name, setname] = useState('')
    const [ImageApiUrl ,setImageApiUrl] = useState('https://images.beatmysugar.com/api/Image/SaveImage')
    const [id,setid] = useState('')

    const [AddAccess, setAddAccess] = useState(false)
    const [ApproveAccess, setApproveAccess] = useState(false)

    useEffect(() => {
        // Notiflix.Loading.Dots('');

        var det = localStorage.getItem('TestimonialDetails')
         var TestimonialData = JSON.parse(det)


        //  setnewRating(2)
         setfeedback(TestimonialData.fld_feedback)
         setshowOnWebsite(TestimonialData.fld_showOnWebsite)
         setimagePreviewUrl(TestimonialData.fld_imageurl == null ? imagePreviewUrl : TestimonialData.fld_imageurl)
         setid(TestimonialData.fld_id)
         setname(TestimonialData.fld_name)
        
         
         var login=localStorage.getItem('LoginDetail');
         var details=JSON.parse(login)
 
         PostApiCall.postRequest({
   
             staffid : details[0].fld_staffid,
         
           },"GetUserSubMenuAccessRights").then((resultssub) => 
           
             // const objs = JSON.parse(result._bodyText)
             resultssub.json().then(objsub => {  
             if(resultssub.status == 200 || resultssub.status==201){
 
            var filteredRights = objsub.data;
                 // console.log(filteredRights)
         
                 var con = 0
                 for(var i = 0 ; i< filteredRights.length ;i++){
    
                     if(filteredRights[i].fld_menuname == 'Edit Testimonial'){
         
                       if(filteredRights[i].fld_access == 1){
               
                         setAddAccess(true)
                       }
                     }  if(filteredRights[i].fld_menuname == 'Approve Testimonial'){
         
                        if(filteredRights[i].fld_access == 1){
                
                          setApproveAccess(true)
                        }
                      }
                    
                   con = con + 1
                   if(con == filteredRights.length){
                       Notiflix.Loading.Remove();
                   }
                 }
         
 
             }
 
         }))
        //  Notiflix.Loading.Remove()
      },[]);




  const  ratingChanged = (newRating) => {
        setnewRating(newRating)
        // console.log(newRating)
      };

    // const  reviewForm=()=>{
    //     return(
    //       <div className="review-body">
    //      <h3 >Your Exerience</h3>
        
    //        <ReactStars
    //       count={5}
    //       onChange={ratingChanged}
    //       size={22}
    //       fullIcon={<i className="fa fa-star"></i>}
    //       activeColor="#ffd700"
    //       style={{padding:'6px!important'}}
    //     />
    //             <form  className='mt-2'>
    //               <div className="form-group ">
    //                       <label className='py-1'>Enter Title</label>
    //                       <input required  type="text" className="form-control" onChange={changeHandler('title')}  placeholder={"Title for your feedback"} />
    //                   </div>
      
    //                   <div className="form-group ">
    //                       <label>Your Feedback</label>
    //                       <textarea required rows={5} type="text" className="form-control" onChange={changeHandler('comment')} placeholder={"Your comments"} />
    //                   </div>
                     
      
    //                   </form>
    //      </div>
    //     )
      
    //     }
   const  SaveProduct=(e)=>{
      e.preventDefault()



       if(name==''){
        // console.log("Hi")
        return   Notiflix.Notify.Failure(`Please enter customer name.`)
       }
    //    console.log(showOnWebsite)
 if(newRating==0){
    // console.log(newRating)
    return   Notiflix.Notify.Failure(`Please select customer rating.`)

       }
       if(feedback==''){
        return   Notiflix.Notify.Failure(`Please enter customer feedback/review.`)
    
           }
        //    if(feedback.length>1000){
        //     return   Notiflix.Notify.Failure(`Please enter customer feedback/review within 1000 characters.`)
        
        //        }
       if(showOnWebsite==''){
        return   Notiflix.Notify.Failure(`Please specify whether to the review should be visible on the website.`)
    
           }


           Notiflix.Loading.Dots('Please wait...');

           var login=localStorage.getItem('LoginDetail');
         var details=JSON.parse(login)
           PostApiCall.postRequest ({
               id : id,
             name :name,
             feedback :feedback,
             showOnWebsite :showOnWebsite,
             rating :newRating,
             updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
           },"Update_Testimonial").then((result) =>
           result.json().then(obj => {
               if(result.status == 200 || result.status == 201){
        
            
               if(JSON.stringify(ImageData) != '[]' && ImageData != undefined){

                const form = new FormData();
                         
    form.append('file', ImageData);
    form.append('foldername' , 'Customer')
    form.append('filename' ,'testimonial-'+id)

    
    fetch(ImageApiUrl, {
    method: 'POST',
    body: form
    }).then((image) => {
    
    image.json().then(data => ({
    data: data,
    status: image.status
    })
    ).then(res => {


        PostApiCall.postRequest({

            testimonialId: id,
            imageurl : 'https://images.beatmysugar.com/images/Customer/'+res.data.Message.split(',')[2].split('=')[1].trim(),         
         
       },"Add_Testimonial_Image").then((results1) => 
 
         results1.json().then(obj1 => {  
         if(results1.status == 200 || results1.status==201){

           
            Notiflix.Loading.Remove()
            Notiflix.Notify.Success('Testimonial successfully updated.')
            window.location.href = '/testimonialmanagementlist'
          
           
         }
        }))


    })
})

               }
               else{

                Notiflix.Loading.Remove()
                Notiflix.Notify.Success('Testimonial successfully updated.')
                window.location.href = '/testimonialmanagementlist'
             

               }




            



               
               }else{
                 Notiflix.Loading.Remove();
                 Notiflix.Notify.Failure('Something went wrong, try again later.')
               }
           })
           )



   }

 const  photoUpload = e =>{
    e.preventDefault();
    if (e.target.files[0].size < 100000) {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file)
    reader.onloadend = () => {
      setState({
        file: file,
      
        // ImageData : file
      });
      setImageData(file)
      setimagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file);
 } else {
        Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
      }
  }
    return (
        <div className="App">
                <div id="wrapper">
                    <div className="content-page">
                        <div class="content">
                            <div className="container-fluid">
                                <div className="row page-title">
                                    <div className="col-md-12">
                                        <nav aria-label="breadcrumb" class="float-right mt-1">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="">Testimonial Management</a></li>
                                                <li class="breadcrumb-item"><a href="/testimonialmanagementlist">Testimonial List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Update Testimonial</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Update Testimonial </h4>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div id="smartwizard-arrows">
                                                    <ul>
                                                        <li className={ 'active nav-item'}><a  class="wizardlist nav-link">Testimonial Information                                                        </a></li>

                                                       
                                                    </ul>
                                                    <div className="p-3" style={{ minHeight: '0px' }}>
                                                        <div id="sw-arrows-step-1"
                                                            className="tab-pane step-content"
                                                            style={{ display:  'block' }} 
                                                           
                                                        >
                                                            <form className="needs-validation" novalidate onSubmit={(e) => {
                                                                e.preventDefault()
                                                            }}>
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Testimonial Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                               



                                                                                <div class="col-md-4">
                                                                                  <label for="validationCustom05">Upload Profile Photo (Size &lt; 100kb, 500*500)</label>
                                                                                  <div class="div1">
                                                                                               <ImgUpload onChange={photoUpload} src={imagePreviewUrl}/>
                                                      
                                                                                     </div>
                                                                                  </div>

                                                                                <div class="col-md-8">
                                                                                    
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Name (160 Character)<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                  required
                                                                                  value={name}
                                                                                  onChange={(text)=>{

                                                                                          setname(text.target.value)
                                                                          
                                                                                  }} />
                                                                                    
                                                                                </div>

                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Rating<span className="mandatory">*</span></label>
                                                                                    <ReactStars
                                                                                        count={5}
                                                                                        onChange={ratingChanged}
                                                                                        value={newRating}
                                                                                        size={22}
                                                                                        fullIcon={<i className="fa fa-star"></i>}
                                                                                        activeColor="#ffd700"
                                                                                        style={{padding:'6px!important'}}
                                                                                        />
                                                                                    
                                                                                </div>
                                                                                </div> 
                                                                               

                                                                                </div>
                                                                                 <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Feedback (max. 1000 charaters)<span className="mandatory">*</span></label>
                                                                                    <textarea required rows={5} type="text" class="form-control" id="validationCustom05"
                                                                                    value={feedback}
                                                                                    onChange={(text)=>{
                                                                                            setfeedback(text.target.value)
                                                                                       
            
                                                                                    }} />
                                                                                    
                                                                                </div>
                                                                                </div>


                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Show On website<span className="mandatory">*</span></label>
                                                                                    <br/>
                                                                                    <label class="radio-inline">
                                                                                <input type="radio" 
                                                                                checked={showOnWebsite=='Yes' ? true : false}
                                                                                onClick={()=>setshowOnWebsite("Yes")}/> Yes
                                                                            </label>
                                                                            <label class="radio-inline" style={{marginLeft:'20px'}}>
                                                                                <input type="radio"  checked={showOnWebsite=='No' ? true : false}  onClick={()=>setshowOnWebsite("No")}/> No
                                                                            </label>
                                                                                    
                                                                                </div>
                                                                                </div>




                                                                               
                                                                                <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                         
                                                                            <button className="btn btn-secondary sw-btn-next"
                                                                                disabled={!AddAccess}
                                                                            //  onClick={()=>{
                                                       
                                                                            //     setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={SaveProduct}>Update Testimonial</button>

                                                                            <button className="btn btn-secondary sw-btn-next"
                                                                                disabled={!ApproveAccess}
                                                                            //  onClick={()=>{
                                                       
                                                                            //     setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={SaveProduct}>Approve Testimonial</button>
                                                                        </div>
                                                                    </div> 
                                                                       
                                                                            </div> 
                                                                            </div> 
                                                                            </div> 
                                                                            </div> 
                                                                            </div>
                                                                            
                                                                            
                                                 
                                                                                       </form> 
                                                                            
                                                                            </div> 
                                                                            </div>


                                                                            
                                                                            </div> 
                                                                            </div> 
                                                                            </div> 
                                                                            </div> 
                                                                            </div> 
                                                                            
                                                                            
                               
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
    )
}
export default ViewTestimonialMaster