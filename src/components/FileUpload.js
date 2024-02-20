import { useForm, Controller } from "react-hook-form";
import { 
  FormControlLabel, 
  Switch, 
  Radio, 
  RadioGroup, 
  FormControl, 
  FormLabel
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useState } from "react";
import theme from "../fileUploadStyle";
import { CiClock2 } from "react-icons/ci";
import { FaFileAlt, FaFileImage } from "react-icons/fa";

const FileUpload = ({setIsOpen}) => {
  // Hypothetically setting up to check on via (nonexistant) backend whether dates elapsed or location is unavailable
  const [dataCheck, setDataCheck] = useState(true);
  const [locationCheck, setLocationCheck] = useState(true);
  const [ file, setFile ] = useState(null);
  const [ uploadProgress, setUploadProgress] = useState(0);
  const { register, handleSubmit, control, setValue } = useForm();
  // clientValue determines how many Testing Center options there are on the form
  const [ clientValue, setClientValue ] = useState(1);
  
  // With a backend, this would be an API call to submit the data
  const onSubmit = (data) => {
    setIsOpen(false);
    alert('Import Successful')
  }

  // File Upload Progress logic:
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    // Simulating file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
    }, 500);

    // In a real-world scenario, I would use an API call to upload the file and handle progress
    // Here, I'm using a timeout to simulate the file upload completion
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
    }, 5000);

    setValue("manifest", selectedFile);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="first">
        <select className="import-name blue-bold" defaultValue="" {...register("importName")}>
          <option value="" disabled >Select Import Name:</option>
          <option value="importOne">Import One</option>
          <option value="importTwo">Import Two</option>
        </select>
        <hr />
        <p className="blue-bold">Select a manifest you'd like to import</p>
        <Controller
          name="manifest"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <>
            <div className="dropzone-container">
                <Dropzone onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="internal-file">
                        <FaFileAlt className="orange"/>
                        <p>Drag & Drop Here Or <span style={{fontWeight:'bold'}}>Browse</span></p>
                      </div>
                    </div>
                  )}
                </Dropzone>
            </div>
            {file && (
              <div className="one-line">
                <FaFileImage className="orange" size={20} />
                <div className="one-row">
                  <label htmlFor="file">{file.name}</label>
                  <progress id="file" value={uploadProgress} max="100" />
                </div>
              </div>
            )}
            </>
          )}
        />
        <hr />
        <p className="blue-bold">Elapse Data Checking:</p>
        <p className="green">{dataCheck ? 'No Elapsed Dates!' : 'Elapsed Dates!'}</p>

        <hr />
        <label className="blue-bold">Tolerance Window:</label>
        <Controller 
          name="tolerance"
          control={control}
          render={({field: {onChange, value = true}}) => (
            <FormControlLabel
              control={<Switch 
                checked={value} 
                onChange={onChange}
                sx={{
                  '& .MuiSwitch-thumb': {
                    backgroundColor: 'white',
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: theme.label.blue,
                  },
                }}
              />}
              label={
                <div className="tolerance-label">
                  {`Toggle ${value ? 'ON' : 'OFF'} | `}
                  <CiClock2 size={25} style={{ marginRight: '8px' }} />
                  {`Select Tolerance Level`}
                </div>
              }
              sx={{color: theme.label.blue}}
            />
          )}
        />
      </div>
      <div className="second">
        <Controller 
          name="split"
          control={control}
          render={({field: {onChange, value}}) => (
            <FormControl>
              <FormLabel sx={{
                color: theme.label.blue, 
                fontWeight: 'bold',
                '&.Mui-focused': {
                  color: theme.label.blue,
                },
              }}>
                Split schedule using social distancing?
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel 
                  value="yes" 
                  label="Yes" 
                  control={<Radio onChange={onChange} checked={value === 'yes'} />}
                  sx={{
                    '& .Mui-checked': {
                      color: theme.label.blue,
                    },
                  }}
                />
                <FormControlLabel 
                  value="no" 
                  label="No" 
                  control={<Radio onChange={onChange} checked={value === 'no'} />}
                  sx={{
                    '& .Mui-checked': {
                      color: theme.label.blue,
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        <hr />
        <p className="blue-bold">Location Checking:</p>
        <p className="green">{locationCheck ? 'All Available!' : 'Not Available!'}</p>
        
        <hr />
        <div className="client">
          <Controller 
            name="client"
            control={control}
            render={({field: {onChange, value}}) => (
              <FormControl>
                <FormLabel sx={{
                color: theme.label.blue, 
                fontWeight: 'bold',
                '&.Mui-focused': {
                  color: theme.label.blue,
                },
              }}
                >
                  Client:
                </FormLabel>
                <RadioGroup row value={clientValue} onChange={(e) => setClientValue(e.target.value)}>
                  <FormControlLabel 
                    value={1} 
                    label="Single" 
                    control={<Radio onChange={onChange} checked={value === '1'} />}
                    sx={{
                      '& .Mui-checked': {
                        color: theme.label.blue,
                      },
                    }}
                  />
                  <FormControlLabel 
                    value={4}
                    label="Multiple" 
                    control={<Radio onChange={onChange} checked={value === '4'} />}
                    sx={{
                      '& .Mui-checked': {
                        color: theme.label.blue,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          {Array.from({ length: clientValue }, (_, index) => (
            <div className="testing-center">
              <p className="center1">{`Testing Center ${1 + index}`}</p>
              <select className="center2" key={`testing${index}`} defaultValue="" {...register(`testing${index}`)}>
                <option value="" disabled >Select Client</option>
                <option value="clientOne">Client One</option>
                <option value="clientTwo">Client Two</option>
              </select>
              <div className="center3">
                <CiClock2 size={25}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="import">
        {file && <p className="blue-bold">Data in the import file is correct. Please press Continue to import.</p>}
        <div>
          <input className="import-button" type="submit" value="Continue Import"/>
          <button className="cancel-button" type="button" onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </form> 
  )
}

export default FileUpload;