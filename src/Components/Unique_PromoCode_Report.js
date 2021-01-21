import React, { Component, Fragment,useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import Notiflix from "notiflix";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';


export default function UniquePromocode_Report(props) {
    const [CustomeredData, setCustomeredData] = useState([])
const [state, setState] = useState({
    category:"No Promocode Selected",
    categoryValue:"No Promocode Selected",
   
    bannerShow:false,
    startDate:null,
    endDate:null,
    extractData:false


})
const {status,categoryValue,startDate,endDate,extractData}=state
useEffect(() => {
 
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
       
      });

  
      Notiflix.Loading.Dots('Please wait...');
  
      GetApiCall.getRequest("Get_UniquePromoCodeReport_NewBackoffice").then(resultdes =>
        resultdes.json().then(obj => {
          setCustomeredData(obj.data)
          
  let temparray=[...obj.data]
  let temparray2=[]
      setCustomeredData(obj.data)
            console.log(obj.data)

    temparray&&temparray.map((data,i)=>{
                PostApiCall.postRequest({code:data.fld_code},'Get_OrderOfferReport').then(resultdes =>
                    resultdes.json().then(Orderobj => {
                      
              
                     
console.log(Orderobj.data)
                     
       console.log({...data,
        orderValue:Orderobj.data&&Orderobj.data.length!==0&&Orderobj.data.find((orderData,i)=>{
             return orderData.fld_status!=="Created"
        }).fld_ordervalue});


       temparray2.push({...data,
        orderValue:Orderobj.data&&Orderobj.data.length!==0&&Orderobj.data.find((orderData,i)=>{
             return orderData.fld_status!=="Created"
        }).fld_ordervalue})
        
                   
                    }))
                })
                Notiflix.Loading.Remove()
                console.log(temparray2);

            setCustomeredData(temparray2)

        
        }))

        
     

 
   
}, [])

const Dropdown=() =>{
        
      
    return(
        <div className="btn-group ">
        
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Select&nbsp;UniquePromocode&nbsp;Report&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"All Unique Promo Code",category:"All Unique Promo Code"})}} className="dropdown-item bg-white text-dark" >All Unique Promo Code</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Used Unique Promo Code",category:"Used Unique Promo Code"})}} className="dropdown-item bg-white text-dark" >Used Unique Promo Code</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Unused Unique Promo Code",category:"Unused Unique Promo Code"})}} className="dropdown-item bg-white text-dark" >Unused Unique Promo Code</button>

         </div>
      </div>
    )
}

const   DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold ' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={state.startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setState({...state,startDate:date,extractData:false})}
        selectsStart
        startDate={state.startDate}
        endDate={state.endDate}
        maxDate={state.endDate}
        isClearable
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold'  style={{display:'flex',marginLeft:'4px'}}>
     <span style={{marginTop:'9px'}}>To </span>
    <DatePicker
        selected={state.endDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setState({...state,endDate:date,extractData:false})}
        selectsEnd
        startDate={state.startDate}
        endDate={state.endDate}
        minDate={state.startDate}
        maxDate={new Date()}
        popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            }}}
        isClearable
        className="form-date-picker"
      /> 
     
      
     
     </li>
        </>
    )
}




const  getReportHandler=()=>{
console.log();
if(state.categoryValue==="No Promocode Selected"){
    return   Notiflix.Notify.Failure('Select  Promocode  Type');
   }
   else{
       return setState({...state,extractData:true})
   }
  
    
   
   }


 


console.log(CustomeredData)


    return (
      
        <div>
        <div class="content-page">
    
    <div class="content">
      <div class="container-fluid">
        
          

                      <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-2">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Reports</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Unique Promocode
                                    </li>
                                </ol>
                            </nav>
                            </div>
                            </div>
                <div class="row page-title pt-0">
                <div class="col-sm-4 col-xl-6">
                <h4  class="col-12 mb-1 mt-0">Unique Promocode Reports</h4>
</div>

                <div class="col-sm-8 col-xl-6 d-flex justify-content-end">

                <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className={"btn btn-primary"}
                        table="table-to-xls"
                        filename={"tablexls_student_reports"}
                        sheet="tablexls"
                        buttonText="Download as XLS"
                        style={{background: '#060a4a !important',
                            color: 'white'
                            
                        }}/>

                
            </div>

            </div> 
           
            <div className="card card-body  " role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast"  >

            <div className="row">
                <div className="col col-xl-6 col-sm-12">
                <div className="btn-toolbar py-1 pr-4 sw-toolbar sw-toolbar-top justify-content-left" style={{ float: 'left' }}>
                {Dropdown()}
                <input disabled={true} className="form-control-date ml-2" type='text' value={state.categoryValue} />
                                                                                </div>
                </div>
      
               
            </div>
                                                         
                                                        </div>




                    <div class="row pb-2" >
                    <div  class="col-12">
                    <div className="toast fade show    " role="alert" aria-live="assertive"
                            aria-atomic="true" data-toggle="toast"  >

                    <div className="btn-toolbar py-1 pr-2   sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>
                    <button onClick={()=>getReportHandler()} className='btn btn-secondary sw-btn-next  btn-radius my-1'>Get Report</button>  


                    </div>
                    </div>
                            
                            
                    </div>
                        
                    </div>
    
      
                    <table id="table-to-xls"  className="table table-hover table-nowrap mb-0  table-responsive">
                            
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                            <table class="table " style={{backgroundColor:'white'}}>

                            <thead>
                                    <tr>
                
                <th>Offer Name</th>
                <th>Vendor Name</th>
                <th>Mobile Number</th>
                <th>Email ID</th>
                <th>Offer Code</th>
                <th>Offer Discount</th>
              {state.categoryValue!=='Unused Unique Promo Code'? <th>Order Price</th>:null} 
                 </tr>
                </thead>
                       
                        {
                         CustomeredData && CustomeredData.filter(customer=>{
                             if(state.extractData!==false&&state.categoryValue=='Used Unique Promo Code'){
                               if(customer.orderValue!=false){
                                    return customer
                               }
                               
                             }
                             else if(state.extractData!==false){
                                 return customer
                             }
                         }).length!==0?CustomeredData.filter(customer=>{
                            if(state.categoryValue=='Used Unique Promo Code'){
                              if(customer.orderValue!=false){
                                   return customer
                              }
                              
                            }
                            else{
                                return customer
                            }
                        }).map(customer=>{
                               
                                    return <tbody><tr> 
                                    <td>{customer.fld_offerName}</td>
                                    <td>{customer.fld_vendorname}</td>
                                    <td>{customer.fld_vendormobilenumber}</td>
                                    <td>{customer.fld_vendoremail}</td>
                                    <td>{customer.fld_code}</td>
                                    <td>{customer.fld_maximumdiscountprice}</td>
                                    {state.categoryValue!=='Unused Unique Promo Code'? <td>{customer.orderValue}</td>:null   }  
                                
                                </tr> 
                                </tbody>  
                            

                        
                            })
                    : <tbody>
                        <tr>
                            <td colSpan='12'>
                        <div class="  card visually-view">
                            <div class="card-body">
                            <div class="jumbotron bg-light">
                             <h2 style={{textAlign:'center'}} class="display-4">{state.extractData==false?"Press Get Report":'No Unique PromoCode  Reports Available'}</h2>
            
                           </div>
                         
                          </div>
                          </div>
                          </td>
                          </tr>
                    </tbody>
                          
                        } 
                      
                    
                        </table>   
                    

                            </div>
                            </div>
                            </div>
                            </div>

                    </table>
                                        </div>
                                                </div>

                                </div>
                                        </div>
                                 
    )
}