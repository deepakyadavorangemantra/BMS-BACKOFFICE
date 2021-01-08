import React, { useEffect, useState , useRef} from 'react';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import {Edit3,Trash2, Save} from 'react-feather';
import { confirmAlert } from 'react-confirm-alert'; // 
import { connectAdvanced } from 'react-redux';
import PostApiCall from '../../Api';
import TopicReactQuillTextEditor from './TopicQuillTextEditor';

const TopicForm =(props)=>{
    const [ values, setValues] = useState([]);

    const [ topicTitle, SetTopicTitle ] = useState('Add Topic Chapter');
    const [ topicid, SetTopicid ] = useState('');
    const [ orderno, SetOrderno ] = useState(0);
    const [ Title , SetTitle ] = useState('');
    const [ Description, SetDescription ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');
    const [ check, setCheck ] = useState(false);
    const [dragId, setDragId] = useState();
    

    useEffect( ()=>{
        if(props.topicEditData !== ''){
            SetTopicTitle('Update Topic Chapter');
            SetTopicid( props.topicEditData ? props.topicEditData.fld_id : '');
            SetTitle(props.topicEditData ? props.topicEditData.fld_title : '');
            SetDescription(props.topicEditData ? props.topicEditData.fld_content : '');
            SetIsActive(props.topicEditData ? props.topicEditData.fld_status === 'Active'? 'Yes':'No' : '');
            SetOrderno(props.topicEditData ? props.topicEditData.fld_orderno : 0);
            setValues(props.topicEditData ? props.topicEditData.contents.sort((a,b)=> (a.fld_orderno > b.fld_orderno ? 1 : -1)) : [{ fld_id : '', fld_content : '', fld_orderno : 1, createdon  : moment().format('lll'), updatedon : moment().format('lll')}])
        }
     },[props.topicEditData ]);

     

      function isValidate(){
        let flag= true;
   
        if(Title == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter topic title.')
        }
        // if(values.length === 0){
        //     flag = false;
        //     Notiflix.Notify.Failure('Please add topic content.')
        // }
        return flag;
      }

      function isValidateContent(){
        let flag= true;
   
        if(Title == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter topic title.')
        }
        if(values.length === 0){
            flag = false;
            Notiflix.Notify.Failure('Please add topic content.')
        }
        return flag;
      }

      function saveTopic(){
        if(isValidate()){
            let data ={}
            data.chapterid = props.chapterEditData.fld_chapterid;
            data.title = Title;
            data.description = Description;
            data.orderno = orderno;
            data.status = isActive == 'Yes' ? 'Active' : 'Inactive';
            data.contents = values;
            if(topicid !=''){
                data.id = topicid;
                props.updateTopicData(data);
            }else{
                props.saveTopicData(data);
            }
        }
      }

      
    function handleChange( event, i) {
        debugger;
        let contentArr = ''
        if(props.topicEditData.contents && (props.topicEditData.contents.length > values.length)){
            contentArr = props.topicEditData.contents;
            contentArr[i].fld_content = event.editor.getData() 
        }else{
            contentArr =values;
            contentArr[i].fld_content = event.editor.getData() 
        }
        setValues (contentArr);
        setCheck(!check);
    }

    function removeContent(i){
        if(values[i].fld_id !=''){
            
            Notiflix.Loading.Dots('');

            PostApiCall.postRequest({

                contentid : values[i].fld_id,
            

            },"DeleteTopicContent").then((results) => 
            
                results.json().then(obj => {

                if(results.status == 200 || results.status==201){
                    values.splice(i,1);
                    setValues (values);
                    setCheck(!check);

                    let topicEditData =  props.topicEditData;
                        topicEditData.contents = values;
                        props.updateTpoicListContent( topicEditData);
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Success('Option successfully deleted.')
                    
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
        if(values.length>0){
            new_order = Math.max.apply(Math, values.map(function(o) { return o.fld_orderno; }))
        }
        values.push({ fld_id : '', fld_content : '', fld_orderno : new_order+1, createdon  : moment().format('lll'), updatedon : moment().format('lll')});
        setValues(values);
        setCheck(!check);
    }

    function saveContent(item, index){


        if(topicid!=''){
            if(item.fld_content !=''){
                    if(item.fld_id === ''){
                        debugger;
                        Notiflix.Loading.Dots('Please wait...');
                        PostApiCall.postRequest ({ 
                                topicid: topicid, 
                                content: item.fld_content, 
                                orderno: item.fld_orderno, 
                                updatedon: moment().format('lll'),
                                status: 1
                            },"AddTopicContent").then((resultTopic) =>
                            resultTopic.json().then(resultTopicContent => {
                                if(resultTopic.status == 200 || resultTopic.status == 201){
                                    debugger
                                    Notiflix.Loading.Remove();
                                    Notiflix.Notify.Success('Content successfully added.')
                                    let topicEditData = props.topicEditData;
                                    values[index].fld_id = resultTopicContent.data[0].fld_id;
                                    topicEditData.contents = values;
                                    props.updateTpoicListContent( topicEditData);
                                
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
                                topicid: topicid, 
                                contentid: item.fld_id,
                                content: item.fld_content, 
                                orderno: item.fld_orderno, 
                                updatedon: moment().format('lll'),
                                status:1
                            },"UpdateTopicContent").then((resultTopic) =>
                            resultTopic.json().then(objArticleSub => {
                                if(resultTopic.status == 200 || resultTopic.status == 201){
                                    debugger
                                    Notiflix.Loading.Remove();
                                    Notiflix.Notify.Success('Content successfully update.')
                                    let topicEditData = props.topicEditData;
                                    topicEditData.contents = values;
                                    props.updateTpoicListContent( topicEditData);
                                
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
        }else{
            Notiflix.Notify.Failure('Please add topic first !.')
        }

    }

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };

    const handleDrop = (ev) => {
        debugger;
        const dragtopic = values.find((topic) => topic.fld_id == dragId);
        const droptopic = values.find((topic) => topic.fld_id == ev.currentTarget.id);
    
        const dragtopicOrder = dragtopic.fld_orderno;
        const droptopicOrder = droptopic.fld_orderno;
    
        const dragtopicIndex = values.findIndex((topic) => topic.fld_id == dragId);
        const droptopicIndex = values.findIndex(
          (topic) => topic.fld_id == ev.currentTarget.id
        );
        var ContentListData = values;
        let changeOrderList =[];
        if (dragtopicIndex < droptopicIndex) {
          for (let i = droptopicIndex; i > dragtopicIndex; i--) {
            ContentListData[i].fld_orderno = values[i - 1].fld_orderno;
            changeOrderList.push({ id : ContentListData[i].fld_id, orderno :  values[i - 1].fld_orderno});
          }
          ContentListData[dragtopicIndex].fld_orderno = droptopicOrder;
          changeOrderList.push({ id : ContentListData[dragtopicIndex].fld_id, orderno :  droptopicOrder });
        } else if (dragtopicIndex > droptopicIndex) {
          for (let i = droptopicIndex; i < dragtopicIndex; i++) {
            ContentListData[i].fld_orderno = values[i+1].fld_orderno;
            changeOrderList.push({ id : ContentListData[i].fld_id, orderno :  values[i+1].fld_orderno});
          }
          ContentListData[dragtopicIndex].fld_orderno = droptopicOrder;
          changeOrderList.push({ id : ContentListData[dragtopicIndex].fld_id, orderno :  droptopicOrder })
        }
        if(changeOrderList.length>0){
            let topicEditData = props.topicEditData;
            topicEditData.contents = ContentListData.sort((a,b)=> (a.fld_orderno > b.fld_orderno ? 1 : -1)) ;
            props.setTopicContentOrderChange(topicEditData, changeOrderList);
        }
        
        setDragId('');
    };
     

        return(
            <React.Fragment>
                 <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{topicTitle}</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12" >
                                {/* <div className="form-group mb-3">
                                    <label for="validationCustom01">Chapter<span className="mandatory">*</span></label>
                                       
                                            <input type="text" className="form-control" 
                                                value={props.chapterEditData.fld_title}
                                                disabled
                                               />
                                          
                                    </div> */}

                                <div style={{ display:'flex'}} className="form-group mb-3">
                                    <div className="col-md-11">
                                        <label for="validationCustom01">Title<span className="mandatory">*</span></label>
                                        <input type="text" className="form-control" 
                                        value={Title}
                                        onChange={(e)=>{ SetTitle(e.target.value) }}/>
                                    </div>
                                    <div style={{paddingTop: '2%'}} className="col-md-1">
                                        <button className="btn btn-primary" style={{float:'right'}} onClick={ saveTopic}>{topicid !=''? 'Update':'Save'}</button>
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Content <span className="mandatory">*</span></label>
                                    <div className="form-group mb-3">
                                    
                                        {values.map((item, i) => 
                                            <tr draggable={true}
                                            id={item.fld_id}
                                            onDragOver={(ev) => ev.preventDefault()}
                                            onDragStart={handleDrag}
                                            onDrop={handleDrop}
                                            style={{
                                                cursor :'grab',
                                            }}
                                        >   
                                            <td>
                                                <div className="col-md-12">
                                                    <div style={{ display:'flex', marginTop:'10px'}} key={i}>
                                                        <label style={{ padding:'10px', fontWeight:'bold'}} for="validationCustom01">{item.fld_orderno}. </label>
                                                        {/* <div style={{ padding:'10px', fontWeight:'bold', width : '90%'}}>
                                                            <TopicReactQuillTextEditor 
                                                                html={item.fld_content||''}
                                                                onChange={(e)=>handleChange(e,i)}
                                                                // indexContent = {i}
                                                            />
                                                        </div> */}
                                                        <div className="niceeditors">
                                                            <CKEditor
                                                                config={{
                                                                    extraPlugins: "justify,font,colorbutton",
                                                                    }}
                                                                data={item.fld_content||''}
                                                                onChange={(e)=>handleChange(e,i)}
                                                            />
                                                        </div>
                                                        

                                                    
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
                                            </td>
                                        </tr>
                                        )}   
                                        
                                        <button className="btn btn-primary" type="submit" style={{marginTop:'10px', marginLeft:'3%'}} onClick={ ()=> addClick()}>{ values.length > 0 ?'Add more':'Add Content'}</button>
                                    </div>
                                    
                          
                                </div>
                            </div>
                        
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
                            </div>
                        </div>
                    </div>
                        </div>
                </div>
                <div className="modal-footer">
                <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ props.cancleTopicBlock}>Cancel</button>
                
                    <span>

                    </span>
                </div>
              
                </div>
            </React.Fragment>
        )
    
}
export default TopicForm;