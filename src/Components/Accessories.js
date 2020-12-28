import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';


class Accessories extends Component {

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
        //       FilterData:[{'label':'Mithai','value' : 'Mithai'},{'label':'Sour','value' : 'Sour'},{'label':'Mango','value' : 'Mango'},{'label':'Grapes','value' : 'Grapes'}
        // ],
        DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
        NumRegex: /^[0-9]*$/,
        AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
        EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

        Branddata:[],
        Categorydata:[],
        
        GSTData:[],
        Companydata:[],
        ReturnableData: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          ReturnableDaysData:[
              {value:'1', label:'1'},
              {value:'2', label:'2'},
              {value:'3', label:'3'},
              {value:'4', label:'4'},
              {value:'5', label:'5'},
              {value:'6', label:'6'},
              {value:'7', label:'7'},
              {value:'8', label:'8'},
              {value:'9', label:'9'},
              {value:'10', label:'10'},
              {value:'11', label:'11'},
              {value:'12', label:'12'},
              {value:'13', label:'13'},
              {value:'14', label:'14'},
              {value:'15', label:'15'},
              {value:'16', label:'16'},
              {value:'17', label:'17'},
              {value:'18', label:'18'},
              {value:'19', label:'19'},
              {value:'20', label:'20'},{value:'21', label:'21'},{value:'22', label:'22'},{value:'23', label:'23'},{value:'24', label:'24'},{value:'25', label:'25'},
              {value:'26', label:'26'},{value:'27', label:'27'},{value:'28', label:'28'},{value:'29', label:'29'},{value:'30', label:'30'},

          ],

          GenderData: [
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Unisex", label: "Unisex" },
          ],
          Description:'',
          keyIngridents:'',
          ManufactureData:[],
          MarketerData:[],
          isReturnable : true,

          AddAccess : false,

          CountryOfOrigin : 'India',
          CountryOrigindata : [],

          ItemName:'',
          Brand:0,
          CompanyName:0,
          ManufactureName:0,
          MarketerName:0,
          Category:'',
          Type:'',
          Gender:'Male',
        
