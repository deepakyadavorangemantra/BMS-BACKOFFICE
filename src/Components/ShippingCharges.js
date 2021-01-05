import React, { useEffect, useState } from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "../Api";
import Notiflix from "notiflix";
import {Edit3,Eye,Trash2,Monitor} from 'react-feather';

import GetApiCall from '../GetApi'
import moment from 'moment'
import Modal from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import

export default function ShippingCharges() {
    const [state, setState] = useState({
        open:false,
        product:'',
        productName:'',
        quantity:0,
        shipping:0,
        touched1:false,
        touched2:false, 
        touched3:false, 
        touched4:false, 
        vertical:'',
        updateModalOpen:false
    })
    const [VerticalOption, setVerticalOption] = useState([
    {label : 'Accessories',value:'Accessories'},
    {label : 'Books',value:'Books'},
    {label : 'Covid Essentials',value:'Covid'},
    {label : 'Food',value:'Food'},
    {label : 'Footwear',value:'Footwear'},
    {label : 'Socks',value:'Socks'},])
   
    const [showOnWebsite,setshowOnWebsite] = useState('Yes')
    
const [productData, setproductData] = useState([])
const [ShippingChargesProductData, setShippingChargesProductData] = useState([])
const [updatedProductId, setupdatedProductId] = useState('')

    useEffect(() => {


     

            Notiflix.Loading.Dots('Please wait...');
            GetApiCall.getRequest("Get_ShippingChargesList").then(resultdes =>
                resultdes.json().then(obj => {
                //    console.log(obj.data,"Hi..."); 
                   if(resultdes.status == 200 || resultdes.status==201){
    
                    setShippingChargesProductData(obj.data)
                   
                   Notiflix.Loading.Remove();
                   
        
                 }else
                 {
                   Notiflix.Loading.Remove();
                   Notiflix.Notify.Failure('Error Occured');
                
        
                 }}))
            

            PostApiCall.postRequest({

                vertical:state.vertical
           
           },"Get_ShippingChargesProductData").then((results) => 
           
             // const objs = JSON.parse(result._bodyText)
             results.json().then(obj => {
                //  console.log(obj)
           
             if(results.status == 200 || results.status==201){
         
            if(obj.data){
              if(state.touched4){
                 setState({...state,product:"Select Product"})      
              }
              
              setproductData(obj.data)           
           
           Notiflix.Loading.Remove();
            }
               
               

               
               
               
    
             }else
             {
               Notiflix.Loading.Remove();
               Notiflix.Notify.Failure('Error Occured');
            
    
             }
           }))
    
     
    }, [state.vertical])

   





const SaveHandler=(e)=>{
    e.preventDefault()

    
//   console.log(state.vertical,state.shipping,state.quantity,showOnWebsite)
  

        if(state.vertical!==undefined){
            if(state.product!==undefined){
            
            if(state.shipping!==undefined){
      
          if(state.quantity!==undefined){
      
          if(showOnWebsite!==''){
            Notiflix.Loading.Dots('Please wait...');

            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
            PostApiCall.postRequest({

                vertical:state.vertical,
                
                 productid : state.product,
                 productname : productData.filter(val => val.value == state.product)[0].label,
                 shippingCharges : state.shipping,
                 quantity : state.quantity,
                 showonwebsite : showOnWebsite,
                 updated_on :moment().format('lll').toString(),
                 updated_by :  details[0].fld_staffid,
               
           
           },"Add_Shippingcharges").then((results) => 
           
             // const objs = JSON.parse(result._bodyText)
             results.json().then(obj => {
                 console.log(obj)
           
             if(results.status == 200 || results.status==201){
               Notiflix.Notify.Success('Shipping Charges Successfully Added');
       
               window.location.reload()
               
               Notiflix.Loading.Remove();
               
       
             }else
             {
               Notiflix.Loading.Remove();
               Notiflix.Notify.Failure('Error Occured');
            
       
             }
           }))
       
          }
          else{
              return   Notiflix.Notify.Failure("Please specify if it is active or not.")
      
            }
      
          }
        else{
              return   Notiflix.Notify.Failure("Please select quantity.")
      
            }
      
            }
            else{
              return   Notiflix.Notify.Failure("Please enter shipping charge.")
      
            }
      
            }
            else{
           return   Notiflix.Notify.Failure("Please select product.")
      
            }  
          }
          else{
           return   Notiflix.Notify.Failure("Please select vertical.")
          }


  
  
}
const deleteHandler=(id)=>{
 
    
    confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure you want to delete shipping charges.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
               



                Notiflix.Loading.Dots('Please wait...');

 
                PostApiCall.postRequest({
            
                   id:id
                    
                
                },"Delete_ShippingCharges").then((results) => 
                
                  // const objs = JSON.parse(result._bodyText)
                  results.json().then(obj => {
                      // console.log(obj)
                
                  if(results.status == 200 || results.status==201){
                    Notiflix.Notify.Success('Shipping Charges Successfully Deleted');
            
                    window.location.reload()
                    
                    Notiflix.Loading.Remove();
                    
            
                  }else
                  {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Failure('Error Occured');
                 
            
                  }
                }))
            
            
            }
          },
          {
            label: 'No',
            // onClick: () => alert('Click No')
          }
        ]
      });
    


   

 
  
}

