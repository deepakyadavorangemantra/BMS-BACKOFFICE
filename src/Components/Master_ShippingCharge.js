import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';


class MasterShippingCharge extends Component {
     constructor(props){
         super(props)
         this.state = {
            open:false,
            Id : '',
            openedit : false,
          
            OrderValue:'',
            ShippingCharge:'',
            Type:'',
            TypeData: [
                {value:"Select Type",label: "Select Type"},
                { value: "Shipping", label: "Shipping" },
                { value: "COD", label: "COD" },
               
              ],
              ShippingData:[],
              DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
          };
        }

        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
          
                  Notiflix.Loading.Dots('Please wait...');
          
              GetApiCall.getRequest("Get_Extracharge").then(resultdes =>
                resultdes.json().then(obj => {
                    this.setState({
                        
                      ShippingData : obj.data
                  })
                //   console.log(obj.data)
                   Notiflix.Loading.Remove()
                }))
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

      


        UpdateShipping(){
            if(this.state.OrderValue!=''){
                if(this.state.ShippingCharge!=''){
                   
              
                Notiflix.Loading.Dots('Please wait...');

                var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)

                PostApiCall.postRequest ({
                    id:  this.state.Id,
                    type : this.state.Type,
                    price : this.state.ShippingCharge,
                    thresholdvalue:  this.state.OrderValue,
                    updatedon : moment().format('lll'),
                    updatedby : details[0].fld_staffid,
                   
                },"Update_ExtraChargeMaster").then((result)=>

                    result.json().then(obj => {

                    if(result.status == 200 || result.status == 201){
                      
                          Notiflix.Loading.Remove();
                          Notiflix.Notify.Success('Order Value successfully updated.')
                          window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Error occured.')
                    }
                })
                )
           
            }
            else{
              Notiflix.Notify.Failure('Shipping charges Can not be empty')
           }
        }
        else{
            Notiflix.Notify.Failure('Order Value Can not be empty')
         }
        }
     
    render(){
        return(
           <div>
        
                     
            <div class="content-page">
            
            <div class="content">
          

     
    <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
     
        this.setState({openedit : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Order Shipping Charge</h4>
      </div>

      <div class="modal-body">
      <div className="col-md-12">
      <div className="row">
      <div class="col-md-6">
      <div class="form-group mb-3">
          <label for="validationCustom01">Select Type<span class="mandatory">*</span></label>
          <select class="form-control custom-select" 
          value={this.state.Type}
         
          onChange={(text)=>{
              this.setState({
                  Type:text.target.value
              })
          }}>
          {this.state.TypeData.map(type => (
              <option key={type.value} value={type.value}>
                    {type.label}
               </option>
               ))}
          </select>
      </div>
  </div>
      <div class="col-md-6">
      <div class="form-group mb-3">
          <label for="validationCustom01">Order Value<span class="mandatory">*</span></label>
          <input type="text" class="form-control" 
          value={this.state.OrderValue}
          onChange={(test)=>{
            if((this.state.DecimalRegex.test(test.target.value))){
      
              this.setState({
                  OrderValue:test.target.value
              })
            }
          }}/>
      </div>
  </div>
      </div>
      </div>
  <div class="col-md-6">
  <div class="form-group mb-3">
      <label for="validationCustom01">Price<span class="mandatory">*</span></label>
      <input type="text" class="form-control" 
      value={this.state.ShippingCharge}
      onChange={(text)=>{
        if((this.state.DecimalRegex.test(text.target.value))){
      
          this.setState({
              ShippingCharge:text.target.value
          })
        }

      }}/>
  </div>
</div>
 
</div>
      
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
       
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateShipping.bind(this)}>Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>

                <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Master Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Order Shipping Charge </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Order Shipping Charge </h4>
                        </div>
                    </div> 

                  
             
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive"> 
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Shipping Charge</th>
                                        <th>Order Value</th>
                                       
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                 {this.state.ShippingData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Order Shipping Charge Available</td></tr> : 
                                 ''}

                                {this.state.ShippingData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_type}</td>
                                           <td>{data.fld_price}</td>
                                           <td>{data.fld_thresholdvalue}</td>
                                           <td>{data.fld_updatedon}</td>
                                           <td className="tableact" >
                                          
                                             <Edit3 style={{marginLeft: '10px'}}
                                             onClick={()=>{
                                            //    console.log(data);
                                               this.setState({
                                                OrderValue:data.fld_thresholdvalue,
                                                ShippingCharge:data.fld_price,
                                                 Type:data.fld_type,
                                                 openedit : true,
                                                 Id : data.fld_id
                                               })
                                               
                                             
                                          
                                             }}
                                             
                                             ></Edit3>
                                         
                                           </td>
                                         
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
        )
    }
}


  
  export default MasterShippingCharge;