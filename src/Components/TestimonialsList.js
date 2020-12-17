import React, { Component } from 'react';
import Helmet from 'react-helmet'
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';
import {Edit3,Trash2,Monitor} from 'react-feather';
import Switch from "react-switch";

class TestimonialsList extends Component {
    constructor(props){
        super(props)
        
        this.state={
           testimonialsData:[],
            AddAccess : false,
            checked: false
        }
       }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetTesttimonial").then(resultdes =>
              resultdes.json().then(obj => {
             
            //   console.log(obj.data)
              
                this.setState({
                 testimonialsData : obj.data,
                 checked : obj.data[0].fld_showOnWebsite == 'Yes' ? true : false
                })
               Notiflix.Loading.Remove();
              }))
            }
 
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
              <div class="container-fluid">
                    <div class="row page-title">
                    <div class="col-md-12">
                    <nav aria-label="breadcrumb" class="float-right mt-1">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Testimonial Management</a></li>
                            <li class="breadcrumb-item"><a href="#">Testimonial List</a></li>
                            
                           
                        </ol>
                    </nav>
                    <h4 class="mb-1 mt-0">Testimonial List
                    </h4>
                </div>
                    </div> 

                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col-md-6">
                                <label>
                                <span>Show On Website</span>
                                 <Switch
                                  onChange={(checked)=>{
                                      this.setState({
                                        checked
                                      })

                                    // console.log(checked)

                                    Notiflix.Loading.Dots('Please wait...');

                                    var login=localStorage.getItem('LoginDetail');
                                  var details=JSON.parse(login)
                                    PostApiCall.postRequest ({
                                        id : 1,
                                      name :'Admin',
                                      feedback :'',
                                      showOnWebsite :checked ? 'Yes' : 'No',
                                      rating :0,
                                      updatedby : details[0].fld_staffid,
                                     updatedon : moment().format('lll')
                                    },"Update_Testimonial").then((result) =>
                                    result.json().then(obj => {
                                        if(result.status == 200 || result.status == 201){
                                 
                                   
                         
                                         Notiflix.Loading.Remove()
                                         Notiflix.Notify.Success('Testimonial status successfully updated.')
                                        //  window.location.href = '/testimonialmanagementlist'
                                      
                         
                                    
                                        }else{
                                          Notiflix.Loading.Remove();
                                          Notiflix.Notify.Failure('Something went wrong, try again later.')
                                        }
                                    })
                                    )

                                    
                                  }}
                                  checked={this.state.checked}
                                  onColor="#86d3ff"
                                  onHandleColor="#2693e6"
                                  handleDiameter={26}
                                  uncheckedIcon={false}
                                  checkedIcon={false}
                                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                  height={20}
                                  width={48}
                                  className="react-switch"
                                  id="material-switch"
                               
                                />
                                </label>
                           </div>
                                   <div class="col-md-6 text-right" >
                                       <a href='/addtestimonialsitemmaster'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event"><i
                                               class="uil-plus mr-1"></i>Add New Testimonial </button>
                                  
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
                               
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                 
                                        <th> Name</th>
                                        <th>Rating</th>
                                        <th>Feedback</th>
                                        <th>Show on Website</th>
                                       
                                        
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                                
                                 <tbody>
                                 {this.state.testimonialsData&&this.state.testimonialsData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Testimonial Item Master Available</td></tr> : 
                                 ''} 
                                 {this.state.testimonialsData.map((data,index)=>(
                                            
                                            
                                        
                                     <tr key={index} style={{display : data.fld_id == 1 ? 'none' : ''}}>
                                                  { index == 0 ?
                                           <Helmet>
                                       
                                 <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                 <script src="/assets/js/pages/datatables.init.js"></script>
                                 <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                            
                                 </Helmet> : ''}
                                 
                                      <td>{data.fld_name} </td>
                                      <td>{data.fld_rating} </td>
                                      <td>{data.fld_feedback} </td>
                                    <td> <Monitor style={{color : data.fld_showOnWebsite == 'Yes' ? 'green' : 'red'}} /></td> 
                                      
                                    <td> <div class="align-self-center tableact" style={{ textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('TestimonialDetails',JSON.stringify(data))
                                        window.location.href = '/viewtestimonialmaster'
                                    }}
                                    >
                                <span  >
                                <Edit3/>
                                    </span>
                               
                                    </div> &nbsp;&nbsp;
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
export default TestimonialsList;