const updatedHandler=(data)=>{
console.log(data.fld_productid)
 
 setupdatedProductId(data.fld_id)
    setState({...state,
    
    product:data.fld_productid,
    productName:data.fld_productname,
    shipping:data.fld_shippingCharges,
    vertical:data.fld_vertical,
  quantity:data.fld_quantity,
updateModalOpen:true})
// setVerticalOption(data.fld_vertical),
setshowOnWebsite(data.fld_showonwebsite)

}

const updatedSubmitHandler=(e)=>{
    e.preventDefault()

   
       

        if(state.vertical!==undefined){
            if(state.product!==undefined && state.product!= ''){
            
            if(state.shipping!==undefined){
      
          if(state.quantity!==undefined){
      
          if(showOnWebsite!==''){

            Notiflix.Loading.Dots('Please wait...');

            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
            PostApiCall.postRequest({
                id:updatedProductId,
                vertical:state.vertical,
                
                 productid : state.product,
                 productname : productData.filter(val => val.value == state.product)[0].label,
                 shippingCharges : state.shipping,
                 quantity : state.quantity,
                 showonwebsite : showOnWebsite,
                 updated_on :moment().format('lll'),
                 updated_by :  details[0].fld_staffid,
               
           
           },"Update_ShippingCharges").then((results) => 
           
             // const objs = JSON.parse(result._bodyText)
             results.json().then(obj => {
                 console.log(obj)
           
             if(results.status == 200 || results.status==201){
               Notiflix.Notify.Success('Shipping Charges Successfully Updated');
       
               window.location.reload()
               
               Notiflix.Loading.Remove();
               
       
             }else
             {
               Notiflix.Loading.Remove();
               Notiflix.Notify.Failure('Error Occured');
            
       
             }
           }))
       
          }
          else{
              return   Notiflix.Notify.Failure("Please Select Show on Website")
      
            }
      
          }
        else{
              return   Notiflix.Notify.Failure("Please Select Quantity")
      
            }
      
            }
            else{
              return   Notiflix.Notify.Failure("Please Enter Shipping Charge")
      
            }
      
            }
            else{
           return   Notiflix.Notify.Failure("Please Select Product")
      
            }  
          }
          else{
           return   Notiflix.Notify.Failure("Please Select Vertical")
          }



  

}

    return (
        <div>
          
          <Modal class="modal-content"  
    open={state.open}
    onClose={()=>{
    //   props.setclearfoodcategory()
      setState({open : false})
    }}
     center>

    <div class="modal-content modelcontent3">
      <div class="modal-header">
        <h4 class="modal-title">Add New Shipping Charges</h4>
      </div>
      <div class="modal-body">
        <div class="row">
        {/* <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Brand Logo<span className="mandatory">*</span></label>
              <div class="div1">
                <ImgUpload onChange={photoUpload} src={state.imagePreviewUrl}/>
              
        </div>
            </div>
        </div> */}
       
        <div class="col-md-6">
        <div class="form-group mb-3">
            <label for="validationCustom01">Vertical<span class="mandatory">*</span></label>
              
                <select  class={`form-control ${state.touched4&&state.vertical==''?'is-invalid':''}`}
                  value={state.vertical} onChange={(e)=>{
                    
                      setState({...state,vertical:e.target.value})
                   
                }}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched4:true})
                }}>
                           
                                         <option  value=''>Select Product Category</option>
                                                                             {VerticalOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        hidden={schedule.hidden}
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
        <div class="form-group mb-3">
            <label for="validationCustom01">Product<span class="mandatory">*</span></label>
             
                <select name={state.productName}  className={`form-control ${state.touched1&&state.product==''?'is-invalid':''}`}
                  value={state.product} onChange={(e)=>{
                    console.log(e.target.children)
                      setState({...state,product:e.target.value,
                    })
                   
                }}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched1:true})
                }}>
                                 <option  value='' label='Select Product' >Select Product</option>
                                 {productData&&productData.map(schedule => (
                                                                                        <option
                                                                                        hidden={schedule.hidden?schedule.hidden:false}
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                         label={schedule.label}
                                                                                       >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                </select>
            </div>
      </div>
        
        <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Shipping Charges<span class="mandatory">*</span></label>
                <input type="number" class={`form-control ${state.touched2&&state.shipping<=0?'is-invalid':''}`}  
                value={state.shipping} 
                onChange={(text)=>{
                  setState({
                    ...state,
                    shipping : text.target.value
                  })

                }}
                min={1}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched2:true})
                }}/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-3">
            <label for="validationCustom01">Select Quantity<span class="mandatory">*</span></label>
              
                <select class={`form-control ${state.touched3&&state.quantity==0?'is-invalid':''}`}
                  value={state.quantity} onChange={(e)=>{
                    
                      setState({...state,quantity:e.target.value})
                   
                }}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched3:true})
                }}>
                                         <option  value=''>Select Quantity</option>
                    
                    {[...Array(20)].map((_,i)=>{
                  return  <option value={i+1}> {i+1}</option>
                     
                    })}
                    
                   
                </select>
            </div>
        </div>
                                 
                                 <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Status<span className="mandatory">*</span></label>
                                                                                    <br/>
                                                                                    <label class="radio-inline">
                                                                                <input type="radio" checked={showOnWebsite=='Yes'}  value={showOnWebsite} name="optradio"  onClick={()=>setshowOnWebsite("Yes")}/> Active
                                                                            </label>
                                                                            <label class="radio-inline" style={{marginLeft:'20px'}}>
                                                                                <input type="radio" checked={showOnWebsite=='No'} value={showOnWebsite} name="optradio"  onClick={()=>setshowOnWebsite("No")}/> Inactive
                                                                            </label>
                                                                                    
                                                                                </div>
                                                                                </div>
       
        </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}} 
       onClick={()=>{
        setState({open : false})
        
       
    }}>Close</button>
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={ SaveHandler}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              

                     
          <Modal class="modal-content"  
    open={state.updateModalOpen}
    onClose={()=>{
    //   props.setclearfoodcategory()
      setState({updateModalOpen : false})
    }}
     center>

    <div class="modal-content modelcontent3">
      <div class="modal-header">
        <h4 class="modal-title">Update Shipping Charges</h4>
      </div>
      <div class="modal-body">
        <div class="row">
       
       
        <div class="col-md-6">
        <div class="form-group mb-3">
            <label for="validationCustom01">Vertical<span class="mandatory">*</span></label>
              
                <select  class={`form-control ${state.touched4&&state.vertical==''?'is-invalid':''}`}
                  value={state.vertical} onChange={(e)=>{
                    
                      setState({...state,vertical:e.target.valuestate,product:"Select Product"})
                   
                }}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched4:true})
                }}>
                           
                  <option  value=''>Select Product Category</option>
                                                                             {VerticalOption.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        hidden={schedule.hidden}
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
        <div class="form-group mb-3">
            <label for="validationCustom01">Product<span class="mandatory">*</span></label>
              {}
                <select   className={`form-control ${state.touched1&&state.product==''?'is-invalid':''}`}
                  value={state.product} onChange={(e)=>{
                    // console.log(e.target.children)
                      setState({...state,product:e.target.value,
                    })
                   
                }}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched1:true})
                }}>
                                 <option  value=''>Select Product</option>
                                 {productData&&productData.map(schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                         label={schedule.label}
                                                                                       >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                </select>
            </div>
      </div>
        
        <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Shipping Charges<span class="mandatory">*</span></label>
                <input type="number" class={`form-control ${state.touched2&&state.shipping<=0?'is-invalid':''}`}  
                value={state.shipping} 
                onChange={(text)=>{
                  setState({
                    ...state,
                    shipping : text.target.value,
                  })

                }}
                min={1}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched2:true})
                }}/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-3">
            <label for="validationCustom01">Select Quantity<span class="mandatory">*</span></label>
              
                <select class={`form-control ${state.touched3&&state.quantity==0?'is-invalid':''}`}
                  value={state.quantity} onChange={(e)=>{
                    
                      setState({...state,quantity:e.target.value})
                   
                }}
                onBlur={e=>{
                    setState({
                        ...state,
                        touched3:true})
                }}>
                    <option hidden value={''}>Quantity</option>
                    {[...Array(20)].map((_,i)=>{
                  return  <option value={i+1}> {i+1}</option>
                     
                    })}
                    
                   
                </select>
            </div>
        </div>
                                 
                                 <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Status<span className="mandatory">*</span></label>
                                                                                    <br/>
                                                                                    <label class="radio-inline">
                                                                                <input type="radio" checked={showOnWebsite=='Yes'} value={showOnWebsite} name="optradio"  onClick={()=>setshowOnWebsite("Yes")}/> Active
                                                                            </label>
                                                                            <label class="radio-inline" style={{marginLeft:'20px'}}>
                                                                                <input type="radio" checked={showOnWebsite=='No'} value={showOnWebsite} name="optradio"  onClick={()=>setshowOnWebsite("No")}/> Inactive
                                                                            </label>
                                                                                    
                                                                                </div>
                                                                                </div>
       
        </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}} 
       onClick={()=>{
        
        setState({...state,updateModalOpen:false})
    }}>Close</button>
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={updatedSubmitHandler}>Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              

                     
        <div class="content-page">
        
        <div class="content">
          <div class="container-fluid">
                <div class="row page-title">
                    <div class="col-md-12">
                        <nav aria-label="breadcrumb" class="float-right mt-1">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Shipping Charges</a></li>
                               
                            </ol>
                        </nav>
                        <h4 class="mb-1 mt-0">Shipping Charges
                        </h4>
                    </div>
                </div> 

                {/* <div class="row">
               <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center">
                                                                   <div class="col text-right">
                               
                                     <ReactHTMLTableToExcel  

                                            className="btn btn-primary" id="btn-new-event"

                                            table="basic-datatable"  

                                            filename="ReportExcel"  

                                            sheet="Sheet"  

                                            buttonText="Export to Excel" />  
                                
                                                                   </div>
                            </div>
                        </div>
                    </div> 
                 </div>
            
            </div> */}
                
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                        <button 
                                        onClick={()=>{
  
                                        setState({
                                                    open : true
                                                })

                                          
                                        }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-plus mr-1"></i>Add New Shipping Charges</button>
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
                            <table id="basic-datatable" class="table dt-responsive nowrap"  >
                            <thead>
                                <tr>
                                    <th>Vertical</th>
                                    <th>Product</th>
                                    <th>Shipping&nbsp;Charges</th>
                                    <th>Quantity</th>
                                    <th>Show&nbsp;On&nbsp;Website</th>
                                    <th>Action</th>
                                </tr>
                                
                             </thead>
                             <tbody>
                                 {/* {console.log(ShippingChargesProductData)} */}
                                {ShippingChargesProductData&&ShippingChargesProductData.length!==0?ShippingChargesProductData.map(data=><tr>
                                     <td>{data.fld_vertical}</td>
                                     <td>{data.fld_productname}</td>
                                     <td style={{textAlign:'center'}}>₹{data.fld_shippingCharges}</td>
                                     <td style={{textAlign:'center'}}>{data.fld_quantity}</td>
                                     <td style={{textAlign:'center'}}>{data.fld_showonwebsite=='Yes'?<Monitor className='text-success'/>:<Monitor className='text-danger' />}</td>
                                     <td><div class="align-self-center tableact d-flex" style={{ textAlign: 'center'}}
                                       >
                                 <span className='d-inline'  onClick={()=>{
                                        
                                       updatedHandler(data)
                                       
                                    }} >
                                 <Edit3/>
                                     </span>
                                    
                                     &nbsp;&nbsp;
                                     <span className='d-inline'  onClick={()=>{
                               deleteHandler(data.fld_id)
                                     }}><Trash2 /></span>
                                     </div> 
                                      </td>
                                 </tr>) :<tr><td style={{textAlign:"center"}} colSpan='6'>No Data Present</td></tr>}

                                
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
