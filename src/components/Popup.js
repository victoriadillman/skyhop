import FileUpload from '../components/FileUpload'

const Popup = ({setIsOpen}) => {
  return (
    <div className="popup">
      <button className='close' onClick={() => setIsOpen(false)}>X</button>
      <div className='heading'>
        <h1>Document Upload</h1>
        <hr className='line' />
      </div>
      <div className="file">
        <FileUpload setIsOpen={setIsOpen} />
      </div>
      
    </div>
  )
}

export default Popup;