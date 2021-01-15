/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';


import moment from 'moment';
import Notiflix from 'notiflix';
import PostApiCall from '../Api';
import GetApiCall from '../GetApi';
import {
    setoffername,
    setoffercaption,
    setofferprice,
    setoffermaxprice,
    setofferminprice,
    setofferdescription,
    setoffercode,
    setofferstartdate,
    setofferenddate,
    setoffertermsconditions,
    setoffershowonwebsite,
    offercleardata
} from './Actions/ActionType'
import { connect } from 'react-redux';




class  AddOffer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            Page4 : 'Pending',
            Page5 : 'Pending',
            Page6 : 'Pending',
            Status:'Active',
            pictures: [],
                editorStateDescription : '',
                editorStateTerms : '',
                brandName: '',
                pharmaCompanyName: '',
                pharmaData : [],
                NumRegex : /^0|[0-9]\d*$/,
                MobileRegex : /^[0-9]*$/,
                DecimalRegex : /^(\d*\.?\d{0,9}|\.\d{0,9})$/,
                AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
                SpecialRegex : /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
                EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               UrlRegex : /^(https:\/\/www\.|httpss:\/\/www\.|https:\/\/|httpss:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
               imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
               Description:'',
               TermsCondition:'',
               Description:'',
               Discount:0,
               MaximumAmount:0,
               CouponNo:0,
               TermsCondition:'',
               VendorName:'',
               VendorMobileNo:'',
               VendorEmail:''

        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
        
        }






    onSaveData(){

  
        Notiflix.Loading.Dots('Please wait...');

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

                                        PostApiCall.postRequest({
                                            offername:this.props.OfferReducer.Code,
                                             caption : this.props.OfferReducer.Caption,
                                             discount :this.state.Discount,
                                             maximumdiscountprice :this.props.OfferReducer.MaxPrice,
                                             minimumamount : this.props.OfferReducer.MinPrice,
                                             maximumamount : this.state.MaximumAmount,
                                             description : this.state.Description,
                                             startdate :this.props.OfferReducer.StartDate,
                                             enddate :this.props.OfferReducer.EndDate,
                                             termscondition : this.state.TermsCondition,
                                             status : this.state.Status,
                                             couponsnumber :this.state.CouponNo,
                                             vendorname : this.state.VendorName,
                                             vendoremail : this.state.VendorEmail,
                                             vendormobilenumber : this.state.VendorMobileNo,
                                             updated_on : moment().format('lll').toString(),
                                             updated_by : details[0].fld_staffid,

                                        
                                        },"Add_UniquePromoCode").then((results) => 
                                        
                                          // const objs = JSON.parse(result._bodyText)
                                          results.json().then(obj => {

                                        
                                          if(results.status == 200 || results.status==201){
                                            //   console.log(obj)
                                   
                                            var count=0 

                                            for(var i=0;i<this.state.CouponNo;i++){
                                                PostApiCall.postRequest({
                                                    couponid:(JSON.parse(JSON.stringify(obj.data[0]))).PromoCodeId,
                                                    
                                                    updated_on:moment(new Date()).format('LLL'),
                                                    updated_by: details[0].fld_staffid,
                                                    onetime:'Yes',
                                               
                                               },"Add_PromoCodeCoupons").then((results1) => 
                                                 
                                                    // const objs = JSON.parse(result._bodyText)
                                                    results1.json().then(obj1 => {
                                             
                                
                                                    if(results1.status == 200 || results1.status==201){
                                                        count=count+1
                                                        if(count == this.state.CouponNo){

                                                            console.log(obj1)
                                                              Notiflix.Loading.Remove();
                                              this.props.offercleardata()
                                            Notiflix.Notify.Success('Successfully Added');
                                            window.location.href = '/uniquepromocodelist'

                                                        }

                                                    }
                                                }))

                                            }

                                          

                                          }else
                                          {
                                            Notiflix.Loading.Remove();
                                            Notiflix.Notify.Failure('Error Occured');
                                         

                                          }
                                        }))

     

}



  
  
    //   if(event.target.value.length <= 160){
  
    
     




    render() {
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
                                                <li class="breadcrumb-item"><a href="#">Unique Promo Code</a></li>
                                                <li class="breadcrumb-item"><a href="/newofferlist">Unique Promo Code List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add Promo Code</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Add Promo Code</h4>
                                    </div>
                                </div>

                               

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div id="smartwizard-arrows">
                                                    <ul>
                                                        <li className={this.state.PageTitle == '1' ? 'active nav-item' : this.state.Page1 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {
                                                            this.setState({
                                                                PageTitle: '1',
                                                                Page1: 'Done'
                                                            })
                                                        }} class="wizardlist nav-link">Offer Details</a></li>
                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Offer Description</a></li>
                                                            <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Validity</a></li>
                                                                
                                                                    <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page4 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '4',
                                                                                Page4: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        class="wizardlist nav-link">Terms & Condition</a></li>
                                                                      
                                                                    <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page5 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '5',
                                                                                Page5: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        class="wizardlist nav-link">Vendor Details</a></li>
                                                                        <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                            if (this.state.Page6 == 'Done') {
                                                                                this.setState({
                                                                                    PageTitle: '6',
                                                                                    Page6: 'Done',
                
                                                                                })
                                                                            }
                                                                        }}
                                                                            class="wizardlist nav-link">Status</a></li>
                                                     </ul>
                                                     
                                                    <div className="p-3" style={{ minHeight: '0px' }}>
                                                        <div id="sw-arrows-step-1"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '1' ? 'block' : 'none' }}
                                                        >
                                                            <form className="needs-validation" novalidate onSubmit={(e) => {
                                                                e.preventDefault()
                                                            }}>
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Offer Details</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Offer Name<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05" 
                                                                                   value={this.props.OfferReducer.Code}
                                                                                   onChange={(text)=>{
                                                                                       this.props.setoffercode(text.target.value)
                                                                                   }}
                                                                                  ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Offer Caption<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value= {this.props.OfferReducer.Caption}
                                                                                   onChange={(text)=>{
                                                                                     this.props.setoffercaption(text.target.value)
                                                                                   }} >
                                                                                   </input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                                                 
                                                                                  
                                                           
                                                                                    
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                               
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                        
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                         onClick={() => {
                                                                           
                                                                             if(this.props.OfferReducer.Code!=''){
                                                                                 if(this.props.OfferReducer.Caption!=''){
                                                                                    this.setState({
                                                                                        PageTitle: '2',
                                                                                        Page1: 'Done'
                                                                                    })
                                                                                   
                                                                             }
                                                                                else
                                                                                {
                                                                                  Notiflix.Notify.Failure('Please enter offer captiom.');
                                                                                }

                                                                             }
                                                                            else
                                                                            {
                                                                              Notiflix.Notify.Failure('Please enter offer name.');
                                                                            }
                                                                            
                                                                        }
                                                                        } >  Next</button>
                                                                    </div>
                                                                </div>
                                                            
                                                 
                                                        </form>
                                                        </div>
                                                        <div id="sw-arrows-step-2"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '2' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Offer Description</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Offer Description(maximum 500 Character)<span className="mandatory">*</span></label>
                                                                            
                                                                            <div class="niceeditors">
                                                                            <CKEditor
                                                                                     config={{
                                                                                        extraPlugins: "justify,font,colorbutton",
                                                                                     }}                                
                                                                              data={this.state.Description}
                                                                              onChange={(text)=>{
                                                                                  this.setState({
                                                                                      Description:text.editor.getData()
                                                                                  })
                                                                              }}
                                                                                                                   
                                                                              />
                                                                            </div>
                                                                        </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                              

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                  
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" 
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '1',
                                                                              Page2 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                      
                                                                           if(this.state.Description!=''){
                                                                            if(((this.state.Description.replace( /(<([^>]+)>)/ig, '').trim()).length) < 500) {
                                                                         
                                                                                this.setState({
                                                                                    PageTitle : '3',
                                                                                    Page2 : 'Done'
                                                                                })
                                                                          
                                                                      
                                                                    }
                                                                     else
                                                                        {
                                                                          Notiflix.Notify.Failure('Please enter offer description with maximum 500 characters.');
                                                                        }
                                                                   }
                                                                    else{
                                                                        Notiflix.Notify.Failure('Please enter Coupon description.');
                                                                           
                                                                    }
                                                                         
                                                                       }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 
                                                        

                                                         <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Validity</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                               <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Start Date Time<span className="mandatory">*</span></label>
                                                                                   <input type="datetime-local" class="form-control" id="validationCustom05"
                                                                                  onKeyDown={(e) => e.preventDefault()}
                                                                                  value={this.props.OfferReducer.StartDate}
                                                                                  onChange={(text)=>{
                                                                                      this.props.setofferstartdate(text.target.value)
                                                                                  }} 
                                                                                  
                                                                                  />
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">End Date Time<span className="mandatory">*</span></label>
                                                                                   <input type="datetime-local" class="form-control" id="validationCustom05"
                                                                                    onKeyDown={(e) => e.preventDefault()} 
                                                                                    value={this.props.OfferReducer.EndDate}
                                                                               onChange={(text)=>{
                                                                                   this.props.setofferenddate(text.target.value)
                                                                               }}
                                                                                      />
                                                                                   </div>
                                                                                   </div>

                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Discount(%)<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value={this.state.Discount}
                                                                                   onChange={(text)=>{
                                                                                    if((this.state.DecimalRegex.test(text.target.value))){
                                                                                     
                                                                                       this.setState({
                                                                                           Discount:text.target.value
                                                                                       })
                                                                                    }
                                                                                   }}
                                                                                   ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Maximum Discount(Rs.) Amount<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value= {this.props.OfferReducer.MaxPrice}
                                                                                   onChange={(text)=>{
                                                                                    if((this.state.DecimalRegex.test(text.target.value))){
                                                                                       this.props.setoffermaxprice(text.target.value)
                                                                                    }
                                                                                   }} ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>

                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Minimum Amount(Rs.) Applicaple<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value= {this.props.OfferReducer.MinPrice}
                                                                                   onChange={(text)=>{
                                                                                    if((this.state.DecimalRegex.test(text.target.value))){
                                                                                       this.props.setofferminprice(text.target.value)
                                                                                    }
                                                                                   }}></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Maximum Amount(Rs.) Applicable</label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value={this.state.MaximumAmount}
                                                                                   onChange={(text)=>{
                                                                                    if((this.state.DecimalRegex.test(text.target.value))){
                                                                                       this.setState({
                                                                                           MaximumAmount:text.target.value
                                                                                       })
                                                                                   }}
                                                                                }
                                                                                   ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>


                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Number of Coupons<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value={this.state.CouponNo}
                                                                                   onChange={(text)=>{
                                                                                    if((this.state.DecimalRegex.test(text.target.value))){
                                                                                       this.setState({
                                                                                        CouponNo:text.target.value
                                                                                       })
                                                                                   }}
                                                                                }
                                                                                   ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                           
                                                                                    
                                                                                  
                                                                             
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                                </div>
                                                        
                                                              

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                  
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" 
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '2',
                                                                              Page3 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                       
                                                                           if(this.props.OfferReducer.StartDate!=''){
                                                                               if(this.props.OfferReducer.EndDate!=''){
                                                                                   if(this.state.Discount!=''){
                                                                                       if(this.props.OfferReducer.MaxPrice!=''){
                                                                                           if(this.props.OfferReducer.MinPrice!=''){
                                                                                               if(this.state.CouponNo!=''){
                                                                                                this.setState({
                                                                                                    PageTitle : '4',
                                                                                                    Page3 : 'Done'
                                                                                                }) 
                                                                                              
                                                                                                            
                                                                                                                }
                                                                                                                else{
                                                                                                                    Notiflix.Notify.Failure('Please enter number of coupon.');
                                                                                                          
                                                                                                                   }   

                                                  
                                                                                               
                                                                                           }
                                                                                           else{
                                                                                            Notiflix.Notify.Failure('Please enter offer minimum amount.');
                                                                                  
                                                                                           }
                                                                                       }
                                                                                       else{
                                                                                        Notiflix.Notify.Failure('Please enter offer maximum discount.');
                                                                              
                                                                                       }
                                                                                       
                                                                                   }
                                                                                   else{
                                                                                    Notiflix.Notify.Failure('Please enter offer discount(%).');
                                                                          
                                                                                   }

                                                                               }
                                                                               else{
                                                                                Notiflix.Notify.Failure('Please select offer end date.');
                                                                      
                                                                               }

                                                                           }
                                                                           else{
                                                                            Notiflix.Notify.Failure('Please select offer start date.');
                                                                  
                                                                           }

                                                                      
                                                                     }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 


                                                         <div id="sw-arrows-step-4"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Terms & Condition</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Terms & Conditions(maximum 500 Character)<span className="mandatory">*</span></label>
                                                                            
                                                                            <div class="niceeditors">
                                                                            <CKEditor
                                                                      data={this.state.TermsCondition}

                                                                      onChange={(text)=>{
                                                                          this.setState({
                                                                              TermsCondition:text.editor.getData()
                                                                          })
                                                                      }}
                                                                    />
                                                                            </div>
                                                                        </div>
                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                              

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                  
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" 
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '3',
                                                                              Page4 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                      
                                                                        if(this.state.TermsCondition!=''){
                                                                            if(((this.state.TermsCondition.replace( /(<([^>]+)>)/ig, '').trim()).length) < 500) {
                                                                                this.setState({
                                                                                    PageTitle : '5',
                                                                                    Page4 : 'Done'
                                                                                }) 

                                                                          
                                                                              
                                                                    }
                                                                     else
                                                                        {
                                                                          Notiflix.Notify.Failure('Please enter terms & conditions with maximum 500 characters.');
                                                                        }
                                                                   }
                                                                    else{
                                                                        Notiflix.Notify.Failure('Please enter terms & conditions for offer.');
                                                                           
                                                                    }
                                                                                                        
                                                                       }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 

                                                         <div id="sw-arrows-step-5"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '5' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Status</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Name<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value={this.state.VendorName}
                                                                                   onChange={(text)=>{
                                                                                       this.setState({
                                                                                        VendorName:text.target.value
                                                                                       })
                                                                                   }}
                                                                                
                                                                                   ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>

                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Email<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value={this.state.VendorEmail}
                                                                                   onChange={(text)=>{
                                                                                       this.setState({
                                                                                        VendorEmail:text.target.value
                                                                                       })
                                                                                   }}
                                                                                
                                                                                   ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>

                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Mobile Number<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   value={this.state.VendorMobileNo}
                                                                                   onChange={(text)=>{
                                                                                    if((this.state.NumRegex.test(text.target.value)) && (text.target.value.length <= 10)){
  
                                                                                       this.setState({
                                                                                        VendorMobileNo:text.target.value
                                                                                       })
                                                                                    }
                                                                                   }}
                                                                                
                                                                                   ></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                                                  
                                                                                  
                                                                                     
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                              

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                  
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" 
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '4',
                                                                              Page5 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                       
                                                                        if(this.state.VendorName!=''){
                                                                            if(this.state.VendorEmail!='') {
                                                                                if(this.state.EmailRegex.test(this.state.VendorEmail)){
                                                                                    if(this.state.VendorMobileNo!=''){
                                                                                        if(this.state.VendorMobileNo.length==10){
                                                                                            this.setState({
                                                                                                PageTitle : '6',
                                                                                                Page5 : 'Done'
                                                                                            }) 

                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            Notiflix.Notify.Failure('Please enter valid mobile number.'); 
                                                                                        }
                                                            

                                                                                    }
                                                                                    else{
                                                                                        Notiflix.Notify.Failure('Please enter mobile number.')
                                                                                        }
                                                                                }
   
                                                                         else{
                                                                            Notiflix.Notify.Failure('Please enter valid email address.'); 
                                                                         }

                                                                          
                                                                              
                                                                    }
                                                                     else
                                                                        {
                                                                          Notiflix.Notify.Failure('Please enter vendor email.');
                                                                        }
                                                                   }
                                                                    else{
                                                                        Notiflix.Notify.Failure('Please enter the vendor name.');
                                                                           
                                                                    }
                                                                                                        
                                                                       }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 

                                                         
                                                         <div id="sw-arrows-step-6"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '6' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Status</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                              
                                                                              
                                                                                <div class="col-md-12">
                                                                                <label for="validationCustom05">Status <span className="mandatory">*</span></label>
                                                                                  
                                                                                   <div class="form-group mb-2">
                                                                                   <label class="radio-inline">
                                                                                   <input type="radio" name="optradio"
                                                                                              checked={this.state.Status == 'Active' ? true : false}
                                                                                               onChange={()=>{
                                                                                                   this.setState({
                                                                                                       Status : 'Active'
                                                                                                   })
                                                                                               }}/> Active
                                                                                            </label>
                                                                                           <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                                                               <input type="radio" name="optradio" 
                                                                                               checked={this.state.Status == 'Inactive' ? true : false}
                                                                                               onChange={()=>{
                                                                                                   this.setState({
                                                                                                       Status : 'Inactive'
                                                                                                   })
                                                                                               }}/> Inactive
                                                                                       </label>
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                     
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                              

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                  
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" 
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '5',
                                                                              Page6 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                        onClick={this.onSaveData.bind(this)}
                                                                       >Submit</button>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        OfferReducer: state.OfferReducer
    };
  }
  
  export default connect(
    mapStateToProps,
    {
      setoffername,
      setoffercaption,
      setofferprice,
      setoffermaxprice,
      setofferminprice,
      setofferdescription,
      setoffercode,
      setofferstartdate,
      setofferenddate,
      setoffertermsconditions,
      setoffershowonwebsite,
      offercleardata
    }
  )(AddOffer);
  
  