          Description:'',
          Returnable:'Yes',
          ReturnableDays:1,
          HSNCode:'',
          GSTRate:'',
          Categorydata:[],
          TypeData:[],

         
        }
    }

    componentDidMount() {

        const script = document.createElement("script");
        script.src = "assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });


        GetApiCall.getRequest("GetGstData").then(resultdes =>
            resultdes.json().then(objGst =>{
              
                this.setState({
                    GSTData:objGst.data,
                })
                // Notiflix.Loading.Remove()
            }))
            GetApiCall.getRequest("GetCompany").then(resultdes =>
                resultdes.json().then(objcompany =>{
                    this.setState({
                        Companydata:objcompany.data,
                        ManufactureData:objcompany.data,
                       MarketerData:objcompany.data

                    })
          
                }))


                GetApiCall.getRequest("GetCountry").then(resultdes =>
                    resultdes.json().then(obj => {
          
                          this.setState({
                            CountryOrigindata : obj.data ,
                            
                          })

                          

                        }))

                        GetApiCall.getRequest("GetBrandData").then(resultdes =>
                            resultdes.json().then(objbrand => {
                           
                              this.setState({
                                Branddata : objbrand.data,
                                
                              })
                            }))

                            GetApiCall.getRequest("Get_AccessoriesCategoryData").then(resultdes =>
                                resultdes.json().then(objcat => {
                               
                                  this.setState({
                                    Categorydata : objcat.data,
                                    
                                  })
                                //   console.log(objcat.data)
                                }))

                                GetApiCall.getRequest("Get_AccessoriesTypeMaster").then(resultdes =>
                                    resultdes.json().then(objtype => {
                                   
                                      this.setState({
                                        TypeData : objtype.data,
                                        
                                      })
                                    //   console.log(objtype.data)
                                    }))


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
                               
                                                if(filteredRights[i].fld_menuname == 'Add Accessories'){
                                    
                                                  if(filteredRights[i].fld_access == 1){
                                          
                                                   this.setState({
                                                     AddAccess : true
                                                   })
                                                  }
                                                }
                                               
                                              con = con + 1
                                              if(con == filteredRights.length){
                                                  Notiflix.Loading.Remove();
                                              }
                                            }
                                    
                            
                                        }
                            
                                    }))

                      }
   
   
    
      
     

      onChangeDescription(description){
        this.setState({Description:description.editor.getData()})
          }
      
          onChangeReturn(returnable){
            if(returnable.target.value == 'No'){
                this.setState({
                    isReturnable : false
                })
               this.setState({
                   ReturnableDays:0
               })
            }else
            {
              this.setState({
                  isReturnable : true
              })
              this.setState({
                ReturnableDays:1
            })
            }
            this.setState({
                Returnable:returnable.target.value
            })
         }




         nextlabel(){
             if(this.state.ItemName!=''){
              if(this.state.ItemName.length<=160){
                if(this.state.Brand!=''){
                    if(this.state.CompanyName!=''){
                        if(this.state.Category!=''){
                            if(this.state.Type!=''){
                                if(this.state.Gender!=''){
                                    if(this.state.CountryOfOrigin!=''){
                                         this.setState({
                                            PageTitle: '2',
                                            Page1: 'Done'
                                        }) 

                                    }
                                    else{
                                        Notiflix.Notify.Failure('Please select country of origin.')
                                      }

                                }
                    else{
                                    Notiflix.Notify.Failure('Please select gender.')
                                }
                            }
                            else{
                                Notiflix.Notify.Failure('Please select type.')
                              }

                        }
            else{
                 Notiflix.Notify.Failure('Please select category.')
               }
                    }
                  else{
                 Notiflix.Notify.Failure('Please select company name.')
               }

                }  
                else{
                 Notiflix.Notify.Failure('Please select brand name.')
               }
              }
              else{
                Notiflix.Notify.Failure('Please enter accessories item name with less then 160 characters.')
              }

             }
             else{
                Notiflix.Notify.Failure('Please enter Accessories item name.')
              }
           
             
          }


          nextlabel2(){
            if(this.state.Description!=''){
                this.setState({
                    PageTitle : '3',
                    Page2 : 'Done'
                })
            }
            else{
                Notiflix.Notify.Failure('Please enter Accessories description.')
              }
           
   } 
 
        // nextlabel3(){
        //   this.setState({
        //         PageTitle : '4',
        //         Page3 : 'Done'
        //     }) 
           
            
        // }

        
        onPost = () => {
            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
            console.log(details[0])
             Notiflix.Loading.Dots('');
                  
   PostApiCall.postRequest({

     name : this.state.ItemName,
     brandid : this.state.Brand,
     companyid : this.state.CompanyName,
     manufacturerid : this.state.ManufactureName,
     marketerid : this.state.MarketerName,
     typeid : this.state.Type,
     gender : this.state.Gender,
     categoryid : this.state.Category,
     description : this.state.Description,
     returnable : this.state.Returnable,
     returnabledays : this.state.ReturnableDays,
     hsncode : this.state.HSNCode,
     gstpercent :this.state.GSTRate,
     approved :'No',
     updatedby :details[0].fld_staffid,
     updatedon : moment().format('lll'),
     countryoforigin : this.state.CountryOfOrigin

    },"AddAccessoriesItemMaster").then((results) => 
        
    
   //    const objs = JSON.parse(result._bodyText)
      results.json().then(obj => {

    
      if(results.status == 200 || results.status==201){
    //    this.props.setclearfootwearitem()

       Notiflix.Loading.Remove()

       Notiflix.Notify.Success('Accessories successfully added.')
       window.location.href = '/accessoriesitemmasterlist'
    // console.log(obj.data)
       

   }
   else{
       Notiflix.Loading.Remove()
       Notiflix.Notify.Failure('Accessories already registered.')
     } 
   }
      )
    )

        }

  
        

