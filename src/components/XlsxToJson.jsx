import * as xlsx from 'xlsx'
import * as React from 'react'

const XlsxToJson = () => {

  let newDate = new Date()
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

 const [json, setJson] = React.useState([ { "Documento": "1111", "NomeCliente":"Teste", "ContaCapital":"1111111", "ValorIntegralizaçãoFolha": "222"} ])

 const StrictNumberChars = (str, number) => {

    while (str.length > number){
      str = str.slice(0, -1); 
   }
   
   for(let i = str.length; i <= number; ++i) {
     str += '\u00A0';
  }

  return(
    `${str}`
  );
 }

 const FormatValue = (value) => {
  let floatValue = parseFloat(value).toFixed(2);
  let stringValue = floatValue.toString();
  for(let i = stringValue.length; i <= 17; ++i) {
    stringValue = '0' + stringValue
   }
  let formatedValue = stringValue.replace('.','')

  return (
    `${formatedValue}`
  )
 }

 const AddZeros = (value) => {
  let stringValue = value.toString();
  for(let i = stringValue.length; i <= 12; ++i) {
    stringValue = '0' + stringValue;
   }
  
  return (
    `\u00A0\u00A0${stringValue}`
  )
 }
 
 const readUploadFile = (e) => {
     e.preventDefault();
     if (e.target.files) {
         const reader = new FileReader();
         reader.onload = (e) => {
             const data = e.target.result;
             const workbook = xlsx.read(data, { type: "array" });
             const sheetName = workbook.SheetNames[0];
             const worksheet = workbook.Sheets[sheetName];
             let jsonReturn = xlsx.utils.sheet_to_json(worksheet);

             // Object.keys(jsonReturn).forEach(key=>{
             //  console.log(key ,jsonReturn[key]);
             // })

             var str = JSON.stringify(jsonReturn, null, 2); // spacing level = 2

             setJson(jsonReturn)
             return (
                 <div>
                  <p> testando!!!</p>
                 </div>
             )
         };
         reader.readAsArrayBuffer(e.target.files[0]);
     }
 }
 return(
    <div>
      <form>
      <label htmlFor="upload">Selecione um arquivo .xlsx </label>
      <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
      />
      </form>
      <h1> Resultado: </h1>
      <div id='myInput'>
       <table id='resultTable'>
        <tr>
          <th colSpan={6}>
            {StrictNumberChars(`0175643810000000NOMEEMPRES\u00A0${day}${month}${year}0000`, 199)}
          </th>
        </tr> 
       {json.map((item) => (
        <>
         <tr>
          <td key='MATRICULA/NOME'>
          {StrictNumberChars(`1C000${item.ContaCapital}${item.NomeCliente}`, 47)}
          {`\u00A0\u00A0\u00A0`}
          </td>
          
          <td key={'NONE'}>
          {`00000000000000\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0  `}
          
          </td>
          
          <td key={'MATRICULA'}>
            {AddZeros(`${item.ContaCapital}`)}
            {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}
          </td>

          <td key={'VALOR '}>
            {FormatValue(`${item.ValorIntegralizaçãoFolha}\u00A0\u00A0`)}
          </td>
          <td key={'LAST'}>
            {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}
          </td>
        </tr>
       </>
       ))}
    </table>

    </div>
    </div>
 );
}

export default XlsxToJson;
