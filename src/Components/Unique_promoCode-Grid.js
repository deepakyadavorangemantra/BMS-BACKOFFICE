import React, { Component } from 'react';
import Helmet from 'react-helmet'
import { MDBDataTableV5,MDBCol } from 'mdbreact';
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class OfferGrid extends Component {
     constructor(props){
         super(props)
         this.state = {
            
            OfferData : [],
            searchInput:'',
           OfferName:[],
           VendorName:[],
           filteredOfferName:'',
           filteredVendorName:'',

  
          }
        }
    
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("Get_UniquePromoCodeList").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  // console.log(obj.data)
                  let tempVendorName=[]
                  let tempOfferName=[]
                  obj.data.map(data=>{
                    tempVendorName.push(data.fld_vendorname)
                    tempOfferName.push(data.fld_offerName )
                    
                  })
                   this.setState({
                      OfferData : obj.data,
                      OfferName:tempOfferName,
                      VendorName:tempVendorName
                    })
      
      
                    Notiflix.Loading.Remove();
                  }))
                  

                  
                }

                seachBarHandler=(e)=>{
                    this.setState({...this.state,searchInput:e.target.value})
              }  
     
    render(){

        const data={
            columns: [
                {
                  label: 'Offer Name',
                  field: 'OfferName',
                  sort: 'disabled',
                  width: 50,
                  attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'OfferName',
                  },
                },
                {
                  label: 'Offer Caption',
                  field: 'OfferCaption',
                  sort: 'disabled',
                  width: 50,
                },
                {
                  label: 'Coupon Code',
                  field: 'CouponCode',
                  sort: 'disabled',
                  width: 50,
                },
                {
                  label: 'Price(%)',
                  field: 'Price',
                  sort: 'disabled',
                  width: 50,
                },
             
                {
                  label: 'Max Discount(Rs.)',
                  field: 'MaxDiscount',
                  sort: 'disabled',
                  width: 50,
                },
                {
                  label: 'Start Date',
                  field: 'StartDate',
                  sort: 'disabled',
                  width: 50,
                },
                {
                  label: 'End Date',
                  field: 'EndDate',
                  sort: 'disabled',
                  width: 50,
                }, 
           
               
            
             
                {
                  label: 'Vendor Name',
                  field: 'VendorName',
                  sort: 'disabled',
                  width: 50,
                },
             
                {
                  label: 'Email',
                  field: 'Email',
                  sort: 'disabled',
                  width: 50,
                },
       
                {
                  label: 'Update On',
                  field: 'UpdateOn',
                  sort: 'disabled',
                  width: 50,
                },
       
                {
                  label: 'Action',
                  field: 'Action',
                  sort: 'disabled',
                  width: 50,
                },
              ],
              rows:this.state.OfferData.filter((data,i)=>{
                if(this.state.filteredOfferName==''&&this.state.filteredVendorName==''){
                    return data
                  }
                  
                else  if(this.state.filteredOfferName!==''&&this.state.filteredVendorName!==''){
                    if(data.fld_offerName==this.state.filteredOfferName&&data.fld_vendorname==this.state.filteredVendorName){
                        return data
                    }
                  }
                  else  if(this.state.filteredOfferName==''&&this.state.filteredVendorName!==''){
                    if(data.fld_vendorname==this.state.filteredVendorName){
                        return data
                    }
                  }
                  else  if(this.state.filteredOfferName!==''&&this.state.filteredVendorName===''){
                    if(data.fld_offerName==this.state.filteredOfferName){
                        return data
                    }
                  }

              }).filter(data=>{
                
                if(this.state.searchInput==''){
                  return data
                }
                if(this.state.searchInput!==''&&
                (
                `${data.OfferName?data.OfferName.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                `${data.fld_caption?data.fld_caption.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                `${data.fld_code?data.fld_code.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                 `${data.fld_startdate?data.fld_startdate.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                `${data.fld_enddate?data.fld_enddate.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                `${data.fld_vendorname?data.fld_vendorname.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                `${data.fld_vendoremail?data.fld_vendoremail.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase())||
                `${data.fld_updatedon?data.fld_updatedon.toLowerCase():''}`.includes(this.state.searchInput.toLowerCase()))){
                  
                   return data
                 }
              }).map((data,i)=>{
                // console.log(data)
                  return {
                    OfferName: data.fld_offerName,
                    OfferCaption:data.fld_caption,
                    CouponCode:  data.fld_code,
                   
                    Price:data.fld_discount,
                 
                    MaxDiscount: data.fld_maximumdiscountprice,
                    StartDate: data.fld_startdate,
                    EndDate:  data.fld_enddate,
                    
                    VendorName: data.fld_vendorname,
                    Email: data.fld_vendoremail,
                    UpdateOn:data.fld_updatedon,
                    
                    Action: <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                    onClick={()=>{
                       
                        localStorage.setItem('PromoCodeDetails',JSON.stringify(data))
                        window.location.href = '/viewuniquepromocode'
                    }}
                    >
                <span  >
                <Edit3/>
                    </span>
                   
                    </div> &nbsp;&nbsp;


                     </td>
              
                   
                  
                  }
              })
        } 

        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
              <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Unique Promo Code</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Unique Promo Code List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Unique Promo Code List
                            </h4>
                            <p style={{float:'right'}}>
                                <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn-primary rounded"
                                table="table-to-xls"
                                filename='Unique Promo Code Report'
                                sheet="tablexls"
                                buttonText="Download as XLS"
                                style={{background: '#060a4a!important',
                                    color: 'white'
                                }}/>
                                </p>
                            
                        </div>
                    </div> 

                    <div class="row">
                 <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col-3 text-left">
                                                                       <div class="form-group">
    <label for="exampleFormControlSelect1">Filter By Offer Name</label>
    <select onChange={(e)=>{
        this.setState({...this.state,
      filteredOfferName:e.target.value  })
    }} class="form-control" id="exampleFormControlSelect1">
      <option value=''>Offer Name </option>
    {[...new Set(this.state.OfferName)].map((data,i)=>{
      return  <option value={data}>{data}</option>
    })}  
      
    </select>
  </div>
                                                                       </div>
                                                                       <div class="col-3 text-left">
                                                                       <div class="form-group">
    <label for="exampleFormControlSelect1">Filter By Vendor Name</label>
    <select onChange={(e)=>{
        this.setState({...this.state,
      filteredVendorName:e.target.value  })
    }} class="form-control" id="exampleFormControlSelect1">
      <option>Vendor Name</option>
      {[...new Set(this.state.VendorName)].map((data,i)=>{
      return  <option value={data}>{data}</option>
    })} 
    </select>
  </div>
                                                                       </div>


                                                                        
                                                                       <div class="col text-right">
                                       <a href='/adduniquepromocode'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Promo Code</button>
                                  
                                       </a>
                                                                       </div>
                                </div>
                            </div>
                        </div> 
                     </div>
                
                </div>
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive">
                                <MDBCol  md="3" style={{marginBottom:'7px'}}>
                              <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(e)=>this.seachBarHandler(e)} />
                            </MDBCol>
                                {this.state.OfferData.length == 0?<div class="table-responsive">
                             
                             <table id="basic-datatable" class="table dt-responsive nowrap">
                             <thead>
                             <tr>
                                        <th>Offer Name</th>
                                        <th>Offer Caption</th>
                                        <th>Coupon Code</th>
                                        <th>Price(%)</th>
                                        <th>Max Discount(Rs.)</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Vendor Name</th>
                                        <th>Email</th>

                                        <th>Update On</th>
                                        <th>Action</th>
                                       
                                       
                                       
                                        
                                    </tr>
                             </thead>
                           
                             <tbody>
                             
                                 <tr><td colSpan={12} style={{textAlign:'center'}}>No Offer Data Available</td></tr>
                             
                            
                                 </tbody>
                                 </table>
                               
                                 </div>
                            : <table ><MDBDataTableV5 id="table-to-xls" hover entriesOptions={[5, 20, 25,50]} entries={5} pagesAmount={4} data={data}  searchBottom={false}  /></table> }    
                             
                               
                            
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
}
export default OfferGrid;