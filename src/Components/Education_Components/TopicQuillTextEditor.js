import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// class TopicReactQuillTextEditor extends React.Component {

const TopicReactQuillTextEditor =(props)=>{
  const [ theme, setTheme] = useState('snow');
  const [ editorHtml, setEditorHtml ] = useState(props.html);
    // constructor (props) {
    //   super(props)
    //   this.state = { editorHtml: '', theme: 'snow' }
    //   this.handleChange = this.handleChange.bind(this)
    // }
    
    // function handleChange (html) {
    //     debugger;
    //     this.setState({ editorHtml: html });
    // }
    
   
    
    
        let  Editor={};
         Editor.modules = {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],

              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'video'],
              ['clean']   
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
          }

          Editor.formats = [
            'background','color','font','code', 'script',
            'header', 'font', 'size','align','direction','code-block',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video',
          ]
        //   Editor.propTypes = {
        //     placeholder: PropTypes.string,
        //   }
      return (
        <div>
          <ReactQuill 
            theme={ theme}
            onChange={
              
              (e)=>props.onChange(e)
              // (html)=>alert(html)
            }
            value={ props.html }
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.app'}
            // placeholder={this.props.placeholder}
           />
          
         </div>
       )
    }
  
  
  /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  
  
  /* 
   * PropType validation
   */
 
  
  /* 
   * Render component on page
   */
export default TopicReactQuillTextEditor
