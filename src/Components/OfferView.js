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
            Status:'Yes',
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

               OfferProducts : [
                   {label : 'N/A',value:'N/A'},
                   {label : 0,value:0},
                   {label : 1,value:1},
                   {label : 2,value:2},
                   {label : 3,value:3},
                   {label : 4,value:4},
                   {label : 5,value:5},
               ],

               OfferOption : [
                {label : 'Yes',value:'Yes'},
                {label : 'No',value:'No'},
               ],

               VerticalOption : [
                {label : 'All',value:'All'},
                {label : 'Accessories',value:'Accessories'},
                {label : 'Books',value:'Books'},
                {label : 'Covid Essentials',value:'Covid Essentials'},
                {label : 'Food',value:'Food'},
                {label : 'Footwear',value:'Footwear'},
                {label : 'Socks',value:'Socks'},
          
               ],
               Vertical:'All',
               CategoryData:[{label:'All',value:0}],
               Branddata:[],
               VendorData:[],
               Vendor:'',
               Brand:0,
              BankOffer : [
                {label : 'Yes',value:'Yes'},
                {label : 'No',value:'No'},
               ],
               Bank:'',
               BankName:'',
               Category:0,
               Description:'',
               Discount:'',
               MaximumAmount:0,
               MinimumProduct:'N/A',
               AllOrder:'Yes',
               Freegift:'No',
               FirstOrder:'No',
               OneTime:'No',
               FreeShipping:'No',
            //    Vertical:'',
               Bank:'No',
               BankName:'',
               TermsCondition:'',
               OfferId:'',
               BankOfferData:[
            
                {label:'',value:''},
                {label:'Instant',value:'Instant'},
                {label:'Cashback',value:'Cashback'},

            ],
            BankOfferType:'',
            OfferKey:'',

        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);

        Notiflix.Loading.Dots('');

        var det = localStorage.getItem('OfferDetails')
        var OfferData = JSON.parse(det)

        //  console.log(OfferData)
         this.setState({
             OfferId:OfferData.fld_newofferid,
             Discount:OfferData.fld_discount,
             MaximumAmount:OfferData.fld_maximumamount,
             Status:OfferData.fld_showonwebsite,
             AllOrder:OfferData.fld_allOrder,
             BankName:OfferData.fld_bankName,
             Bank:OfferData.fld_bankOffer,
             Category:OfferData.fld_categoryid,
             Brand:OfferData.fld_brandid,
          
             Vertical:OfferData.fld_vertical,
             FreeShipping:OfferData.fld_freeShipping,
             OneTime:OfferData.fld_oneTime,
             FirstOrder:OfferData.fld_firstOrder,
             Freegift:OfferData.fld_freeGift,
             MinimumProduct:OfferData.fld_minimumProduct,
             BankOfferType:OfferData.fld_bankOfferType,
             OfferKey:OfferData.fld_offerKey

      })

         this.props.setoffercode(OfferData.fld_code)
         this.props.setoffercaption(OfferData.fld_caption)
         this.props.setofferstartdate(OfferData.fld_startdate)
         this.props.setofferenddate(OfferData.fld_enddate)
         this.props.setoffermaxprice(OfferData.fld_maximumdiscountprice)
         this.props.setofferminprice(OfferData.fld_minimumamount)

         new Promise( ( resolve, reject ) => {
            setTimeout( resolve, 1000 );
          } ).then( () => {
            this.setState( { 
                Description : OfferData.fld_description,
                TermsCondition:OfferData.fld_termscondition,
                

            } );
        } );


        PostApiCall.postRequest({

            vertical : OfferData.fld_vertical,
         },"Get_OfferCategoryData").then((results1) => 
           results1.json().then(obj => {
            if(results1.status == 200 || results1.status==201){

                console.log(obj.data)
                if(obj.data!= undefined && obj.data.length > 0){
                    var dt = []
                    dt.push({label:'All',value:0})
                    var nwdt = [...dt,...obj.data]
                   
                    this.setState({
                        CategoryData : nwdt
                    })
                }else
                {
                    var dt = []
                    dt.push({label:'All',value:0})
                    this.setState({
                        CategoryData : dt
                    })
                }
               

            Notiflix.Loading.Remove()

           }
        }))


        GetApiCall.getRequest("GetBrandData").then(resultdes =>
            resultdes.json().then(objbrand => {

                var dt = []
                dt.push({label:'All',value:0})
                var newdt = [...dt,...objbrand.data]
              
                this.setState({
                    Branddata: newdt
                })
           
            }))


            GetApiCall.getRequest("GetVendorData").then(resultdes =>
                resultdes.json().then(objcategory =>{
          
                    this.setState({
                        VendorData:objcategory.data,
                    })
    
                }))

    }


    onPost=()=>{

        if(this.state.Vertical !='All' || this.state.Vertical!='Footwear' || this.state.Vertical!= 'Socks'){
            Notiflix.Loading.Dots('Please wait...');
            // console.log( this.state.Vertical)
            PostApiCall.postRequest({
    
                vertical : this.state.Vertical,
             },"Get_OfferCategoryData").then((results1) => 
             
               // const objs = JSON.parse(result._bodyText)
               results1.json().then(obj1 => {
         
             
               if(results1.status == 200 || results1.status==201){
    
    
                var dt = []
                    dt.push({label:'All',value:0})
                    var newdt = [...dt,...obj1.data]
                    //dt.concat(obj.data)
                    // console.log(nwdt)
                    this.setState({
                        CategoryData : newdt
                    })
    
    
                // this.setState({
                //     CategoryData : obj1.data
                // })
    
                // console.log(obj1.data)
    
                Notiflix.Loading.Remove()
    
               }
            }))
    
        }else
        {
            var dt = []
            dt.push({label:'All',value:0})
            this.setState({
                CategoryData : dt,
                Category : 0
            })
        }

       
    }





    onSaveData(){

  
        Notiflix.Loading.Dots('Please wait...');

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

                                        PostApiCall.postRequest({
                                            newoffer_id:this.state.OfferId,
                                             caption : this.props.OfferReducer.Caption,
                                             discount :this.state.Discount,
                                             maximumdiscountprice :this.props.OfferReducer.MaxPrice,
                                             minimumamount : this.props.OfferReducer.MinPrice,
                                             maximumamount : this.state.MaximumAmount,
                                             description : this.state.Description,
                                             code : this.props.OfferReducer.Code,
                                             startdate :this.props.OfferReducer.StartDate,
                                             enddate :this.props.OfferReducer.EndDate,
                                             termscondition : this.state.TermsCondition,
                                             showonwebsite : this.state.Status,
                                             allOrder : this.state.AllOrder,
                                             freeGift : this.state.Freegift,
                                             firstOrder :this.state.FirstOrder,
                                             oneTime : this.state.OneTime,
                                             freeShipping : this.state.FreeShipping,
                                             vertical : this.state.Vertical,
                                             bankOffer : this.state.Bank,
                                             bankName : this.state.BankName,
                                             categoryid : this.state.Category,
                                             brandid : this.state.Brand,
                                             updated_on : moment().format('lll').toString(),
                                             updated_by : details[0].fld_staffid,
                                             minimumProduct:this.state.MinimumProduct,
                                             categoryname : this.state.CategoryData.filter(val => val.value == this.state.Category)[0].label,
                                             bankOfferType:this.state.BankOfferType,
                                             offerKey:this.state.OfferKey
                                        
                                        },"UpdateNewOffer").then((results2) => 
                                        
                                          // const objs = JSON.parse(result._bodyText)
                                          results2.json().then(obj2 => {

                                        
                                          if(results2.status == 200 || results2.status==201){

                                            //   console.log(obj2.data)
                                            Notiflix.Loading.Remove();
                                              this.props.offercleardata()
                                            Notiflix.Notify.Success('Successfully Added');
                                            window.location.href = '/offerlist'

                                          }else
                                          {
                                            Notiflix.Loading.Remove();
                                            Notiflix.Notify.Failure('Error Occured');
                                         

                                          }
                                        }))

     

}



  
  
    //   if(event.target.value.length <= 160){
   
    photoUpload = e =>{
        e.preventDefault();
        if (e.target.files[0].size < 100000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            ImageData : file
          });
        }
        reader.readAsDataURL(file);
     }
    //   else {
    //         Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
    //       }
      }

       
    
     




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
                                                <li class="breadcrumb-item"><a href="#">New Offer Management</a></li>
                                                <li class="breadcrumb-item"><a href="/newofferlist">New Offer List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Update New Offer</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Update New Offer</h4>
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
                                                                    class="wizardlist nav-link">Vendor & Bank Details</a></li>
                                                                    <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page5 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '5',
                                                                                Page5: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        class="wizardlist nav-link">Terms & Condition</a></li>
                                                                      
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
                                                                                   <label for="validationCustom05">Coupon code<span className="mandatory">*</span></label>
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
                                                                                   <label for="validationCustom05">Coupon Caption<span className="mandatory">*</span></label>
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
                                                                                  Notiflix.Notify.Failure('Please enter coupon captiom.');
                                                                                }

                                                                             }
                                                                            else
                                                                            {
                                                                              Notiflix.Notify.Failure('Please enter coupon code.');
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
                                                                            <label for="sw-arrows-first-name" >Coupon Description(maximum 500 Character)<span className="mandatory">*</span></label>
                                                                            
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
                                                                                  
                                                           
                                                                                    
                                                                                  
                                                                             
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                       
                                                                </div>
                                                                </div>
                                                                </div>
                                                         <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-body">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="row">
                                                                    <div class="col-md-6">
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">Minimum Products<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select"
                                                                          value={this.state.MinimumProduct}
                                                                          onChange={(text)=>{
                                                                            this.setState({
                                                                                MinimumProduct:text.target.value
                                                                            }) 
                                                                          }}
                                                                          >
                                                                          {this.state.OfferProducts.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}

                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div>
                                                                           <div class="col-md-6">
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">All Order<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select"
                                                                          value={this.state.AllOrder}
                                                                          onChange={(text)=>{
                                                                              this.setState({
                                                                                  AllOrder:text.target.value
                                                                              })
                                                                          }}
                                                                          >
                                                                          {this.state.OfferOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div>
                                                                          
                                                                           {/* <div class="col-md-6">
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">Free Gift<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select"
                                                                          value={this.state.Freegift}
                                                                          onChange={(text)=>{
                                                                              this.setState({
                                                                                  Freegift:text.target.value
                                                                              })
                                                                          }}
                                                                          >
                                                                          {this.state.OfferProducts.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                                                                     

                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div> */}
                                                                           <div class="col-md-6" style={{display : this.state.AllOrder == 'Yes' ? 'none' : ''}}>
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">First Order<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select"
                                                                          value={this.state.FirstOrder}
                                                                          onChange={(text)=>{
                                                                              this.setState({
                                                                                FirstOrder:text.target.value
                                                                              })
                                                                              
                                                                          }}
                                                                          >
                                                                          {this.state.OfferOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}

                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div>
                                                                           <div class="col-md-6" style={{display : this.state.AllOrder == 'Yes' ? 'none' : ''}}>
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">One Time<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select"
                                                                          value={this.state.OneTime}
                                                                          onChange={(text)=>{
                                                                              this.setState({
                                                                                  OneTime:text.target.value
                                                                              })
                                                                          }}
                                                                          >
                                                                          {this.state.OfferOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div>
                                                                         
                                                                           <div class="col-md-6">
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">Free Shipping<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select"
                                                                          value={this.state.FreeShipping}
                                                                          onChange={(text)=>{
                                                                              this.setState({
                                                                                  FreeShipping:text.target.value
                                                                              })
                                                                          }}
                                                                          >
                                                                          {this.state.OfferOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div>
                                                                        
                                                                           {/* <div class="col-md-6">
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">Referal Discount<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select">
                                                                          <option>Yes</option>
                                                                          <option>NA</option>
                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div> */}
                                                                         
                                                                        

                                                                 
                                                                </div>
                                                               
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
                                                                                    if(this.props.OfferReducer.MaxPrice!=''&&this.props.OfferReducer.MaxPrice!=0){
                                                                                        if(this.props.OfferReducer.MinPrice!=''&&this.props.OfferReducer.MinPrice!=0){
                                                                                           if(this.state.MinimumProduct!=''){
                                                                                                   if(this.state.AllOrder!=''){
                                                                                                    //    if(this.state.Freegift!=''){
                                                                                                           if(this.state.FirstOrder!=''){
                                                                                                               if(this.state.OneTime!=''){
                                                                                                                   if(this.state.FreeShipping!=''){
                                                                                                                    this.setState({
                                                                                                                        PageTitle : '4',
                                                                                                                        Page3 : 'Done'
                                                                                                                    }) 

                                                                                                                   }
                                                                                                                   else{
                                                                                                                    Notiflix.Notify.Failure('Please select offer for free shipping.');
                                                                                                          
                                                                                                                   }

                                                                                                               }
                                                                                                               else{
                                                                                                                Notiflix.Notify.Failure('Please select one time offer.');
                                                                                                      
                                                                                                               }

                                                                                                           }
                                                                                                           else{
                                                                                                            Notiflix.Notify.Failure('Please select first order offer.');
                                                                                                  
                                                                                                           }

                                                                                                    //    }
                                                                                                    //    else{
                                                                                                    //     Notiflix.Notify.Failure('Please select free gift.');
                                                                                              
                                                                                                    //    }

                                                                                                   }
                                                                                                   else{
                                                                                                    Notiflix.Notify.Failure('Please select all order.');
                                                                                          
                                                                                                   }

                                                                                               }
                                                                                               else{
                                                                                                Notiflix.Notify.Failure('Please select minimum product.');
                                                                                      
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
                                                                        <strong class="mr-auto">Bank and Vendor Detail</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                            <div class="row">

                                                                          
                                                                            <div class="col-md-6">
                                                                            <div class="form-group mb-2">
                                                                            <label for="validationCustom05">Bank Offer<span className="mandatory">*</span></label>
                                                                            <select className="form-control custom-select"
                                                                            value={this.state.Bank}
                                                                            onChange={(text)=>{
                                                                                this.setState({
                                                                                    Bank:text.target.value
                                                                                })
                                                                            }}>
                                                                         
                                                                            {this.state.BankOffer.map(
                                                                             schedule => (
                                                                                 <option
                                                                                 key={schedule.label}
                                                                                 value={schedule.value}
                                                                                 >
                                                                                 {schedule.label}
                                                                                 </option>
                                                                             )
                                                                             )}
                                                                          
                                                                            </select>
                                                                             
                                                                            
                                                                        </div>
                                                                            </div>

                                                                            
                                                                           <div class="col-md-6" style={{display:this.state.Bank=='Yes'?'':'none'}}>
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">Bank Offer Type<span className="mandatory">*</span></label>
                                                                          <select className="form-control custom-select" 
                                                                          value={this.state.BankOfferType}
                                                                          onChange={(text)=>{
                                                                              this.setState({
                                                                               BankOfferType:text.target.value
                                                                              })
                                                                          }}>
                                                                          {this.state.BankOfferData.map(
                                                                           schedule => (
                                                                               <option
                                                                               key={schedule.label}
                                                                               value={schedule.value}
                                                                               >
                                                                               {schedule.label}
                                                                               </option>
                                                                           )
                                                                           )}
                                                                          </select>
                                                                           
                                                                       </div>
                                                                           </div> 
                                                                           <div class="col-md-6" style={{display:this.state.Bank=='Yes'?'':'none'}}>
                                                                           <div class="form-group mb-2">
                                                                           <label for="validationCustom05">Offer Key<span className="mandatory">*</span></label>
                                                                         <input type="text" className="form-control"
                                                                           value={this.state.OfferKey}
                                                                           onChange={(text)=>{
                                                                               this.setState({
                                                                                   OfferKey:text.target.value
                                                                               })
                                                                           }}
                                                                         ></input>
                                                                           
                                                                       </div>
                                                                           </div>


                                                                            <div class="col-md-6" style={{display:this.state.Bank=='Yes'?'':'none'}}>
                                                                            <div class="form-group mb-2">
                                                                            <label for="validationCustom05">Bank Name<span className="mandatory">*</span></label>
                                                                          <input type="text" className="form-control"
                                                                            value={this.state.BankName}
                                                                            onChange={(text)=>{
                                                                                this.setState({
                                                                                    BankName:text.target.value
                                                                                })
                                                                            }}
                                                                          ></input>
                                                                            
                                                                        </div>
                                                                            </div>


                                                                            <div class="col-md-4" style={{display:this.state.Bank=='Yes'? 'none' :''}}>
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Vertical<span className="mandatory">*</span></label>
                                                                                  <select className="form-control custom-select"
                                                                                  value={this.state.Vertical}
                                                                                  onChange={(text)=>{
                                                                                     this.setState({
                                                                                        Vertical:text.target.value
                                                                                     },()=>{
                                                                                        this.onPost()
                                                                                     })
                                                                                    
                                                                                  }}>
                                                                      
                                                                                  {this.state.VerticalOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                                                                                  </select>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   
                                                                                   <div class="col-md-4" style={{display:this.state.Vertical == 'All' || this.state.Vertical =='Footwear' || this.state.Vertical =='Socks' || this.state.Bank=='Yes' ? 'none':''}}>
                                                                                   {this.state.CategoryData==''?(
                                                                                    <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Category<span className="mandatory">*</span></label>
                                                                                    <select className="form-control custom-select"
                                                                                    value={this.state.Category}
                                                                                    onChange={(text)=>{
                                                                                        this.setState({
                                                                                          Category:text.target.value  
                                                                                        })
                                                                                        
                                                                                    }}
                                                                                    >
                                                                                    {/* <option>Select Category</option>
                                                                                    <option key="All" value="All">All</option>
                                                                                    <option>No Category</option> */}
                                                                                     </select>
                                                                                    
                                                                                    
                                                                                </div>
                                                                                   ):(
                                                                                    <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Category<span className="mandatory">*</span></label>
                                                                                    <select className="form-control custom-select"
                                                                                    value={this.state.Category}
                                                                                    onChange={(text)=>{
                                                                                        this.setState({
                                                                                          Category:text.target.value  
                                                                                        })
                                                                                        
                                                                                    }}
                                                                                    >
                                                                             
                                                                    
                                                                                    {this.state.CategoryData.map(
                                                                                     schedule => (
                                                                                         <option
                                                                                         key={schedule.label}
                                                                                         value={schedule.value}
                                                                                         >
                                                                                         {schedule.label}
                                                                                         </option>
                                                                                     )
                                                                                     )}
                                                                                     </select>
                                                                                    
                                                                                    
                                                                                </div>
                                                                                   )}
                                                                                   </div>

                                                                            <div class="col-md-4" style={{display:this.state.Bank=='Yes'? 'none' :''}}>
                                                                            <div class="form-group mb-2">
                                                                            <label for="validationCustom05">Brand<span className="mandatory">*</span></label>
                                                                           <select className="form-control custom-select"
                                                                           value={this.state.Brand}
                                                                           onChange={(text)=>{
                                                                               this.setState({
                                                                                   Brand:text.target.value
                                                                               })
                                                                           }}>
                                                                  
                                                                         
                                                                           {this.state.Branddata.map(
                                                                            schedule => (
                                                                                <option
                                                                                key={schedule.label}
                                                                                value={schedule.value}
                                                                                >
                                                                                {schedule.label}
                                                                                </option>
                                                                            )
                                                                            )}
                                                                         
                                                                           </select>
                                                                            
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
                                                                              PageTitle : '3',
                                                                              Page4 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                           if(this.state.Vertical!=''){
                                                                            //    if(this.state.Category!=''){
                                                                                
                                                                                    //    if(this.state.Brand!=0){
                                                                                           if(this.state.Bank!=''){
                                                                                               if(this.state.Bank=='Yes'){
                                                                                                if(this.state.BankOfferType!=''){
                                                                                                    if(this.state.OfferKey!=''){

                                                                                                  

                                                                                               
                                                                                               if(this.state.BankName!=''){
                                                                                                this.setState({
                                                                                                    PageTitle : '5',
                                                                                                    Page4 : 'Done'
                                                                                                })

                                                                                               }
                                                                                               else{
                                                                                                Notiflix.Notify.Failure('Please enter bank name.');
                                                                                               }
                                                                                            }
                                                                                            else{
                                                                                                Notiflix.Notify.Failure('Please enter offer key.'); 
                                                                                            }
                                                                                            }
                                                                                            else{
                                                                                                Notiflix.Notify.Failure('Please select bank offer type.');
                                                                                            }
                                                                                            }
                                                                                            else{
                                                                                               
                                                                                                this.setState({
                                                                                                    PageTitle : '5',
                                                                                                    Page4 : 'Done'
                                                                                                })
                                                                                            }
                                                                                        }
                                                                                           else{
                                                                                            Notiflix.Notify.Failure('Please select bank offer.');
                                                                                           }

                                                                                    //    }
                                                                                    //    else{
                                                                                    //     Notiflix.Notify.Failure('Please select brand.');
                                                                                    //    }

                                                                                 
                                                                            //    }
                                                                            //    else{
                                                                            //     Notiflix.Notify.Failure('Please select category.');
                                                                            //    }
                                                                          }
                                                                           else{
                                                                            Notiflix.Notify.Failure('Please select Vertical.');
                                                                  
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
                                                                              PageTitle : '4',
                                                                              Page5 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                        if(this.state.TermsCondition!=''){
                                                                            if(((this.state.TermsCondition.replace( /(<([^>]+)>)/ig, '').trim()).length) < 500) {
                                                                         

                                                                          
                                                                                this.setState({
                                                                                    PageTitle : '6',
                                                                                    Page5 : 'Done'
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
                                                                                <label for="validationCustom05">Show On Website <span className="mandatory">*</span></label>
                                                                                  
                                                                                   <div class="form-group mb-2">
                                                                                   <label class="radio-inline">
                                                                                   <input type="radio" name="optradio"
                                                                                              checked={this.state.Status == 'Yes' ? true : false}
                                                                                               onChange={()=>{
                                                                                                   this.setState({
                                                                                                       Status : 'Yes'
                                                                                                   })
                                                                                               }}/> Yes
                                                                                            </label>
                                                                                           <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                                                               <input type="radio" name="optradio" 
                                                                                               checked={this.state.Status == 'No' ? true : false}
                                                                                               onChange={()=>{
                                                                                                   this.setState({
                                                                                                       Status : 'No'
                                                                                                   })
                                                                                               }}/> No
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
                                                                       >Update Offer</button>
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
  
  

