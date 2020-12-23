import React, { useEffect, useState , useRef} from 'react';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import {Edit3,Trash2, Save} from 'react-feather';
import { confirmAlert } from 'react-confirm-alert'; // 
import { connectAdvanced } from 'react-redux';
import PostApiCall from '../../Api';
import GetApiCall from '../../GetApi';
import TopicReactQuillTextEditor from '../../Components/Education_Components/TopicQuillTextEditor';

const Teaser =(props)=>{
    const [ values, setValues] = useState([
        // { fld_id : '', fld_content : '', fld_orderno : 1, createdon  : moment().format('lll'), updatedon : moment().format('lll')}
    ]);
    const [ title , SetTitle] = useState('Add Teaser');
    const [ chapterid , SetChapterid] = useState('');
    const [ check, setCheck]=useState(false);

    
    const [ topicid, SetTopicid ] = useState('');

    

    useEffect( ()=>{
        // let state = props.location.state;
        // console.log(state.chapterid);
        // SetChapterid(state.chapterid)
        getTeaserData();        
     },[]);

    function getTeaserData(){
        Notiflix.Loading.Dots('Please wait...');
        // GetApiCall.getRequest("GetTeaserByChapter?chapterid="+chapterid).then(resultdes =>
        GetApiCall.getRequest("GetTeaserContentAll").then(resultdes =>
        resultdes.json().then(obj => {
                if(obj.data.length>0){
                    setValues(obj.data);
                    SetTitle(' Update Teaser')
                }else{
                    setValues([{ fld_id : '', fld_content : '', fld_orderno : 1, createdon  : moment().format('lll'), updatedon : moment().format('lll')}]);
                    SetTitle(' Add Teaser')
                }
                              
               Notiflix.Loading.Remove();
            }));
     }


      
    function handleChange( event, i) {
            if(values.length>0){
                let contentArr =values;
                contentArr[i].fld_content = event 
                setValues (contentArr);
            }
    }

    function removeContent(i){
        if(values[i].fld_id !=''){
            
            Notiflix.Loading.Dots('');

            GetApiCall.getRequest("DeleteTeaserContent?contentid="+ values[i].fld_id ).then((results) => 
            
                results.json().then(obj => {

                if(results.status == 200 || results.status==201){
                    values.splice(i,1);
                    setValues (values);
                    setCheck(!check);
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Success('Content successfully deleted.')
                    
                }else
                {
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Failure('Something went wrong, try again later.')
                }
            }));
        }else{
            values.splice(i,1);
            setValues (values);
            setCheck(!check);
        }
        
     }

    function addClick(){
        let new_order= values.length;
        let contentArr =values;
        // if(contentArr.length>0){
        //     new_order = Math.max.apply(Math, contentArr.map(function(o) { return o.fld_orderno; }))
        // }
        contentArr.push({ fld_id : '', fld_content : '', fld_orderno : new_order+1, createdon  : moment().format('lll'), updatedon : moment().format('lll')});
        setValues(contentArr);
        setCheck(!check);
    }

    function saveContent(item, index){
        if(item.fld_content !=''){
            if(item.fld_id === ''){
                Notiflix.Loading.Dots('Please wait...');
                PostApiCall.postRequest ({ 
                        chapterid: chapterid,
                        content: item.fld_content, 
                        // orderno: item.fld_orderno, 
                        createdon: moment().format('lll'),
                        status: 1
                    },"addTeasercontent").then((resultTopic) =>
                    resultTopic.json().then(resultTopicContent => {
                        if(resultTopic.status == 200 || resultTopic.status == 201){
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success('Content successfully added.');
                            values[index].fld_id = resultTopicContent.data[0].fld_id;
                            setValues(values);
                        }else
                        {
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Failure(resultTopicContent.data)
                        }
                    })
                )

            }else{
                Notiflix.Loading.Dots('Please wait...');
                PostApiCall.postRequest ({ 
                        // topicid: topicid, 
                        contentid: item.fld_id,
                        content: item.fld_content, 
                        // orderno: item.fld_orderno, 
                        updatedon: moment().format('lll'),
                        status:1
                    },"UpdateTeaserContent").then((resultTopic) =>
                    resultTopic.json().then(objArticleSub => {
                        if(resultTopic.status == 200 || resultTopic.status == 201){
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success('Content successfully update.');
                            values[index] = objArticleSub.data
                            setValues(values);
                        
                        }else
                        {
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Failure(objArticleSub.data)
                        }
                    })
                )
            }
        }else{
            Notiflix.Notify.Failure('Please add content.')
        }
    }
     

        return(
            <React.Fragment>
                <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row page-title">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb" className="float-right mt-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href='/edu-chapter'>Chapter Module</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Teaser</li>
                                    </ol>
                                </nav>
                                <h4 className="mb-1 mt-0">Teaser Infomation</h4>
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                          
                                    <div className="col-md-12" >       
                                        <div className="form-group mb-3">
                                            
                                                {values.map((item, i) => 
                                                    // <li>
                                                    <div className="col-md-12">
                                                        <div style={{ display:'flex', marginTop:'10px'}} key={i}>
                                                            {/* <label style={{ padding:'10px', fontWeight:'bold'}} for="validationCustom01">{item.fld_orderno}. </label> */}
                                                            <div style={{ padding:'10px', fontWeight:'bold', width : '90%'}}>
                                                                <TopicReactQuillTextEditor 
                                                                    html={item.fld_content||''}
                                                                    onChange={(e)=>handleChange(e,i)}
                                                                    // indexContent = {i}
                                                                />
                                                            </div> 
                                                            {/* <div style={{ padding:'10px', fontWeight:'bold', width : '100%'}}>
                                                            <button className="btn btn-primary" type="submit" style={{marginTop:'10px', marginLeft:'3%'}}onClick={()=>{ saveContent(item, i)} }>{title}</button>
                                                            </div> */}
                                                            <div style={{ padding:'10px', fontWeight:'bold'}}>
                                                            <span style={{cursor:'pointer'}}><Save  onClick={()=>{ saveContent(item, i)}} /></span><br/><br/>
                                                            <Trash2
                                                                
                                                                onClick={()=>{
                                                                confirmAlert({
                                                                    title: 'Confirm to Delete',
                                                                    message: 'Are you sure you want to delete content.',
                                                                    buttons: [
                                                                    {
                                                                        label: 'Yes',
                                                                        onClick: () => {
                                                                            removeContent(i)
                                                                            // this.props.removeTopicData( data.fld_id);
                                                                        }
                                                                    },
                                                                    {
                                                                        label: 'No',
                                                                    }
                                                                    ]
                                                                });
                                                                }}
                                                            />
                                                        
                                                            </div>
                                                        </div> 
                                                    </div>  
                                                    // </li>   
                                                )}   
                                                
                                                <button className="btn btn-primary" type="submit" style={{marginTop:'10px', marginLeft:'3%'}} onClick={ ()=> addClick()}>{ values.length > 0 ?'Add more':'Add Content'}</button>
                                                
                                            </div>
                                    </div>
{/*                                 
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                                            <label className="radio-inline">
                                            <input type="radio" checked = {isActive == 'Yes' ? true : false} onChange= {()=>{ SetIsActive('Yes'); }}  /> Active
                                        </label>
                                        <label className="radio-inline" style={{marginLeft:'10px'}}>
                                            <input type="radio" checked = {isActive == 'No' ? true : false} onChange= {()=>{SetIsActive('No'); }} /> Inactive
                                        </label> 
                                        </div>
                                    </div> */}
                               
                                </div>
                        </div>
                        
                    
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    
}
export default Teaser;