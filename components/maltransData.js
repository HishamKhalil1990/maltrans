import {useState, useRef, useEffect} from 'react';
import styles from '../styles/Maltrans.module.scss'
import ConfirmModal from './confirmModal';
import SendingLoader from './sendingLoader';
import ContainerInfo from './containerInfo';

export default function MaltransData({data,tokenKey,logout,username,updatedData,histData}){

    const [customCenter, setCustomCenter] = useState(updatedData.customCenter);
    const [clearanceNo, setClearanceNo] = useState(updatedData.clearanceNo);
    const [clearanceDate, setClearanceDate] = useState(updatedData.clearanceDate);
    const [operationNo, setOperationNo] = useState(updatedData.operationNo);
    const [healthPath, setHealthPath] = useState(updatedData.healthPath);
    const [customPath, setCustomPath] = useState(updatedData.customPath);
    const [agriPath, setAgriPath] = useState(updatedData.agriPath);
    const [energyPath, setEnergyPath] = useState(updatedData.energyPath);
    const [ins215, setIns215] = useState(updatedData.Ins215);
    const [ins250, setIns250] = useState(updatedData.Ins250);
    const [ins251, setIns251] = useState(updatedData.Ins251);
    const [ins265, setIns265] = useState(updatedData.Ins265);
    const [ins270, setIns270] = useState(updatedData.Ins270);
    const [clearanceFinish, setClearanceFinish] = useState(updatedData.clearanceFinish);
    const [requiredAction, setRequiredAction] = useState(updatedData.requiredAction);
    const [docDone, setDocDone] = useState(updatedData.DocDone);
    const [token, setToken] = useState(tokenKey)
    const [user, setUser] = useState(username)
    const [msg, setMsg] = useState("")
    const [isMsg, setIsMsg] = useState(false)
    const [success, setSuccess] = useState(true)
    const [history, setHistory] = useState(histData)
    const [loading, setLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [containerNO, setContainerNO] = useState(data.U_ContainerNo[0])

    const containerRef = useRef()

    const getContainerNo = () => {
        return containerRef.current.value
    }

    useEffect(() => {
        if(!loading){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            },1500)
        }
    },[history])

    const historyLog = () => {
        return history
        .sort((a,b) => {
            return parseInt(b.ID) - parseInt(a.ID)
        })
        .map((item,index) => {
            if(item.DocDone != "????????"){
                if(item.requiredAction != "??????????"){
                    item.clearanceFinish = "???? ????????"
                }
            }
            return(
                <tr key={`tr-${index}`} className={styles.innerTr}>
                    <td key={index.toString() + "-" + '0'} className={styles.td}>{index + 1}</td>
                    <td key={index.toString() + "-" + '1'} className={styles.td}>{item.BL}</td>
                    <td key={index.toString() + "-" + '2'} className={styles.td}>{item.customCenter}</td>
                    <td key={index.toString() + "-" + '3'} className={styles.td}>{item.clearanceNo}</td>
                    <td key={index.toString() + "-" + '4'} className={styles.td}>{item.clearanceDate.split("T")[0]}</td>
                    <td key={index.toString() + "-" + '3'} className={styles.td}>{item.operationNo}</td>
                    <td key={index.toString() + "-" + '5'} className={styles.td}>{item.healthPath}</td>
                    <td key={index.toString() + "-" + '6'} className={styles.td}>{item.customPath}</td>
                    <td key={index.toString() + "-" + '7'} className={styles.td}>{item.agriPath}</td>
                    <td key={index.toString() + "-" + '21'} className={styles.td}>{item.energyPath}</td>
                    <td key={index.toString() + "-" + '19'} className={styles.td}>{item.Ins215}</td>
                    <td key={index.toString() + "-" + '8'} className={styles.td}>{item.Ins250}</td>
                    <td key={index.toString() + "-" + '20'} className={styles.td}>{item.Ins251}</td>
                    <td key={index.toString() + "-" + '22'} className={styles.td}>{item.Ins265}</td>
                    <td key={index.toString() + "-" + '23'} className={styles.td}>{item.Ins270}</td>
                    <td key={index.toString() + "-" + '10'} className={styles.td}>{item.requiredAction}</td>
                    <td key={index.toString() + "-" + '17'} className={styles.td}>{item.DocDone}</td>
                    {(history[0].requiredAction == "??????????") || (history[0].DocDone == "????????")?
                        <td key={index.toString() + "-" + '9'} className={styles.td}>{item.clearanceFinish}</td>
                    :   
                        <></>
                    }
                    <td key={index.toString() + "-" + '11'} className={styles.td}>{item.customeDeclaration != "no file"? item.customeDeclaration.split("pdf\\")[1] : "no file"}</td>
                    <td key={index.toString() + "-" + '12'} className={styles.td}>{item.clearanceBill != "no file"? item.clearanceBill.split("pdf\\")[1] : "no file"}</td>
                    <td key={index.toString() + "-" + '13'} className={styles.td}>{item.samplingModel != "no file"? item.samplingModel.split("pdf\\")[1] : "no file"}</td>
                    <td key={index.toString() + "-" + '14'} className={styles.td}>{item.dataResults != "no file"? item.dataResults.split("pdf\\")[1] : "no file"}</td>
                    <td key={index.toString() + "-" + '18'} className={styles.td}>{item.Notes}</td>
                    <td key={index.toString() + "-" + '15'} className={styles.td}>{item.Sysdate.split("T")[0]}</td>
                    <td key={index.toString() + "-" + '16'} className={styles.td}>{item.UserName}</td>
                </tr>
            )
        })
    }

    const containeNo = (data) => {
        return data.map(item => {
            return (
                <option key={item}>
                    {item}
                </option>
            )
        })
    }

    function FileUpload(){
        const [selectedFileOne, setSelectedFileOne] = useState();
        const [selectedFileTwo, setSelectedFileTwo] = useState();
        const [selectedFileThree, setSelectedFileThree] = useState();
        const [selectedFileFour, setSelectedFileFour] = useState();
        const [isSelectedOne, setIsSelectedOne] = useState(false);
        const [isSelectedTwo, setIsSelectedTwo] = useState(false);
        const [isSelectedThree, setIsSelectedThree] = useState(false);
        const [isSelectedFour, setIsSelectedFour] = useState(false);
        const [notes, setNotes] = useState(updatedData.notes);

        const ref1 = useRef()
        const ref2 = useRef()
        const ref3 = useRef()
        const ref4 = useRef()

        const changeHandler = (event,fileNo) => {
            const fileData = event.target.files[0]
            switch(fileNo){
                case 1:
                    setSelectedFileOne(fileData);
                    if(fileData){
                        setIsSelectedOne(true);
                    }else{
                        setIsSelectedOne(false);
                    }
                    break;
                case 2:
                    setSelectedFileTwo(fileData);
                    if(fileData){
                        setIsSelectedTwo(true);
                    }else{
                        setIsSelectedTwo(false);
                    }
                    break;
                case 3:
                    setSelectedFileThree(fileData);
                    if(fileData){
                        setIsSelectedThree(true);
                    }else{
                        setIsSelectedThree(false);
                    }
                    break;
                case 4:
                    setSelectedFileFour(fileData);
                    if(fileData){
                        setIsSelectedFour(true);
                    }else{
                        setIsSelectedFour(false);
                    }
                    break;
                default:
                    break;
            }
        };

        const removeFile = (fileNo) => {
            switch(fileNo){
                case 1:
                    setSelectedFileOne();
                    setIsSelectedOne(false);
                    ref1.current.value = ""
                    break;
                case 2:
                    setSelectedFileTwo();
                    setIsSelectedTwo(false);
                    ref2.current.value = ""
                    break;
                case 3:
                    setSelectedFileThree();
                    setIsSelectedThree(false);
                    ref3.current.value = ""
                    break;
                case 4:
                    setSelectedFileFour();
                    setIsSelectedFour(false);
                    ref4.current.value = ""
                    break;
                default:
                    break;
            }
        }

        const toBase64 = async (file) => {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result)
            };
            reader.onerror = error => reject(error);
            })
        };

        const convertFiles = async (formData) => {
            if(isSelectedOne){
                await toBase64(selectedFileOne).then((result) => {
                    formData.append('FileOneName',selectedFileOne.name)
                    formData.append('FileOne',result)
                });
            }else{
                formData.append('FileOneName',"")
            }
            if(isSelectedTwo){
                await toBase64(selectedFileTwo).then((result) => {
                    formData.append('FileTwoName',selectedFileTwo.name)
                    formData.append('FileTwo',result)
                });
            }else{
                formData.append('FileTwoName',"")
            }
            if(isSelectedThree){
                await toBase64(selectedFileThree).then((result) => {
                    formData.append('FileThreeName',selectedFileThree.name)
                    formData.append('FileThree',result)
                });
            }else{
                formData.append('FileThreeName',"")
            }
            if(isSelectedFour){
                await toBase64(selectedFileFour).then((result) => {
                    formData.append('FileFourName',selectedFileFour.name)
                    formData.append('FileFour',result)
                });
            }else{
                formData.append('FileFourName',"")
            }
            return 'done'
        }
    
        const handleSubmission = async () => {
            if(msg != ""){
                setMsg("")
                setSuccess(true)
                setIsMsg(false)
            }
            if( customCenter &&  clearanceNo && clearanceDate && healthPath && customPath && agriPath && requiredAction && ((requiredAction == "??????????") || (docDone == "????????")? (clearanceFinish != "") : true)){
                setIsSending(true)
                const formData = new FormData();
                formData.append('BL', data.BL);
                formData.append('customCenter', customCenter);
                formData.append('clearanceNo', clearanceNo);
                formData.append('clearanceDate', clearanceDate);
                formData.append('operationNo', operationNo);
                formData.append('healthPath', healthPath);
                formData.append('customPath', customPath);
                formData.append('agriPath', agriPath);
                formData.append('energyPath', energyPath);
                formData.append('ins215', ins215);
                formData.append('ins250', ins250);
                formData.append('ins251', ins251);
                formData.append('ins265', ins265);
                formData.append('ins270', ins270);
                formData.append('clearanceFinish', clearanceFinish);
                formData.append('requiredAction', requiredAction);
                formData.append('UserName', user);
                formData.append('docDone', docDone);
                formData.append('notes', notes);
                const dataToBase64 = await convertFiles(formData)
                console.log(dataToBase64)
                try{
                    fetch(
                        'http://localhost:3030/save-maltrans-data',
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: formData,
                        }
                    )
                    .then((response) => response.json())
                    .then((result) => {
                        setTimeout(() => {
                            setIsSending(false)
                            if(result.status == "unauthorized"){
                                setSuccess(false)
                                setTimeout(() => {
                                    logout()
                                },1500)
                            }
                            if(result.msg != "Submit is Done"){
                                setSuccess(false)
                            }else{
                                setHistory(result.data)
                            }
                            setMsg(result.msg)
                            setIsMsg(true)
                        },1500)
                    })
                    .catch((error) => {
                        setTimeout(() => {
                            setIsSending(false)
                            setSuccess(false)
                            setIsMsg(true)
                            setMsg("server shutdown or connection lost!, please try again")
                        },1500)
                    });
                }catch(err){
                    setTimeout(() => {
                        setIsSending(false)
                        setSuccess(false)
                        setIsMsg(true)
                        setMsg("server shutdown or connection lost!, please try again")
                    },1500)
                }
            }else{
                setSuccess(false)
                setIsMsg(true)
                setMsg("missing fields, please fill all fields")
            }
        };
    
        return(
            <div>
                <h4 style={{paddingRight:'10px',textAlign:"right"}}>
                    ??????????????
                </h4>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row-reverse"}}>
                    <div style={{marginLeft:"15px"}}>
                        <div className={styles.fileUpload}>
                            <div className={styles.inputContainer}>
                                {isSelectedOne?
                                    <div className={styles.userActions}>
                                        <button onClick={() => removeFile(1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                        </button>
                                    </div>
                                :
                                    <></>
                                }
                                <fieldset className={styles.fieldset}>
                                        <input className={styles.input} type="file" ref={ref1}  name="file1" accept=".pdf" onChange={e => changeHandler(e,1)} />
                                        <label className={styles.fileLabel}  htmlFor='file1'>
                                            ???????????? ??????????????
                                        </label>
                                </fieldset>
                            </div>
                            <div className={styles.inputContainer}>
                                {isSelectedTwo?
                                    <div className={styles.userActions}>
                                        <button onClick={() => removeFile(2)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                        </button>
                                    </div>
                                :
                                    <></>
                                }
                                <fieldset className={styles.fieldset}>
                                        <input className={styles.input} type="file" ref={ref2} name="file2" accept=".pdf" onChange={e => changeHandler(e,2)} />
                                        <label className={styles.fileLabel}  htmlFor='file2'>
                                            ???????????? ??????????????
                                        </label>
                                </fieldset>  
                            </div>
                            <div className={styles.inputContainer}>
                                {isSelectedThree?
                                    <div className={styles.userActions}>
                                        <button onClick={() => removeFile(3)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                        </button>
                                    </div>
                                :
                                    <></>
                                }
                                <fieldset className={styles.fieldset}>
                                        <input className={styles.input} type="file" ref={ref3} name="file3" accept=".pdf" onChange={e => changeHandler(e,3)} />
                                        <label className={styles.fileLabel}  htmlFor='file3'>
                                            ?????????? ?????? ??????????????
                                        </label>
                                </fieldset>  
                            </div>
                            <div className={styles.inputContainer}>
                                {isSelectedFour?
                                    <div className={styles.userActions}>
                                        <button onClick={() => removeFile(4)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                        </button>
                                    </div>
                                :
                                    <></>
                                }
                                <fieldset className={styles.fieldset}>
                                        <input className={styles.input} type="file" ref={ref4} name="file4" accept=".pdf" onChange={e => changeHandler(e,4)} />
                                        <label className={styles.fileLabel}  htmlFor='file4'>
                                            ?????????? ???????????????? ????????????????????
                                        </label>
                                </fieldset>  
                            </div>
                        </div>
                    </div>
                    <div className={styles.fileUpload} >
                        <fieldset className={styles.fieldset2}>
                                <label className={styles.label2} htmlFor='notes' style={{marginBottom:"10px"}}>
                                    ??????????????
                                </label>
                                <textarea className={styles.textArea} value={notes} name='notes' onChange={e => {setNotes(e.target.value)}}/>
                        </fieldset>
                    </div>
                </div>
                <div className={styles.btuContainer}>
                    <div>
                        {/* <button className={styles.btu} type='submit' onClick={handleSubmission}>Submit</button> */}
                        {isSending?
                            <div>
                                <SendingLoader/>
                            </div>
                        :
                            <div style={{display:'flex',justifyConten:'center',alignItems:'center'}}>
                                {isMsg?
                                    <div>
                                        {success?
                                            <div style={{color:"green"}}>{msg}</div>
                                        :
                                            <div style={{color:"red"}}>{msg}</div>
                                        }
                                    </div>
                                :
                                    <></>
                                }
                                <ConfirmModal handleSubmission={handleSubmission}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div style={{width:'100%'}}>
            <div className={styles.contentContainer}>
                <div>
                    <div style={{width:'100%'}}>
                        <h2 style={{textAlign:"center"}}>
                            ?????????? ????????????????
                        </h2>
                    </div>
                    <div className={styles.info}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.forms}>
                                <fieldset className={styles.fieldset}>
                                    <select value={requiredAction} name="requiredAction" className={styles.opt} onChange={e => setRequiredAction(e.target.value)}>
                                        <option value="?????????? ???????? ?????????? ???? ??????????????????">
                                            ?????????? ???????? ?????????? ???? ??????????????????
                                        </option>
                                        <option value="?????? ?????????? ?????????????? ????????????">
                                            ?????? ?????????? ?????????????? ????????????
                                        </option>
                                        <option value="?????????? ????????????">
                                            ?????????? ????????????
                                        </option>
                                        <option value="?????????? ????????????">
                                            ?????????? ????????????
                                        </option>
                                        <option value="???????????? ?????? ???????????? ???? ?????? ??????????">
                                            ???????????? ?????? ???????????? ???? ?????? ??????????
                                        </option>
                                        <option value="???????????? ??????????????????">
                                            ???????????? ??????????????????
                                        </option>
                                        <option value="???????????? ?????? ??????????????">
                                            ???????????? ?????? ??????????????
                                        </option>
                                        <option value="?????????? ?????? ??????????????">
                                            ?????????? ?????? ??????????????
                                        </option>
                                        <option value="?????? ????????????">
                                            ?????? ????????????
                                        </option>
                                        <option value="?????????? ???? ??????????????">
                                            ?????????? ???? ??????????????
                                        </option>
                                        <option value="???????????? ???? ????????">
                                            ???????????? ???? ????????
                                        </option>
                                        <option value="???????????? ???????? ????????">
                                            ???????????? ???????? ????????
                                        </option>
                                        <option value="?????????? ????????">
                                            ?????????? ????????
                                        </option>
                                        {/* <option value="????????">
                                            ????????
                                        </option> */}
                                        <option value="??????????">
                                            ??????????
                                        </option>
                                        <option value="??????????">
                                            ??????????
                                        </option>
                                    </select>
                                    <label className={styles.label2} htmlFor='requiredAction'>
                                        ?????????????? ??????????????
                                    </label>
                                </fieldset>
                                {updatedData.clearanceNo == ""?
                                    <fieldset className={styles.fieldset}>
                                        <select value={customCenter} name="customCenter" className={styles.opt} onChange={e => setCustomCenter(e.target.value)}>
                                            <option value="???????? ????????">
                                                ???????? ????????
                                            </option>
                                            <option value="???????? ????????">
                                                ???????? ????????
                                            </option>
                                            <option value="???????? ????????????">
                                                ???????? ????????????
                                            </option>
                                            <option value="???????? ????????????">
                                                ???????? ????????????
                                            </option>
                                        </select>
                                        <label className={styles.label2} htmlFor='customCenter'>
                                            ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                :
                                    <fieldset className={styles.fieldset}>
                                        <input className={styles.textInput} value={customCenter} name="customCenter" readOnly/>
                                        <label className={styles.label2} htmlFor='customCenter'>
                                            ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                }
                                {updatedData.clearanceNo == ""?
                                    <fieldset className={styles.fieldset}>
                                        <input className={styles.textInput} value={clearanceNo} name='clearanceNo' onChange={e => setClearanceNo(e.target.value)} required/>
                                        <label className={styles.label2}  htmlFor='clearanceNo'>
                                            ?????? ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                :
                                    <fieldset className={styles.fieldset}>
                                        <input className={styles.textInput} value={clearanceNo} name='clearanceNo' readOnly/>
                                        <label className={styles.label2}  htmlFor='clearanceNo'>
                                            ?????? ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                }
                                <fieldset className={styles.fieldset}>
                                    <input className={styles.textInput} value={operationNo} name='operationNo' onChange={e => setOperationNo(e.target.value)} required/>
                                    <label className={styles.label2}  htmlFor='operationNo'>
                                        ?????? ??????????????
                                    </label>
                                </fieldset>
                                {updatedData.clearanceDate == ""?
                                    <fieldset className={styles.fieldset}>
                                        <input value={clearanceDate} name='clearanceDate' type="date" className={styles.opt} onChange={e => setClearanceDate(e.target.value)} required/>
                                        <label className={styles.label2} htmlFor='clearanceDate'>
                                            ?????????? ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                :
                                    <fieldset className={styles.fieldset}>
                                        <input className={styles.textInput} value={clearanceDate} name='clearanceDate' readOnly/>
                                        <label className={styles.label2} htmlFor='clearanceDate'>
                                            ?????????? ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                }
                                <fieldset className={styles.fieldset}>
                                <select value={docDone} name="docDone" className={styles.opt} onChange={e => setDocDone(e.target.value)}>
                                        <option value="?????? ????????">
                                            ?????? ????????
                                        </option>
                                        <option value="????????">
                                            ????????
                                        </option>
                                    </select>
                                    <label className={styles.label2} htmlFor='docDone'>
                                        ???????? ????????????
                                    </label>
                                </fieldset>
                                {(requiredAction == "??????????") || (docDone == "????????")?
                                    <fieldset className={styles.fieldset}>
                                        <input value={clearanceFinish} name='clearanceFinish' type="date" className={styles.opt} onChange={e => setClearanceFinish(e.target.value)} required/>
                                        <label className={styles.label2} htmlFor='clearanceFinish'>
                                            ?????????? ????????????
                                        </label>
                                    </fieldset>
                                :
                                    <></>
                                }
                            </div>
                            <div className={styles.paths}>
                                <h4 style={{paddingRight:'10px'}}>
                                    ??????????????
                                </h4>
                                <div className={styles.paths2}>
                                    <fieldset className={styles.fieldset}>
                                        <select value={healthPath} name="healthPath" className={styles.opt} onChange={e => setHealthPath(e.target.value)}>
                                            <option value="Red">
                                                Red
                                            </option>
                                            <option value="Yellow">
                                                Yellow 
                                            </option>
                                            <option value="Green">
                                                Green 
                                            </option>
                                        </select>
                                        <label className={styles.label2} htmlFor='healthPath'>
                                            ???????????? ??????????
                                        </label>
                                    </fieldset>
                                    <fieldset className={styles.fieldset}>
                                        <select value={customPath} name="customPath" className={styles.opt} onChange={e => setCustomPath(e.target.value)}>
                                            <option value="Red">
                                                Red
                                            </option>
                                            <option value="Yellow">
                                                Yellow 
                                            </option>
                                            <option value="Green">
                                                Green 
                                            </option>
                                        </select>
                                        <label className={styles.label2} htmlFor='customPath'>
                                            ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                    <fieldset className={styles.fieldset}>
                                    <select value={agriPath} name="agriPath" className={styles.opt} onChange={e => setAgriPath(e.target.value)}>
                                            <option value="Red">
                                                Red
                                            </option>
                                            <option value="Yellow">
                                                Yellow 
                                            </option>
                                            <option value="Green">
                                                Green 
                                            </option>
                                        </select>
                                        <label className={styles.label2} htmlFor='agriPath'>
                                            ???????????? ??????????????
                                        </label>
                                    </fieldset>
                                    <fieldset className={styles.fieldset}>
                                        <select value={energyPath} name="EnergyPath" className={styles.opt} onChange={e => setEnergyPath(e.target.value)}>
                                            <option value="Red">
                                                Red
                                            </option>
                                            <option value="Yellow">
                                                Yellow 
                                            </option>
                                            <option value="Green">
                                                Green 
                                            </option>
                                            <option value="Green">
                                                Blue
                                            </option>
                                        </select>
                                        <label className={styles.label2} htmlFor='EnergyPath'>
                                            ???????? ????????????
                                        </label>
                                    </fieldset>
                                </div>
                            </div>
                            <div className={styles.customs}>
                                <h4 style={{paddingRight:'10px'}}>
                                    ???????? ?????????????????? ????????????????
                                </h4>
                                <fieldset className={styles.fieldset}>
                                    <input className={styles.textInput} value={ins215} name='ins215' onChange={e => setIns215(e.target.value)} required/>
                                    <label className={styles.label3} htmlFor='ins215'>
                                        ?????? ?????????? ?????? ?????????? ?????????????? ???????????????? : 215
                                    </label>
                                </fieldset>
                                <fieldset className={styles.fieldset}>
                                    <input className={styles.textInput} value={ins250} name='ins250' onChange={e => setIns250(e.target.value)} required/>
                                    <label className={styles.label3} htmlFor='ins250'>
                                        250: ?????? ???????? ????????????  
                                    </label>
                                </fieldset>
                                <fieldset className={styles.fieldset}>
                                    <input className={styles.textInput} value={ins251} name='ins251' onChange={e => setIns251(e.target.value)} required/>
                                    <label className={styles.label3} htmlFor='ins251'>
                                        251: ?????????? ???????????? ???????? ?????????? ???????????? 
                                    </label>
                                </fieldset>
                                <fieldset className={styles.fieldset}>
                                    <input className={styles.textInput} value={ins265} name='ins265' onChange={e => setIns265(e.target.value)} required/>
                                    <label className={styles.label3} htmlFor='ins265'>
                                        265: ?????????? ?????? ?????????? ?????? ?????????????????? ?????????????? %1
                                    </label>
                                </fieldset>
                                <fieldset className={styles.fieldset}>
                                    <input className={styles.textInput} value={ins270} name='ins270' onChange={e => setIns270(e.target.value)} required/>
                                    <label className={styles.label3} htmlFor='ins270'>
                                        270: ?????????? ?????? ?????????? ?????? ?????????? ?????????? ???????????? %5
                                    </label>
                                </fieldset>
                            </div>
                            <FileUpload/>
                        </form>
                    </div>
                </div>
                <form>
                    <div style={{width:'100%'}}>
                        <h2 style={{textAlign:"center"}}>
                            ???????????? ??????????
                        </h2>
                    </div>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name="BL" readOnly value={data.BL}/>
                        <label className={styles.label} htmlFor='BL'>
                            ?????? ????????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name="U_PO_Description" readOnly value={data.U_PO_Description}/>
                        <label className={styles.label} htmlFor='U_PO_Description'>
                            ?????? ????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_ShippingMethod' readOnly value={data.U_ShippingMethod}/>
                        <label className={styles.label}  htmlFor='U_ShippingMethod'>
                            ?????????? ??????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_ShippingCompany' readOnly value={data.U_ShippingCompany}/>
                        <label className={styles.label} htmlFor='U_ShippingCompany'>
                            ???????? ??????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_NoofContainer' readOnly value={data.U_NoofContainer}/>
                        <label className={styles.label} htmlFor='U_NoofContainer'>
                            ?????? ????????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <div className={styles.containerNoDiv}>
                            <ContainerInfo containerNo={containerNO} tokenKey={token} username={user} bl={data.BL} logout={logout} getContainerNo={getContainerNo}/>
                            <select ref={containerRef} name='U_ContainerNo'  className={styles.opt2} value={containerNO} onChange={e => {setContainerNO(e.target.value)}}>
                                {containeNo(data.U_ContainerNo)}
                            </select>
                        </div>
                        <label className={styles.label} htmlFor='U_ContainerNo'>
                            ?????????? ????????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_ETS' readOnly value={data.U_ETS.substring(10,-1)}/>
                        <label className={styles.label} htmlFor='U_ETS'>
                            ???????? ??????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name="U_ETA" readOnly value={data.U_ETA.substring(10,-1)}/>
                        <label className={styles.label} htmlFor='U_ETA'>
                            ???????? ????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_StorageMethod' readOnly value={data.U_StorageMethod}/>
                        <label className={styles.label} htmlFor='U_StorageMethod'>
                            ?????? ??????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_ClearanceCompany' readOnly value={data.U_ClearanceCompany}/>
                        <label className={styles.label} htmlFor='U_ClearanceCompany'>
                            ???????? ??????????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <input className={styles.textInput} name='U_PO_Status' readOnly value={data.U_PO_Status}/>
                        <label className={styles.label} htmlFor='U_PO_Status'>
                            ???????? ??????????
                        </label>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <h5 style={{textAlign:"center"}}>
                            Developed by Abuodeh Bros IT Department
                        </h5>
                    </fieldset>
                </form>     
            </div>
            {history.length > 0?
                <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'25px'}}>
                    {loading?
                        <SendingLoader/>
                    :
                        <div className={styles.logContainer}>
                            <h2 style={{textAlign:"center"}}>
                                ?????? ????????????????
                            </h2>
                            <div style={{width:'100%',overflowX:'scroll'}}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr className={styles.headerTr}>
                                            <th key={0} className={styles.th}>??????</th>
                                            <th key={1} className={styles.th}>?????? ????????????????</th>
                                            <th key={2} className={styles.th}>???????????? ??????????????</th>
                                            <th key={3} className={styles.th}>?????? ???????????? ??????????????</th>
                                            <th key={4} className={styles.th}>?????????? ???????????? ??????????????</th>
                                            <th key={24} className={styles.th}>?????? ??????????????</th>
                                            <th key={5} className={styles.th}>???????????? ??????????</th>
                                            <th key={6} className={styles.th}>???????????? ??????????????</th>
                                            <th key={7} className={styles.th}>???????????? ??????????????</th>
                                            <th key={21} className={styles.th}>???????? ????????????</th>
                                            <th key={19} className={styles.th}>?????? ?????????? ?????? ?????????? ?????????????? ???????????????? : 215</th>
                                            <th key={8} className={styles.th}>250: ?????? ???????? ????????????</th>
                                            <th key={20} className={styles.th}>251: ?????????? ???????????? ???????? ?????????? ????????????</th>
                                            <th key={22} className={styles.th}>265: ?????????? ?????? ?????????? ?????? ?????????????????? ?????????????? %1</th>
                                            <th key={23} className={styles.th}>270: ?????????? ?????? ?????????? ?????? ?????????? ?????????? ???????????? %5</th>
                                            <th key={10} className={styles.th}>?????????????? ??????????????</th>
                                            <th key={17} className={styles.th}>???????? ????????????</th>
                                            {(history[0].requiredAction == "??????????") || (history[0].DocDone == "????????")?
                                                <th key={9} className={styles.th}>?????????? ?????????? ????????????</th>
                                            :   
                                                <></>
                                            }
                                            <th key={11} className={styles.th}>?????? ?????? ???????????? ??????????????</th>
                                            <th key={12} className={styles.th}>?????? ?????? ???????????? ??????????????</th>
                                            <th key={13} className={styles.th}>?????? ?????? ?????????? ?????? ??????????????</th>
                                            <th key={14} className={styles.th}>?????? ?????? ?????????? ???????????????? ????????????????????</th>
                                            <th key={18} className={styles.th}>??????????????</th>
                                            <th key={15} className={styles.th}>?????????? ?????????? ????????????????</th>
                                            <th key={16} className={styles.th}>????????????????</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyLog()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            :
                <></>
            }
        </div>
    )
}