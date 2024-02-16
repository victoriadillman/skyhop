import FileUpload from '../components/FileUpload'

const Popup = () => {
  return (
    <div className="popup">
      <button className='close'>X</button>
      <div className='heading'>
        <h1>Document Upload</h1>
        <hr className='line' />
      </div>
      <div className="file">
        <FileUpload />
      </div>
      
    </div>
  )
}

export default Popup;