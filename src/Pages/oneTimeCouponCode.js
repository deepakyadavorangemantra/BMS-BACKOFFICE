import React, { Component, Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Notiflix from "notiflix";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'



import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GetApiCall from '../GetApi';
import PostApiCall from "../Api";

var gross = 0
var marg = 0
var vm = 0
var sp = 0
var quan = 0

export default class OneTimeCouponCode extends Component {

    constructor(props){
    super(props)
        this.state={
            VendorsOrderData : [],
            VendorsData : [],
            VendorsOrderDataFinal : [],
            startDate : '',
            endDate : ''
        }
    }
DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={this.state.startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>{
            this.setState({
                startDate : date
            })
        }}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        maxDate={this.state.endDate?this.state.endDate:new Date()}
        isClearable
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold '  style={{display:'flex'}}>
     <span style={{marginTop:'9px',marginLeft:'3px'}}>To </span>
    <DatePicker
        selected={this.state.endDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>{
            this.setState({
                endDate : date
            })
        }}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        minDate={this.state.startDate}
        maxDate={new Date()}
        popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            }}}
        isClearable
        className="form-date-picker"/> 
     </li>
    </>
    )
}


componentDidMount(){
    // Update the document title using the browser API
    Notiflix.Loading.Init({
        svgColor : '#507dc0',
      });
    Notiflix.Loading.Dots('Please wait...');
    GetApiCall.getRequest("GetOneTimeCouponOrderDetail").then(resultdes =>
            resultdes.json().then(obj => {
                 console.log(obj.data)
                this.setState({
                    VendorsOrderData:obj.data
                });
       
             
            }))
      


        }

        

 getReportHandler(){
  
    if(this.state.startDate != ''&& this.state.startDate != null){
        if(this.state.endDate != '' && this.state.endDate != null)
        {
            // console.log(this.state.startDate)
            var filtdt = this.state.VendorsOrderData.filter(vendor => moment(moment(vendor.fld_orderdate).format('ll')).isBetween(moment(this.state.startDate).format('ll'),moment(this.state.endDate).format('ll')))

            // console.log(filtdt)
            this.setState({
                VendorsOrderData : filtdt
            })
        }else
        {
            Notiflix.Notify.Failure('Please enter end date.')
        }
    }else
    {
        GetApiCall.getRequest("GetOneTimeCouponOrderDetail").then(resultdes =>
            resultdes.json().then(obj => {
                 console.log(obj.data)
                this.setState({
                    VendorsOrderData:obj.data
                });
       
             
            }))
        // this.setState({
        //     VendorsOrderDataFinal : this.state.VendorsOrderData
        // })
    }

   
  }

  render()
  {
    console.log(this.state.VendorsOrderData,'VendorsOrderData')
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
                            <li class="breadcrumb-item active" aria-current="page">One Time Coupon
                            </li>
                        </ol>
                    </nav>
                    </div>
                    </div>
                    
                    <div class="row page-title pt-0">
                <div class="col-sm-12 col-xl-6">
                <h4  class="col-12 mb-1 mt-0"></h4>
                </div>
                <div class="col-sm-12 col-xl-6 d-flex justify-content-end">
                <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className='btn btn-primary'
                        table="table-to-xls"
                        filename={"OneTimeCouponReports"}
                        sheet="tablexls"
                        buttonText="Download as XLS"
                        style={{background: '#060a4a !important',
                            color: 'white'
                            
                        }}/>

                
            </div>
            </div> 
           <div className="card card-body  " role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast"  >
            <div className="row align-items-center">
                  <div className="col col-xl-12    col-sm-12">
                    <div className="btn-toolbar py-1 ml-1 pl-5  sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right'}}>
                                                                                {this.DatePickers()}

                   </div>
                </div>
            </div>
               </div>
                  <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body getreport-card">
                                <div class="row align-items-center">
                                <div class="col ">
                                 </div>
                                <div class="col text-right">
                                <button  style={{border:"0px"}} onClick={()=>this.getReportHandler()} className='btn btn-primary'>Get Report</button>  
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>    
                    </div>            
           <div class="row" style={{display: this.state.VendorsOrderData.length > 0 ? '' : 'none'}}>
            <div class="col-12">
                <div class="card visually-view" style={{overflow: 'auto'}}>
                <div class="card-body">
                
                <div class="row">
            <div style={{marginBottom:"-11px"}} class="col-12">
                <div class="card">
                 <div class="card-body">
                   <div className="row" style={{marginBottom:'11px'}}>
                         <div className="col-md-10">
                         </div>
                   </div>
                   
                    <table class="table" id="table-to-xls" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone no</th>
                                <th>Coupon Code</th>
                                <th>Order no</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                    <tbody>
                    {this.state.VendorsOrderData && this.state.VendorsOrderData.map((vendor)=>(
                            <tr>
                                
                                <td>{vendor.CustomerName}</td>
                                <td>{vendor.fld_email}</td>
                                <td>{vendor.fld_mobile}</td>
                                <td>{vendor.CouponCode}</td>
                                <td>{vendor.fld_ordernumber}</td>
                                <td>{moment(vendor.fld_orderdate).format('ll')}</td>
                             </tr>
                    
                        ))}
                   
                    </tbody>
                    </table>
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