SaveProduct(){
    if(this.state.Returnable!=''){
        if(this.state.HSNCode!=''){
            if(this.state.GSTRate!=''){

                this.onPost();
                    
                // this.setState({
                //     PageTitle : '3',
                //     Page3 : 'Done'
                // }) 
            }
            else{
                Notiflix.Notify.Failure('Please select GST rate.')
                }

        }
        else{
            Notiflix.Notify.Failure('Please enter HSN code.')
            }

    }
    else{
        Notiflix.Notify.Failure('Please select if the item is returnable or not.')
    }

}

    render() {
        console.log(this.props.itemName,"Item...")
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
                                                <li class="breadcrumb-item"><a href="">Product Management</a></li>
                                                <li class="breadcrumb-item"><a href="/accessoriesitemmasterlist">Accessories List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add New Accessories Item</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Add New Accessories Item</h4>
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
                                                        }} class="wizardlist nav-link">Accessories Item Information                                                        </a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Description</a></li>
                                            
                                                 <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">GST & Return</a></li>
                                                
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
                                                                        <strong class="mr-auto">Accessories Item Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Item Name (160 Character)<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                    value={this.state.ItemName}
                                                                                    onChange={(text)=>{

                                                                                        this.setState({
                                                                                            ItemName : text.target.value
                                                                                        })
            
                                                                                    }} />
                                                                                    
                                                                                </div>
                                                                            </div> 
                                                                            
                                                                            
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Brand<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                              
                                                                               value={this.state.Brand}

                                                                                onChange={(text)=>{

                                                                                this.setState({
                                                                                    Brand : text.target.value
                                                                                })
    
                                                                            }} >
                                                                            <option>Select Brand</option>
                                                                            {this.state.Branddata.map(brand =>(
                                                                                <option key={brand.value} value={brand.value}>
                                                                                {brand.label}
                                                                           </option>
                                                                               ))}
                                                                               </select>
                                                                           
                                                                        </div>
                                                                            </div>
                                                                             
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Company Name<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                            value={this.state.CompanyName}
                                                                            onChange={(text)=>{

                                                                                this.setState({
                                                                                    CompanyName : text.target.value
                                                                                })
    
                                                                            }}>
                                                                            <option>Select Company Name</option>
                                                                            {this.state.Companydata.map(company =>(
                                                                                <option key={company.value} value={company.value}>
                                                                                {company.label}
                                                                           </option>
                                                                               ))}
                                                                               </select>
                                                                          
                                                                                
                                                                        </div>
                                                                            </div>
                                                                             
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Manufacturer Name</label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                            value={this.state.ManufactureName}
                                                                             
                                                                            onChange={(text)=>{

                                                                                this.setState({
                                                                                    ManufactureName : text.target.value
                                                                                })
    
                                                                            }}

                                                                            >
                                                                            <option>Select Manufacture Name</option>
                                                                            {this.state.ManufactureData.map(manufacture =>(
                                                                                <option key={manufacture.value} value={manufacture.value}>
                                                                                {manufacture.label}
                                                                           </option>
                                                                               ))}
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Marketer Name</label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            value={this.state.MarketerName}
                                                                            onChange={(text)=>{

                                                                                this.setState({
                                                                                    MarketerName : text.target.value
                                                                                })
    
                                                                            }}
                                                                            >
                                                                            <option>Select Marketer Name</option>
                                                                           {this.state.MarketerData.map(marketername =>(
                                                                                <option key={marketername.value} value={marketername.value}>
                                                                                {marketername.label}
                                                                           </option>
                                                                               ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>


                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Category<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                            
                                                                           value={this.state.Category}
                                                                           onChange={(text)=>{

                                                                            this.setState({
                                                                                Category : text.target.value
                                                                            })
                                                                                 }} 
                                                                                 >
                                                                                 <option>Select Category</option>
                                                                                 {this.state.Categorydata.map(cat =>(
                                                                                    <option key={cat.value} value={cat.value}>
                                                                                    {cat.label}
                                                                               </option>
                                                                                   ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>

                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Type<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                             value={this.state.Type}
                                                                             onChange={(text)=>{

                                                                                this.setState({
                                                                                   Type : text.target.value
                                                                                })
    
                                                                            }}  >
                                                                           <option>Select Type</option>
                                                                            {this.state.TypeData.map(type =>(
                                                                                <option key={type.value} value={type.value}>
                                                                                {type.label}
                                                                           </option>
                                                                               ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>

                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Gender<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                             value={this.state.Gender} 
                                                                               onChange={(text)=>{

                                                                                this.setState({
                                                                                    Gender : text.target.value
                                                                                })
    
                                                                            }}>
                                                                            {this.state.GenderData.map(gender =>(
                                                                                <option key={gender.value} value={gender.value}>
                                                                                {gender.label}
                                                                           </option>
                                                                               ))}
                                                                               </select>
                                                                          
                                                                        </div>
                                                                            </div>
                                                                          

                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Country of Origin<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                           value={this.state.CountryOfOrigin}  
                                                                            onChange={(text)=>{

                                                                            this.setState({
                                                                                CountryOfOrigin : text.target.value
                                                                            })

                                                                        }}>
                                                                                 
                                                                        {this.state.CountryOrigindata.map(country =>(
                                                                            <option key={country.label} value={country.label}>
                                                                            {country.label}
                                                                       </option>
                                                                           ))}
                                                                        </select>
                                                                                
                                                                         
                                                                        </div>
                                                                            </div>
                                                                            
                                                                          </div>
                                                                                
                                                                         

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>

                                                                        
                                                                     
                                                                    </div>
                                                                </div>
                                                                <div className="toast fade show col-md-12" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">

                                                                <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                    <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                    <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                    // onClick={() => {

                                                                    //     this.setState({
                                                                    //         PageTitle: '2',
                                                                    //         Page1: 'Done'
                                                                    //     })
                                                                    // }}
                                                                    onClick={this.nextlabel.bind(this)}>Next</button>
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
                                                                    <strong class="mr-auto">Description</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    <div class="col-md-12">
                                                                    <div class="form-group">
                                                                    <label for="sw-arrows-first-name" >Description<span className="mandatory">*</span></label>
                                                                    
                                                                    <div class="niceeditors">
                                                                    <CKEditor
                                                                    config={{
                                                                        extraPlugins: "justify,font,colorbutton",
                                                                     }}
                                                                        data={this.state.Description}
                                                                        onChange={this.onChangeDescription.bind(this)}
                                                                          />
                                                                    </div>
                                                                </div>
                                                                    </div> 

                                                                    
                                                          
                                                                       </div>


                                                                    
                                                                </div>
                                                            </div>

                                                            <div className="toast fade show col-md-12" role="alert" aria-live="assertive"
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
                                                                //    onClick={()=>{
                                                                     
                                                                //      this.setState({
                                                                //          PageTitle : '3',
                                                                //          Page2 : 'Done'
                                                                //      })
                                                                //    }}
                                                                   onClick={this.nextlabel2.bind(this)}>Next</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                         </div>  {/* Sw-arrow 2*/}
                                                
                                                        <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">GST & Return</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                <div class="row">
                                                                <div className="col-md-3">
                                                                <div class="form-group">
                                                                <label for="sw-arrows-first-name" >Returnable<span className="mandatory">*</span></label>
                                                                
                                                                <select class="form-control custom-select" 
                                                                 value={this.state.Returnable}
                                                                 onChange={this.onChangeReturn.bind(this)}>
                                                                {this.state.ReturnableData.map(returnable => (
                           
                                                                    <option key={returnable.value} 
                                                                    value={returnable.value}>
                                                                      {returnable.label}
                                                                 </option>
                                                                 ))}
                                                                    
                                                                </select>
                                                            </div>
                                                                </div>
                                                                <div className="col-md-3" style={{display : this.state.isReturnable ? '' : 'none'}}>
                                                                <div class="form-group">
                                                                <label for="sw-arrows-first-name" >Returnable Days<span className="mandatory">*</span></label>
                                                                
                                                                <select class="form-control custom-select"
                                                                
                                                                value={this.state.ReturnableDays}
                                                                onChange={(text)=>{
                                                                    this.setState({
                                                                        ReturnableDays:text.target.value
                                                                    })
                                                                }}>

                                                                {this.state.ReturnableDaysData.map(returnabledays => (
                           
                                                                    <option key={returnabledays.value} value={returnabledays.value}>
                                                                      {returnabledays.label}
                                                                 </option>
                                                                 ))}
                                                                    
                                                                </select>
                                                            </div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                <div class="form-group mb-2">
                                                                    <label for="validationCustom05">HSN Code<span className="mandatory">*</span></label>
                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                     value={this.state.HSNCode}
                                                                   
                                                                     onChange={(text)=>{

                                                                        this.setState({
                                                                            HSNCode : text.target.value
                                                                        })

                                                                    }} />
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                            <div class="form-group mb-2">
                                                                <label for="validationCustom05">GST Rate(%)<span className="mandatory">*</span></label>
                                                              <select class="form-control custom-select"
                                                              value={this.state.GSTRate}
                                                              onChange={(text)=>{

                                                                this.setState({
                                                                    GSTRate : text.target.value
                                                                })

                                                            }}>
                                                            <option>Select GST Rate</option>
                                                                {this.state.GSTData.map(GST =>(
                                                                    <option key={GST.value} value={GST.value}>
                                                                    {GST.label}
                                                               </option>
                                                                   ))}
                                                                   
                                                               </select>
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
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '2',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                            //  onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.SaveProduct.bind(this)}>Add Accessories Item</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}
                                                       

                                                    
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



export default Accessories;
