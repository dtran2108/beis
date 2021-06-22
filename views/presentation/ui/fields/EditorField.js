import React, { PureComponent } from 'react';
import { Field } from 'formik';
import ReactQuill from 'react-quill';
import { EditorStyle } from './styles';
import PropTypes from 'prop-types';
import selectLocalImage from '../upload/editorUpload';

class EditorField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorLength: 0,
      editorHtml: props.value
    };
    this.quillRef = null;
    this.reactQuillRef = null;
  }

  attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;

    const quillRef = this.reactQuillRef.getEditor();
    const toolbar = quillRef.getModule('toolbar');

    toolbar.addHandler('image', () => {
      selectLocalImage(quillRef);
    });
    if (quillRef != null) this.quillRef = quillRef;
  };

  renderReactQuill = ({ ...props }) => {
    const { theme, value } = props;
    return (
      <ReactQuill
        ref={(el) => {
          this.reactQuillRef = el;
        }}
        defaultValue={value}
        theme={theme}
        modules={EditorField.modules}
        formats={EditorField.formats}
        onChange={this.handleChange}
      />
    );
  };

  handleChange = (content, delta, source, editor) => {
    const { onChange } = this.props;
    this.setState({
      editorLength: editor.getLength(),
      editorHtml: content
    });
    onChange(content);
  };

  handleCountOnEdit = () => {
    const length = this.reactQuillRef.getEditor().getLength();
    this.setState({ editorLength: length });
  };

  componentDidMount() {
    this.attachQuillRefs();
    this.handleCountOnEdit();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  render() {
    const { label, name, theme, onChange, limitText } = this.props;
    const { editorLength, editorHtml } = this.state;

    return (
      <EditorStyle>
        <label>{label}</label>
        <Field name={name} theme={theme} value={editorHtml} onChange={onChange} component={this.renderReactQuill} />
        <p className="mt-2">{`Còn lại: ${editorLength}/${limitText} ký tự`}</p>
      </EditorStyle>
    );
  }
}

export default EditorField;

EditorField.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

EditorField.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];

EditorField.defaultProps = {
  theme: 'snow',
  limitText: 10000
};

EditorField.propTypes = {
  placeholder: PropTypes.string
};
